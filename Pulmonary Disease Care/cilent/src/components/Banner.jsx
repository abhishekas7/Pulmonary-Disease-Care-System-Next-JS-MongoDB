import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Banner() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>    
        <section className="banner-area">
    <div className="container">
        <div className="row">
            <div className="col-lg-5">
                <h4>Caring for better life</h4>
                <h1>Leading the way in medical excellence</h1>
                <p>Earth greater grass for good. Place for divide evening yielding them that. Creeping beginning over gathered brought.</p>
                {/* <Link to="" className="template-btn mt-3">take appointment</Link> */}
                
      <Button variant="primary" onClick={handleShow} className="template-btn mt-3">
       TAKE APPOINTMENT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  
            </div>
        </div>
    </div>
</section></div>
  )
}

export default Banner