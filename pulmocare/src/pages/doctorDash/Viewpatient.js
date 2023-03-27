import Modalc from '@/components/Modal'
import Prescription from '@/models/Prescription'
import React from 'react'
import GivePrescription from './GivePrescription'

function Viewpatient() {
  return (
    <div>
      <div className='row'>
      <div class="col-xl-3">

<div class="card">
  <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

    <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" width={'50px'}/>
    <h6>Kevin Anderson</h6>
    <h6>Web Designer</h6>
 <Modalc btnname={'Prescription'} content={<GivePrescription/>} heading={'Give Prescription'}/>
  </div>
</div>

</div>



      </div>
    </div>
  )
}

export default Viewpatient