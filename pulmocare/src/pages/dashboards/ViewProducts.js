/* eslint-disable @next/next/no-css-tags */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modalc from '@/components/Modal';
import UpdateProducts from './UpdateProducts';


const ViewProduct = ({productss}) => {
  const [products, setProducts] = useState(productss);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);



  function shortenProductName(name) {
    if (name.length > 10) {
      return name.substring(0, 50) + '...';
    } else {
      return name;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

    async function fetchData() {

      const response = await axios.get('/api/product/viewproduct');
      setProducts(response.data.data);

    }


  async function Enable(id) {
    const result = await Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to Enable?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enable'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.put('/api/product/viewproduct', { status: 'true', productId: id });
        console.log(response.data);
        fetchData()
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function Disable(id) {
    const result = await Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to Disable?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Disable'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.put('/api/product/viewproduct', { status: 'false', productId: id });
        console.log(response.data);
        fetchData()
      } catch (error) {
        console.error(error);
      }
    }
  }



  
  return (
    <div>

  {/* Vendor CSS Files */}
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
  <link
    href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
    rel="stylesheet"
  />
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet" />
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet" />
  {/* Template Main CSS File */}
  <link href="assets/css/style.css" rel="stylesheet" />
    
<div className="col-lg-12">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Product Table</h5>
 


      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Prescription</th>
            <th scope="col">quantity</th>
            <th scope="col">category</th>
            <th scope="col">status</th>
            <th scope="col" colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>

        {products.map((item,i)=>(
  <tr>
  <th scope="row" key={i}>{i}</th>
  <td>{item.name}</td>
  <td>{shortenProductName(`${item.description}`)}</td>
  <td><img src={`..//images/${item.image}`} className='img-fluid' width={'50px'}/></td>
  <td>{item.price}</td>
  <td>{item.manufacturer}</td>
  <td>{item.prescription_required?( <span className="badge rounded-pill bg-warning text-dark">Yes</span>):( <span className="badge rounded-pill bg-info text-dark">No</span>)}</td>
  <td>{item.quantity}</td>
  <td>{item.category}</td>
  <td>{item.status?(
<span className="badge bg-warning text-dark"><i className="bi bi-check-circle me-1" /> Enable</span>):(<span className="badge bg-danger"><i className="bi bi-exclamation-octagon me-1" /> Disabled</span>)}</td>

  <td> <div className="btn-group" role="group" aria-label="Basic mixed styles example">
<button variant="success" onClick={()=>{Enable(item._id)}}  className='btn btn-success '><ion-icon name="checkbox-outline"></ion-icon></button>
      <button variant="danger" onClick={()=>Disable(item._id)} className='btn btn-danger'><ion-icon name="close-circle-outline"></ion-icon></button></div>
</td>
  <td>
 
<Modalc  btnname={<ion-icon name="pencil-outline"></ion-icon>} content={<UpdateProducts Item={item}/>} />
  </td>
</tr>
))

}
        
        </tbody>
      </table>
      {/* End Default Table Example */}
    </div>
  </div>
</div>


    </div>
  );
};

export default ViewProduct;


