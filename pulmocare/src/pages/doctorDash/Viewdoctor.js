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
    
  </div>
</div>

      <div className='col-12'>
        <div className='row'>
    {doctors.map((item,i)=>(
 <div className='col-md-4 m-0' key={i} >
 <div className="card shadow-none p-3 m-1">
<div className='row g-0'>
<div className='col-5'>
<img src={`..//images/${item.image}`} className='img-fluid img-thumbnail' width={'150px'}/>
</div>
<div className='col-7 desfsize p-4'>
 <p><strong className='text-primary'>{item.user.name}</strong></p>
 <p><strong className='text-success'>{item.user.email}</strong></p>
 <p><strong className='text-danger'>{item.qualification}</strong><b className='p-3'><strong className='text-success'>{item.experience}</strong> years</b></p>

 <p>{item.description}</p>
 </div>

</div>
</div>

 </div>
    ))}</div>
     </div>  
    </div>
  )
}

export default Viewdoctor