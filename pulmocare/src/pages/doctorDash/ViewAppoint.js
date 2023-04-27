import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modalc from '@/components/Modal';
const _ = require('lodash');


function ViewAppoint({doctor,appointment}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage, setAppointmentsPerPage] = useState(10);

  const [Appointmt, setAppointmt] = useState(appointment);
  
useEffect(() => {
  setAppointmt(appointment)
}, [Appointmt])

console.log(Appointmt);
  const date = new Date('');
  const formattedDate = date.toLocaleString();


  // Printing report
  const printReport = () => {
    const appointmentTable = document.getElementById('appointment-table');
    const win = window.open();
    win.document.write(`<html><head><title>Appointment Report</title></head><body>${appointmentTable.outerHTML}</body></html>`);
    win.print();
    win.close();
  }

  return (
  
      <div className='container'>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Appointment Table</h5>
                <button className="btn btn-primary" onClick={printReport}>Print Report</button>
              </div>
              {/* Default Table */}
              <table id="appointment-table" className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Scheduled</th>
                    <th scope="col">Date</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Reason</th>
                    <th scope="col" colSpan={2}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  


                </tbody>
              </table>
              {Appointmt.map((item,i)=>(
<tr key={i}>
                    <td>{i+1}</td>
                    <td>Image</td>
                    {/* <td>{item.patient.user.name}</td>
                    <td>{new Date(item.date).toLocaleString()}</td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                    <td>{item.patient.email}</td> 
                    <td>{item.phonenumber}</td>
                    <td>{item.reason}</td> */}
                    <td>Actions</td>
                    <td>Actions</td>
                  </tr>
 ))}
              {/* End Default Table Example
    </div>
  </div>
</div>

<div className="container mt-5">
  <div className="row">
    <div className="col-6">
      {/* Add Report Printing Functionality */}
      <button className="btn btn-primary" onClick={() => window.print()}>Print Report</button>
    </div>
    <div className="col-6">
      {/* Add Pagination Functionality */}
    </div>
  </div>
</div>
</div>
  );
}
export default ViewAppoint;