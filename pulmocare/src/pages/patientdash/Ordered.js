import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import { getError } from '@/util/error';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = Array.isArray(orders) ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];

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
    // [currentOrders[0].cartitems[0].products].map((product)=>console.log(product))
    
  }, []);

  // Get current orders
 
  {currentOrders.map((item)=>{
    [item.cartitems].map((prod)=>{
      [prod.products].map((it)=>{
       it.map((j)=><div key={j.productId}>{j.name}</div>)
      })
    })
  })}
  // const products = currentOrders[0].cartitems.products;
  // console.log(products)
  // console.log(currentOrders[0].cartitems);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Component to print the order table
  const OrderTableToPrint = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Order Total</th>
          </tr>
        </thead>
        <tbody>
      <tr>
        <td>d</td>
        <td>d</td>
        <td>d</td>
        
      </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <Table striped bordered hover className="bg-white">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Username</th>
            <th>Order Date</th>
            <th>Products</th>


            <th>Order Total</th>
            
          </tr>
        </thead>
<tbody>
  { currentOrders.length > 0 ? (
    currentOrders.map((order) => (
      <tr key={order._id}>
        <td>{order._id}</td>
        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        <td>{order.user.name}</td>
        <td>
        {order.cartitems.map((cartItem) => (
  <div key={cartItem.productId}>{cartItem.productId}</div>
))}
</td>
      </tr>
    ))
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
        <ReactToPrint
          trigger={() => (
            <Button variant="outline-primary">
              <FaPrint /> Print
            </Button>
          )}
          content={() => this.OrderTableRef}
        />
      </div>
      <div style={{ display: 'none' }}>
        <OrderTableToPrint ref={(el) => (this.OrderTableRef = el)} />
      </div>
    </>
  );
};

          
export default OrdersTable;