import Modalc from '@/components/Modal'
import Prescription from '@/models/Prescription'
import axios from 'axios'
import React, { } from 'react'
import { useState, useEffect, useRef } from 'react';

import Demo from './Prescribe'





function Viewpatient() {

  const [patients, setPatients] = useState([]);

  const getPatients = async () => {
    // const response = await axios.get('/api/doctor/viewownpatient');
    // setPatients(response.data);
  };

  useEffect(() => {
    getPatients();
  }, []);

  useEffect(() => {
    console.log(patients);
  }, [patients]);

  const patientsRef = useRef(patients);
  useEffect(() => {
    patientsRef.current = patients;
  }, [patients]);

  return (
    <div>
      <div className='row'>

      <div class="col-xl-3">

<div class="card mt-3">
  <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

    <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" width={'50px'}/>
    <h5 className='mt-3'>Rajeesh</h5>
    <p>Patient</p>
    <p>4585</p>
 <Modalc btnname={'Prescription'} content={<Demo/>} heading={'Give Prescription'}/>
  </div>
</div>

</div>



      </div>
    </div>
  )
}

export default Viewpatient