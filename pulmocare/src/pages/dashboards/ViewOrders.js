/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { getError } from '@/util/error';
import _ from 'lodash';
import { Modal, Button, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import BillApp from './Orderbill';



const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const indexOfLastOrder = currentPage * ordersPerPage;



  useEffect(() => {
    const fetchOrders = async () => {
 try {
  const res = await axios.get('/api/admin/getAllOrders'); // replace with your API endpoint for fetching orders
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



console.log(orders);


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
    orders.map((item, i) => (
      <tr key={i}>
        <td>{item._id}</td>
        {/* Render other table cells here */}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6}>No Orders</td>
    </tr>
  )}
</tbody>


      </Table>

      <div>
      </div>
    </>
  );
};

          
export default ViewOrders;