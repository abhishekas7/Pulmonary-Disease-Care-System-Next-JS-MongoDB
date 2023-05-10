/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import jsPDF from "jspdf";
import "jspdf-autotable";

function BillModal(props) {

    
    const [show, setShow] = useState(false);
    const [invoiceData, setInvoiceData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    function handleSendInvoice() {
        
        
        var doc = new jsPDF("portait");
        doc.setFontSize(25);
        var textWidth = doc.getTextWidth("Invoice");
        
        // Calculate the x-coordinate for the starting point of the text
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        var x = (pageWidth - textWidth) / 2;
        
        // Draw the text at the calculated position
        doc.text("Invoice", x, 20);

doc.setFontSize(9);
doc.text(`Invoice Number : ${orderId._id}`, 15, 30);
doc.text(`Date of issue : ${formatDate(orderId.createdAt)}`, 15, 35);
doc.text(`Place of supply : ${orderId.shippingAddress.state}`, 15, 40);
doc.text(`Booking ID : ${orderId._id}`, 15, 45);
doc.text(`State : ${orderId.shippingAddress.state}`, 15, 50);
doc.text(`User Name : ${orderId.user.name}`, 15, 55);   
doc.text(`User Email : ${orderId.user.email}`, 15, 60);

doc.setFontSize(8);
doc.text(`Invoice Number issued by : Pulmocare`, 120, 30);
doc.text(`Date of issue : ${formatDate(orderId.createdAt)}`, 120, 35);
doc.text(`GSIT : 6J9HHDSLDSD`, 120, 40);
doc.text(`PAN : HJALKSD6ADY8`, 120, 45);
doc.text(`State : Kerala`, 120, 50);
doc.text(`Company Address : `, 120, 55);
doc.text(`Gr. Floor, Wajeda House`, 150, 55);
doc.text(`Thrissur, Kerala, 400049`, 150, 60);
doc.text(`Email : pulmocare65@gmail.com`, 150, 65);

        

// Define the table headers
const headers = ['Name', 'Quantity', 'Price', 'Total'];

// Define the table data
const data = orderId.products.map((item) => [
  item.name,
  item.quantity,
  `${item.price.toFixed(2)}`,
  `${(item.price * item.quantity).toFixed(2)}`
]);

// If no products are found, add a row with a "No products found" message
if (orderId.products.length === 0) {
  data.push(['No products found.', '', '', '']);
}

// Create the table
doc.autoTable({
  head: [headers],
  body: data,
  startY: 80,
  theme: 'striped',
  styles: {
    fontSize: 8
  }
}); 


doc.setLineWidth(0.5); // set line width
doc.line(20, 50, 190, 50); // add horizontal line


// Add subtotal information
doc.text(`Subtotal: ${subtotal.toFixed(2)}`, 120, doc.autoTable.previous.finalY + 10);

// Add discount information
if (subtotal > 500) {
  doc.text(`Discount: ${discount.toFixed(2)} (10% Off Purchase Above 500 )`, 120, doc.autoTable.previous.finalY + 20);
} else {
  doc.text(`Discount: 0`, 120, doc.autoTable.previous.finalY + 20);
}

// Add total information
doc.text(`Total: ${total.toFixed(2)}`, 120, doc.autoTable.previous.finalY + 30);

        // add the footer to the PDF
        doc.setFontSize(10);
        doc.text('Thank you for your business!', 10, doc.internal.pageSize.getHeight() - 30);
        doc.text('Payment ID:', 400, doc.internal.pageSize.getHeight() - 30);
        


        
        // download the PDF
        doc.save('invoice.pdf');
        doc.autoPrint();
      }
      
    

    

const {orderId} = props  
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
// Calculate subtotal
const subtotal = orderId.products.reduce((acc, product) => acc + product.price * product.quantity, 0);

let discount = 0;
let total = subtotal;

// Check if the subtotal is greater than 500
if (subtotal > 500) {
  // Get the discount percentage
  const discountPercentage = 10;

  // Calculate discount amount
  discount = (subtotal * discountPercentage) / 120;

  // Calculate total
  total = subtotal - discount;
}
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h6>Generate Invoice</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Row>
          <Col md={4}>
            <h6><b>Shipping Address</b></h6>
            <div style={{fontSize:'15px'}} >
              <p>{orderId.shippingAddress.address1}</p>
              <p>{orderId.shippingAddress.address2}</p>
              <p>{orderId.shippingAddress.city}</p>
              <p>{orderId.shippingAddress.state}</p>
              <p>{orderId.shippingAddress.zip}</p>
            </div>
          </Col>
          <Col md={8}>
            <h6><b>Amount</b></h6>
            <div style={{fontSize:'15px'}} >
              <p>{orderId.total}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h6><b>Order ID</b></h6>
          
            <p style={{fontSize:'15px'}} >{orderId._id}</p>
        
            <h6><b>Date of Issue</b></h6>
            <div style={{fontSize:'15px'}} >
              <p>{formatDate(orderId.createdAt)}</p>
            </div>
            <h6><b>Billed To</b></h6>
            <div style={{fontSize:'15px'}} >
              <p>{orderId.shippingAddress.address1}</p>
              <p>{orderId.shippingAddress.address2}</p>
              <p>{orderId.shippingAddress.city}</p>
              <p>{orderId.shippingAddress.state}</p>
              <p>{orderId.shippingAddress.zip}</p>
            </div>
          </Col>
          <Col md={8}>
            <Table>
              <thead>
                <tr>
                  
                  <th>Name of Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderId.products.length > 0 ?
  orderId.products.map((item) => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>&#x20B9;{item.price.toFixed(2)}</td>
      <td>&#x20B9;{(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  )) :
  <tr>
    <td colSpan="4">No products found.</td>
  </tr>
}

              </tbody>
            </Table>
            <hr />
            <Row>
              <Col>
                <h6><b>Subtotal:</b></h6>
              </Col>
              <Col>
                <p>&#x20B9;{subtotal.toFixed(2)}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6><b>Discount:</b></h6>
              </Col>
              <Col>
                {subtotal > 500 ?
                  <p>&#x20B9;{discount} <span class="badge bg-success">10% Off Purchase Above 500 &#x20B9; </span></p> :
                  <p>&#x20B9;0</p>
    }
              </Col>
             
            </Row>
            <Row>
              <Col>
                <h6><b>Total:</b></h6>
              </Col>
              <Col>
                <p>&#x20B9;{total.toFixed(2)}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendInvoice}>
          Send Invoice
        </Button>

      </Modal.Footer>
    </Modal>
  );
}

export function BillApp({orderId}) {
  const [modalShow, setModalShow] = useState(false);
  const [orderIds, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);


  const handleOrderClick = async (orderId) => {
    try {
        setModalShow(true);
        setOrderId(orderId);
    //   const res = await axios.get(`/api/patient/vieworders/${orderId}`);
    //   const orderDetails = res.data;
    //   console.log(orderDetails);
      // do something with the order details, e.g. display in a modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => handleOrderClick(orderId)}>
        Bill
      </Button>
  

      <BillModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        orderId={orderId}
      />
    </>
  );
}
