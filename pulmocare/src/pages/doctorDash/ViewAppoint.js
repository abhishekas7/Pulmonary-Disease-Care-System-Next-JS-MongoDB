/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';


function ViewAppoint({appointment}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage, setAppointmentsPerPage] = useState(10);

  const [Appointmt, setAppointmt] = useState(appointment);
  
  useEffect(() => {
    fetchData();
  }, []);

    async function fetchData() {
      console.log('fetchdata');
      const response = await axios.get('/api/appointments/appointment');
      setAppointmt(response.data);
    }



  // Printing report
  const printReport = () => {
    const appointmentTable = document.getElementById('appointment-table');
    const win = window.open();
    win.document.write(`<html><head><title>Appointment Report</title></head><body>${appointmentTable.outerHTML}</body></html>`);
    win.print();
    win.close();
  }

  async function acceptHandler(id) {
    const result = await Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to accept?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Accept'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.put('/api/appointments/appointment', { status: 'confirmed', appId: id });
        console.log(response.data);
        fetchData()
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  async function rejectHandler(id) {
    const result = await Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to reject?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.put('/api/appointments/appointment', { status: 'cancelled', appId: id });
        console.log(response.data);
        fetchData()
      } catch (error) {
        console.error(error);
      }
    }
  }
  

  return (
  
    <div className='container'>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body" style={{fontSize:14}}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">Appointment Table</h5>
              <button className="btn btn-primary" onClick={printReport}>Print Report</button>
            </div>
            {/* Default Table */}
            <table id="appointment-table" className="table" border={1}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" colSpan={2}>Patient</th>
                  <th scope="col">Appointment Date</th>
                  {/* <th scope="col">Email</th> */}
                  <th scope="col">Mobile</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Status</th>
                  <th scope="col" colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>

                {Appointmt.data.length>0?Appointmt.data.map((item)=>(
                  <tr>


                    <td scope="col">#</td>
                    <td scope="col"> <img src={`images/${item.image}`} alt="" width={50} /></td>
                    <td scope="col">{item.name.first} {item.name.last} </td>
                    <td scope="col">{item.date}</td>
                    {/* <td scope="col">{item.user.email }</td> */}
                    <td scope="col">{item.phonenumber}</td>
                    <td scope="col">{item.reason}</td>
                    <td scope="col">{item.status=='confirmed'?(<button type="button" className="btn btn-success"><i className="bi bi-check-circle" /></button>
):(<button type="button" className="btn btn-danger"><i className="bi bi-x-circle" />
</button>
)}</td>
                    <td scope="col" colSpan={2}>
                      
                      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button variant="success" onClick={()=>{acceptHandler(item._id)}}  className='btn btn-success '>Accept</button>
                        <button variant="danger" onClick={()=>rejectHandler(item._id)} className='btn btn-danger'>Reject</button></div>


                    </td>
                  </tr>
)):(<p>No Appointment</p>)}

              </tbody>
            </table>
        



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