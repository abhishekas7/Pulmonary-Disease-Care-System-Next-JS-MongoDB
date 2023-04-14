import React, { useEffect, useState } from 'react'



function Deafultpage() {
    const [patientData, setPatientData] = useState([]);


  
    useEffect(() => {
      fetch('/api/patient/updateprofile')
        .then(response => response.json())
        .then(data => setPatientData(data))
        .catch(error => console.error(error));
      
    }, []);
  return (
    <div>
        <div className='col-12'>

        {patientData && patientData.map((data,i)=>(
        <div className="card">
        <div className="card-body p-5">
            <div className='row'>
                <div className='col-3'>
                <img className='rounded' src='/images/welcome.png' alt='person image'/>

                </div>
                <div className='col-9'>
                <p>Welcome back</p>
<h1 className="card-title m-0 p-0">{data.user.name}</h1>
<p>We would like to take this opportunity to welcome you to our practice and to thank you for choosing our physicians to participate in your healthcare. We look forward to providing you with personalized, comprehensive health care focusing on wellness and prevention.</p>

                    </div>
            </div>

        </div>
      </div>
        ))}



        </div>
    </div>
  )
}

export default Deafultpage