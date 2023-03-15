import React from 'react'
import Calender from './components/Calender'

function Appointmentprofile() {
  return (
    <div className="container mt-5">
<div className='row'>
<div className="col-lg-4">
      <div className="ltn__team-details-member-info text-center mb-40">
        <div className="team-details-img">
          <img src="img/team/4.jpg" alt="Team Member Image" />
        </div>
        <h4>Rosalina D. William</h4>
        <h6 className="text-uppercase ltn__secondary-color">Heart Surgeon</h6>
        <div className="ltn__social-media-3">
          <ul>
            <li>
              <a href="#" title="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="#" title="Twitter">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="#" title="Linkedin">
                <i className="fab fa-linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="col-lg-8">
      <div className="ltn__team-details-member-info-details">
      <h4>Profile</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <div className="row">
          <div className="col-lg-6">
            <div className="ltn__team-details-member-about">
              <ul>
                <li>
                  <strong>Name :</strong>doc.name
                </li>
                <li>
                  <strong>Specialty :</strong> Pulmologist
                </li>
              
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ltn__team-details-member-about">
              <ul>
              <li>
                  <strong>Experience :</strong> 4+ Years
                </li>
                <li>
                  <strong>Qualification :</strong> MD,MBBS
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        
        <div className="ltn__form-box contact-form-box box-shadow white-bg mt-50">
          <h4 className="title-2">Booking</h4>

          <div>
            <Calender/>
          </div>
      
        </div>
      </div>
    </div>
</div>
  </div>
  )
}

export default Appointmentprofile