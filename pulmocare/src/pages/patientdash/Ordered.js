import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';
import ReactToPrint from 'react-to-print';
import axios from 'axios';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/api/orders'); // replace with your API endpoint for fetching orders
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = Array.isArray(orders) ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];

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
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.orderTotal}</td>
            </tr>
          ))}
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
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Order Total</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.orderTotal}</td>
            </tr>
          ))}
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