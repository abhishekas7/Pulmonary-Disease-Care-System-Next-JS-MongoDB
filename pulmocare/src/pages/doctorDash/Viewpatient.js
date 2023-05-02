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
console.log();

  return (
    <div>
      <div className='row'>

      <div class="col-xl-3">
      {Appointmt.length > 0 ? Appointmt.map((data, i) => (
  <div className="card mt-3" key={i}>
    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
    <img src={`images/${data.patient.image}`} alt="" width={80}  />      <h5 className='mt-3'>{data.patient.name.first} {data.patient.name.last}</h5>
      <p>Patient</p>
      <p>4585</p>
      <Modalc btnname={'Prescription'} content={<Demo />} heading={'Give Prescription'} />
    </div>
  </div>
)) : (<p>NO ADDMISSION</p>)}



</div>



      </div>
    </div>
  )
}

export default Viewpatient