import React from 'react'
import Footer from './Footer'
import Header from './components/Header';
import { Modal,Button } from 'react-bootstrap';
import Modalc from '@/components/Modal';
import Doctor from '@/models/Doctor';
import db from '@/util/db';
import Link from 'next/link';


const Doctorlist = ({doctor}) => {
const [showModal, setShowModal] = React.useState(false);
const handleCloseModal = () => setShowModal(false);
const handleShowModal = () => setShowModal(true);

  return (
    <div>
        <Header/>
<div className='mt-5 mb-5'>

<div className="ltn__team-area pt-110--- pb-90">
  <div className="container">
    <div className="row ">


 {doctor.map((doc,i) => (
        // <div >
      <div className="col-lg-3 col-sm-6 " key={i} >
        <div className="ltn__team-item ltn__team-item-3--- ">
          <div className="team-img">
          <img src={`/images/${doc.image}`} alt='product image'/>
          </div>
          <div className="team-info">
            <h4>
              <a href="team-details.html">{doc.user.name}</a>
            </h4>            <h6 className="ltn__secondary-color">Qualification : {doc.specialty}</h6>

            <div className="ltn__social-media">
              <ul>
              <Link href='/Bookdoc' className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
  Take Appointment
</Link>
              </ul>
            </div>
          </div>
        </div> 
      </div>
      // </div>
      ))}



    </div>
  </div>
</div>


</div>
        <Footer/>
    </div>
  )
}

export default Doctorlist


export async function getServerSideProps({query}) {

    db.connect()
    const { id } = query;
      // Find the document with the given ID in Document1

      const doctor = await Doctor.find().populate({
        path: 'user',
        match: { role: 'doctor' },
        select: '-_id -__v -password', // exclude these fields from the result
      }).lean();
  // const product = await Product.findOne({ _id: params.productdetails});
  // console.log(doctor);
  db.disconnect();
  return {
    props: {
      doctor:JSON.parse(JSON.stringify(doctor)),
    },
  };

}




