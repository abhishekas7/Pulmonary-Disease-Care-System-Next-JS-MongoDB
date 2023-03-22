import React, { useEffect } from 'react'
import Calender from './components/Calender'

function Appointmentprofile({doctor}) {

useEffect(() => {


  return () => {
    console.log(doctor);
  }
},)


  return (
    <div className="container mt-5">
 
<div className='row'>
<div className="col-lg-4">
      <div className="ltn__team-details-member-info text-center mb-40">
        <div className="team-details-img">
        <img src={`/images/${doctor.image}`} alt="doc photo"/>
        </div>
        <h4>{doctor.user.name}</h4>
        <p>{doctor.user.email}</p>
        <h6 className="text-uppercase ltn__secondary-color">{doctor.qualification}</h6>

      </div>
    </div>
    <div className="col-lg-8">
      <div className="ltn__team-details-member-info-details">
      <h4>Profile</h4>
        <p>
          <strong>Description</strong><br></br>{doctor.description}
        </p>
        <div className="row">
          <div className="col-lg-6">
            <div className="ltn__team-details-member-about">
              <ul>
                <li>
<strong>Name :</strong> {doctor.user.name}
                </li>
                <li>
                  <strong>Specialty :</strong> {doctor.specialty}
                </li>
              
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ltn__team-details-member-about">
              <ul>
              <li>
                  <strong>Experience :</strong> {doctor.experience}
                </li>
                <li>
                  <strong>Qualification :</strong>{doctor.qualification}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        
        <div className="ltn__form-box contact-form-box box-shadow white-bg mt-50">
          <h4 className="title-2">Booking</h4>

          <div>
            <Calender doctor={doctor}/>
          </div>
      
        </div>
      </div>
    </div>
</div>
  </div>
  )
}

export default Appointmentprofile