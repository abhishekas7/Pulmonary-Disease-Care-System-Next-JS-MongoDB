/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Footer from "./Footer";
import Header from "./components/Header";
import { Modal, Button } from "react-bootstrap";
import Modalc from "@/components/Modal";
import Doctor from "@/models/Doctor";
import db from "@/util/db";
import Link from "next/link";
import Navbar1 from "./components/Navbar1";
import Navbarr from "./components/Navbar";

const Doctorlist = ({ doctor }) => {
  const [showModal, setShowModal] = React.useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  

  return (
    <div>
      
      <Header/>
      <div className="mt-5 mb-5">
        <div className="ltn__team-area pt-110--- pb-90">
          <div className="container">
            <div className="row ">
              {doctor.map((doc, i) => (
                // <div >
                <div className="col-lg-3 col-sm-6 " key={i}  data-aos="fade-up">
                  <div className="ltn__team-item " >
                    <div className="team-img">
                      <img src={`/images/${doc.image}`} alt="doc image" className="img-fluid"/>
                    </div>
                    <div className="team-info">
                      <h4>
                        <a href="team-details.html">{doc.user.name}</a>
                      </h4>
                      <h6 className="ltn__secondary-color">
                        {doc.specialty}
             
                      </h6>

                      <div className="ltn__social-media">
                        <ul>
                          <Link href={`/doctor/${doc._id}`}>
                            <button class="theme-btn-1 btn btn-effect-1">
                              Take Appointments
                            </button>
                          </Link>{" "}
                          
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
      <Footer />
    </div>
  );
};

export default Doctorlist;

export async function getServerSideProps() {
  await db.connect();

  // Find the document with the given ID in Document1

//   const doctor = await Doctor.find()
//     .populate({
//       path: "user",
//       match: { role: "doctor" },
//       select: "-_id -__v -password", // exclude these fields from the result
//     })
//     .lean();
//   // const product = await Product.findOne({ _id: params.productdetails});
//   // console.log(doctor);
//  await db.disconnect();
//   return {
//     props: {
//       doctor: JSON.parse(JSON.stringify(doctor)),
//     },
//   };
// }
