import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateProfile from './UpdateProfile';
import ViewProfile from './ViewProfile';


function Patientprofile({patientdetails}) {


    const [patientData, setPatientData] = useState(patientdetails);


console.log(patientData);


  return (
    <div>
{patientData.length>0?patientData.map((data) => (
  <section className="section profile">
    <div className="row">
      <div className="col-xl-3">
        <div className="card">
          <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
            <img className='rounded' src={`/images/${data.image}`} alt='person image'/>
       
            <h2>{data.name.first} {data.name.last}</h2>
            <h6>{data.user.email}</h6>
          </div>
        </div>
      </div>
      <div className="col-xl-8">
        <div className="card">
          <div className="card-body pt-3">
            <Tabs
              defaultActiveKey="Profile"
              id="uncontrolled-tab-example"
              className="mb-3 nav nav-tabs nav-tabs-bordered"
            >
              <Tab eventKey="Profile" title="Profile" >
                <ViewProfile/>
              </Tab>
              <Tab eventKey="editprofile" title="EditProfile">
                <UpdateProfile />
              </Tab>
              <Tab eventKey="contact" title="Contact" disabled>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </section>
)):(<div><div className="mt-5 alert alert-primary alert-dismissible fade show" role="alert">
    Please Update Your Account
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
  </div></div>
)}

    </div>
  )
}

export default Patientprofile


