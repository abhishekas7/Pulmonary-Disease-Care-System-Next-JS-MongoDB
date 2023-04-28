

import React, { useEffect, useState } from 'react'

function ViewProfile() {

    const [patientData, setPatientData] = useState([]);


  
    useEffect(() => {
      fetch('/api/patient/updateprofile')
        .then(response => response.json())
        .then(data => setPatientData(data))
        .catch(error => console.error(error));
      
    }, []);


  return (
<div>
{patientData.length === 0 ? (
  <p>No patient data found</p>
) : (
  <>
    {patientData.map((data, i) => (
      <div
        key={i}
        className="tab-pane fade profile-overview active show"
        id="profile-overview"
        role="tabpanel"
      >
        <h5 className="card-title">Profile Details</h5>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-lg-3 col-md-4 label">First Name</div>
              <div className="col-lg-9 col-md-8">{data.name.first}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Email</div>
              <div className="col-lg-9 col-md-8">{data.user.email}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Phone</div>
              <div className="col-lg-9 col-md-8">{data.mobile}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">City</div>
              <div className="col-lg-9 col-md-8">{data.address.city}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">State</div>
              <div className="col-lg-9 col-md-8">{data.address.state}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Street</div>
              <div className="col-lg-9 col-md-8">{data.address.street}</div>
            </div>
          </div>

          <div className="col-6">
            <div className="row">
              <div className="col-lg-3 col-md-4 label">Last Name</div>
              <div className="col-lg-9 col-md-8">{data.name.last}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Age</div>
              <div className="col-lg-9 col-md-8">{data.age}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Gender</div>
              <div className="col-lg-9 col-md-8">{data.gender}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Date Of Birth</div>
              <div className="col-lg-9 col-md-8">{data.dateOfBirth}</div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)}

 
</div>

  )
}

export default ViewProfile


