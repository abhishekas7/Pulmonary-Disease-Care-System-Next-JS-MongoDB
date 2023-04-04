import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Viewdoctor() {
  const [doctors,setdoctors] = useState([])
  const getdoctors=async ()=>{
    const response = await axios
    .get("/api/doctor/viewdoctor")
    setdoctors(response.data)
  }
  useEffect(() => {
  getdoctors()
  console.log(doctors);
  }, [])

  return (
    <div>

<div className='col-12'>
  <div className='row'>
  {doctors.map((item,i)=>(
    <div className="col-lg-3" key={i}>
        {/* Card with an image on top */}
        <div className="card">
          <div style={{marginLeft:'30px'}} className='p-3'>
          <img src={`..//images/${item.image}`} className='img-fluid img-thumbnail' width={'150px'} />

          </div>
          <div className="card-body">
            <h5 className="card-title">{item.user.name}</h5>
            <p className="card-title">{item.user.email}</p>
            <p className="card-text">{item.qualification}</p>
          </div>
        </div>{/* End Card with an image on top */}
      </div>

))}
  </div>
</div>

      
    </div>
  )
}

export default Viewdoctor