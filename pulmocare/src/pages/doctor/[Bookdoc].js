import Calender from '../components/Calender'
import React from 'react'
import Appointmentprofile from '../Appointmentprofile'
import Header from '../components/Header'
import Footer from '../Footer'
import Doctor from '@/models/Doctor'
import db from '@/util/db'


function Bookdoc({doctor}) {
  return (
 

   <>
<p></p>
   <Header/>
   <Appointmentprofile doctor={doctor}/>
   <Footer/>
   </>
    
  )
}

export default Bookdoc

export async function getServerSideProps({ params }) {
  // const product =await Product.findbyId(params.productdetails
    db.connect()
  const doctor = await Doctor.findById(params.Bookdoc).populate('user').lean();

  // const product = await Product.findOne({ _id: params.productdetails});
  console.log(doctor);
  db.disconnect();
  return {
    props: {
      doctor:JSON.parse(JSON.stringify(doctor)),
    },
  };
  
  }