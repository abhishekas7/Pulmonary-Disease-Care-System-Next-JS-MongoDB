/* eslint-disable @next/next/no-css-tags */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProduct from './EditProduct';
import Modalc from '@/components/Modal';

const ViewProduct = ({productss}) => {
  const [products, setProducts] = useState([productss]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
 const get=async ()=>{
  const produ= await axios.get('/api/product/viewproduct').then((response) => {
 
    setProducts(response.data);
    
  });
 }
  useEffect(() => {
   get()
   console.log(products);
  }, []);

  // Logic to calculate which products should be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Logic to render pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
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
            <th scope="col" colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>

        {

products.map((item,i)=>(
  <tr>
  <th scope="row" key={i}>{i}</th>
  <td>{item.name}</td>
  <td>{item.description}</td>
  <td><img src={`..//images/${item.image}`} className='img-fluid' width={'50px'}/></td>
  <td>{item.price}</td>
  <td>{item.manufacturer}</td>
  <td>{item.prescription_required?('true'):('false')}</td>
  <td>{item.quantity}</td>
  <td>{item.category}</td>
  <td>{item.status?('true'):('false')}</td>
  <td><Modalc btnname={'Edit'} heading={'Edit Product'} savebtn={'OK'} content={<EditProduct/>}/></td>
  <td><button>Delete</button></td>


</tr>
))

}
        

   
         
        </tbody>
      </table>
      {/* End Default Table Example */}
    </div>
  </div>
</div>

      {/* Render pagination buttons */}
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ViewProduct;


