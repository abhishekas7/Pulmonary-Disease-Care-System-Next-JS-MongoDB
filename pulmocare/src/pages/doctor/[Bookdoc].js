
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */import React from 'react'
import Appointmentprofile from '../Appointmentprofile'
import Header from '../components/Header'
import Footer from '../Footer'
import Doctor from '@/models/Doctor'
import db from '@/util/db'
import Appointment from '@/models/Appointment'


function Bookdoc({doctor}) {
  return (
    <>
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
  const doctor = await Doctor.findById(params.Bookdoc).populate().lean();
  const appointment = await Appointment.find()


  // const product = await Product.findOne({ _id: params.productdetails});

  db.disconnect();
  return {
    props: {
      doctor:JSON.parse(JSON.stringify(doctor)),
    },
  };
  
  }