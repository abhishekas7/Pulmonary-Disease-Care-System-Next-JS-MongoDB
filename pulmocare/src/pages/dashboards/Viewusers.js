// eslint-disable-next-line no-unused-vars
import Modalc from '@/components/Modal';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
const Viewusers = ({allusers}) => {
const[alluser]=useState([allusers])

useEffect(() => {
 console.log(alluser);
  
}, [])

  return (
    <div>
      <h5 className="card-title">Product Table</h5>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Role</th>
            <th scope="col">Created_Date</th>
            <th scope="col" colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>

          {

allusers.map((item,i)=>(
  <tr>
    <th scope="row" key={i}>{i+1}</th>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.status?('true'):('false')}</td>
    <td>{item.role}</td>
    <td>{item.created_at}</td>
    <td><Modalc btnname={<i class="bi bi-pencil-square"></i>}></Modalc></td>
    <td><button><i class="bi bi-trash"></i></button></td>


  </tr>
))

}
        

   
  
        </tbody>
      </table>


    </div>
  )
}

export default Viewusers