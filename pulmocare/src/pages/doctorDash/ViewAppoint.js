import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modalc from '@/components/Modal';
const _ = require('lodash');


function ViewAppoint({doctor,appointment}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage, setAppointmentsPerPage] = useState(10);
  
  useEffect(() => {
    console.log(appointment)
  }, [])

  const date = new Date('');
  const formattedDate = date.toLocaleString();

  // Pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointment.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(appointment.length / appointmentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  {currentAppointments.map((item,i)=>(
                    

                    <tr key={i}>

                      {item.reason==0?(''):(<div>
                      <th scope="row">{i+1}</th>
                      <td></td>
                      <td>{item.patient.name}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                      <td>{new Date(item.created_at).toLocaleString()}</td>
                      <td>{item.patient.email}</td> 
                      <td>{item.phonenumber}</td>
                      <td>{item.reason}</td>
                      <td><Modalc btnname={'Edit'} heading={'Edit Product'} savebtn={'OK'} content={''}/></td>
                      <td><button>Delete</button></td></div>)}


                    </tr>
                  ))}


                </tbody>
              </table>
              Pagination
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  {pageNumbers.map(number => (
                    <li className="page-item" key={number}>
                      <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                    </li>
                  ))}
                </ul>
              </nav>
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