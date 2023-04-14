import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateProfile from './UpdateProfile';
import ViewProfile from './ViewProfile';


function Patientprofile() {


    const [patientData, setPatientData] = useState([]);


  
    useEffect(() => {
      fetch('/api/patient/updateprofile')
        .then(response => response.json())
        .then(data => setPatientData(data))
        .catch(error => console.error(error));
      
    }, []);

    console.log(patientData);

  return (
    <div>

{patientData && patientData.map((data,i)=>(
            <section className="section profile">
            <div className="row">
              <div className="col-xl-3">
                <div className="card">
                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img className='rounded' src={`/images/${data.image}`} alt='person image'/>

                    <h2>{data.user.name}</h2>
                    <h6>Age : {data.age}</h6>
     
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
))}


    </div>
  )
}

export default Patientprofile


