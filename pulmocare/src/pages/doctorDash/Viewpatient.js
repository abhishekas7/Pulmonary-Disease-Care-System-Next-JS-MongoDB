import Modalc from '@/components/Modal'
import axios from 'axios'
import React, { } from 'react'
import { useState, useEffect, useRef } from 'react';
import Demo from './Prescribe'
function Viewpatient() {
  const [Appointmt, setAppointmt] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

    async function fetchData() {
      console.log('fetchdata');
      const response = await axios.get('/api/doctor/viewownpatient');
      setAppointmt(response.data.appointments);
    }
  return (
    <div className='col-12'>
      <div className='row'>
      {Appointmt.length > 0 ? Appointmt.map((data, i) => (
      <div class="card m-3 col-3" key={i}>
      
      <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
    <img src={`images/${data.patient.image}`} alt="" width={70} className="img-fluid"/>      <h5 className='mt-3'>{data.patient.name.first} {data.patient.name.last}</h5>
      <b><span>{data.patient.gender}   |  {data.patient.age}</span></b>
    
      <p>{data.patient.mobile}</p>
      <i>Reason : {data.reason}</i><br></br>
      <Modalc btnname={'Prescription'} content={<Demo Data={data} />} heading={'Give Prescription'} />
    </div>
</div>
)) : (<p>NO APPOINTMENT YET</p>)}
      </div>
    </div>
  )
}
export default Viewpatient