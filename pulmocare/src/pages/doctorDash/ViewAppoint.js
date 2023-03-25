import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modalc from '@/components/Modal';

function ViewAppoint() {
  const [appointment,setAppointment] = useState([])
const getAppointment=async ()=>{
  const response = await axios
  .get("/api/appointments/appointment")
  .then(res => setAppointment(res.data) )
  .catch(err => console.error(err))
}
useEffect(() => {
getAppointment()
console.log(appointment);
}, [])
  return (
    <div>
        <div className='container'>
        <div className="col-lg-12">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Appointment Table</h5>
      {/* Default Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Patient Name</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Reason</th>
            <th scope="col" colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointment.map((item,i)=>(
            <tr>
            <th scope="row" key={i}>{i}</th>
            <td>{item.patient.image}</td>
            <td>{item.patient.name}</td>
            <td>{item.date}</td>
            <td>{item.patient.email}</td>
            <td>{item.phonenumber}</td>
            <td>{item.reason}</td>
            <td><Modalc btnname={'Edit'} heading={'Edit Product'} savebtn={'OK'} content={''}/></td>
  <td><button>Delete</button></td>
          </tr>
          ))
          }
        
        </tbody>
      </table>
      {/* End Default Table Example */}
    </div>
  </div>
</div>

        </div>
    </div>
  )
}

export default ViewAppoint