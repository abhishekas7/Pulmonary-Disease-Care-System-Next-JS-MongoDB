import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { getError } from '@/util/error';
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/admin/getAllOrders'); // replace with your API endpoint for fetching orders
        setOrders(res.data);
      } catch (error) {
        getError(error);
      }
    };
    fetchOrders();
  }, []);

  const shortenUUID = (uuid) => {
    return uuid.split('-')[0]; // Extract the first part of the UUID
  };

  const printReport = () => {
    const doc = new jsPDF();
  
    // Add additional details
    doc.setFontSize(8);
    doc.text(`Invoice Number issued by : Pulmocare`, 120, 30);
    // doc.text(`Date of issue : ${formatDate(order.createdAt)}`, 120, 35);
    doc.text(`GSIT : 6J9HHDSLDSD`, 120, 40);
    doc.text(`PAN : HJALKSD6ADY8`, 120, 45);
    doc.text(`State : Kerala`, 120, 50);
    doc.text(`Company Address : `, 120, 55);
    doc.text(`Gr. Floor, Wajeda House`, 150, 55);
    doc.text(`Thrissur, Kerala, 400049`, 150, 60);
    doc.text(`Email : pulmocare65@gmail.com`, 150, 65);
  
    let startY = 60;
    const tableColumns = ['Order ID', 'User', 'Product Name', 'Quantity', 'Total', 'Shipping Address'];
    const tableData = [];
  
    orders.forEach((order) => {
      order.products.forEach((product) => {
        const rowData = [
          shortenUUID(uuidv4()),
          order.user.name,
          product.name,
          product.quantity,
          product.price,
          `${order.shippingAddress.address1}, ${order.shippingAddress.address2}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zip}`
        ];
  
        tableData.push(rowData);
      });
    });
  
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: startY + 10,
      theme: 'grid',
      styles: { fontSize: 8 },
    });
  

  
    doc.save('order_report.pdf');
  };
  

  return (
    <>
     <div className='ml'>
     <button className='btn btn-success m-2' onClick={printReport}>Print Report</button>
     </div>
      <Table striped bordered hover className="bg-white" style={{ fontSize: '14px' }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Shipping Address</th>
            <th>Payment ID</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{shortenUUID(uuidv4())}</td> {/* Generate and shorten the UUID */}
                <td>{order.user.name}</td>
                <td>
                  {order.products.map((product) => (
                    <div key={product._id}>
                      <p>{product.name}</p>
                      <img src={`images/${product.image}`} alt={product.name} width={45} />
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.price}</p>
                    </div>
                  ))}
                </td>
                <td>{order.total}</td>
                <td>
                  {order.shippingAddress.address1}, {order.shippingAddress.address2}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}
                </td>
                <td>{order.paymentId}</td>
                <td>{order.status}</td>
                <td>{order.createdAt}</td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No Orders</td>
            </tr>
          )}
        </tbody>
      </Table>

     
    </>
  );
};

export default ViewOrders;
