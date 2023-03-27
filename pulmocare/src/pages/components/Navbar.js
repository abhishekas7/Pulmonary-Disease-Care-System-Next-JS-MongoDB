import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbarr() {
  return (
    <div>
     <Navbar  expand="lg" className='na'>
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',margin:'0 auto'}}
            navbarScroll
          >
                          <Nav.Link href="/ ">Home</Nav.Link>
               <Nav.Link href="/productpage">Products</Nav.Link>
               <Nav.Link href="/Doctorlist">Doctors</Nav.Link>
               <Nav.Link href="/news">News</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navbarr