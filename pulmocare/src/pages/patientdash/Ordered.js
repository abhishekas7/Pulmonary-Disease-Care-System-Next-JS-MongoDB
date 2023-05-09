import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { getError } from '@/util/error';
import _ from 'lodash';
import { Modal, Button, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BillApp } from './Orderbill';


const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;


  useEffect(() => {
    const fetchOrders = async () => {
 try {
  const res = await axios.get('/api/patient/vieworders'); // replace with your API endpoint for fetching orders
  setOrders(res.data.data);
  

 } catch (error) {
  getError(error)
 }
    };
    fetchOrders();

    
  }, []);


  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
  }






  return (
    <>
      <Table striped bordered hover className="bg-white" style={{fontSize:'14px'}}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th colSpan={1}>Products</th>
            <th >Quantity</th>
             <th>Total</th>
             <th>Bill</th>
           
            
          </tr>
        </thead>
        <tbody>
        {orders.length > 0 ? (
  orders.map((order,i) => {
    const totalPrice = order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    return (
      <tr key={i}>
        <td>{order._id}</td>
        <td>{formatDate(order.createdAt)}</td>
        <td>
          {order.products.map((pro, j) => (
            <tr key={j} className='bg-transparent'>
              <td className='p-2'><img src={`images/${pro.image}`} alt="" width={80} /></td>
              <td className='p-3'>{pro.name}</td>
            </tr>
          ))}
        </td>
        <td>
          {order.products.map((pro, j) => (
            <tr key={j} className='bg-transparent'>
              <td className='p-3'><span>{pro.price}&nbsp;&nbsp;&nbsp;&nbsp;<b>X</b></span>&nbsp;&nbsp;&nbsp;&nbsp;{pro.quantity}</td>
            </tr>
          ))}
        </td>
        <td className='p-3'><span>&#x20B9;{totalPrice.toFixed(2)}</span></td>
        
        <td><BillApp orderId={order}/></td>

      
        
      </tr>
    )
  })
) : (
  <tr>
    <td colSpan="4">No orders found.</td>
  </tr>
)}
</tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <Pagination>
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
   
      </div>
      <div>
    </div>
    </>
  );
};

          
export default OrdersTable;