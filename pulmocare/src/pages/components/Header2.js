import Link from 'next/link'
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { signOut, useSession } from 'next-auth/react'
import { Store } from '@/util/Store'
import { useContext } from 'react'

function Header2() {

    const { state, dispatch } = useContext(Store);

    const {cart} = state;
  
  
    const sess=useSession()
    const logout=()=>{
         signOut({callbackUrl:'/login'})
  
    }

  return (
    <>
           <Container className='p-4'>
      <Row>
        <Col> <div className="site-logo">
            <Link href="index">
              <img src="img/logo.png" alt="Logo" />
            </Link>
          </div></Col>
        <Col xs={6}>
        <div className="header-search-2">
              <form id="#123" method="get" action="#">
                <input
                  type="text"
                  name="search"
                  defaultValue=""
                  placeholder="Search here..."
                />
                <button type="submit">
                  <span>
                    <i className="icon-search" />
                  </span>
                </button>
              </form>
            </div>
        </Col>
        <Col>
        <div className="ltn__header-options">
<ul>
<li className="d-none---">
     
     <div className="ltn__drop-menu user-menu">
       <ul>
         <li>
         </li>
         <li>
           <Link href="#">
             <i className="icon-user" />
           </Link>
           
           <ul>
             <li>
              
               {sess.status==='authenticated'?(<button className='bg-light' onClick={logout}>Logout</button>):(<Link href="/login">Sign in</Link>)}
             </li>
  
             
             <li>
               <Link href="/register">Register</Link>
             </li>
             <li>
               {!sess.status==='loading'?(<div>{sess.data.user.role==='admin'?(<Link href="/admindash">Admindash</Link>):(<div>{sess.data.user.role==='admin'?(<Link href="/admindash">Admindash</Link>):(null)}</div>)}</div>):(null)}
             </li>
             <li>
               <Link href="/Patientprofile">My Account</Link>
             </li>
           </ul>
         </li>
       </ul>
     </div>
   </li>

   <li>
                {/* mini-cart 2 */}
                <div className="mini-cart-icon mini-cart-icon-2">
                  <Link
                    href="#ltn__utilize-cart-menu"
                    className="ltn__utilize-toggle"
                  >
                    <span className="mini-cart-icon">
                      <i className="icon-shopping-cart" />
                      <sup>{state.cart.cartItems.length}</sup>
                    </span>
                    <h6>
                      <span>Your Cart</span>{" "}
                      <span className="ltn__secondary-color">$89.25</span>
                    </h6>
                  </Link>
                </div>
              </li>
</ul>
            </div>
        </Col>
      </Row>

    </Container>
    {['xl'].map((expand) => (
      <Navbar key={expand} expand={expand} className="mb-3 ltn__main-menu ltn__secondary-bg" variant='light'>



        <Container fluid>
          <Navbar.Brand href="#">
          <div className="site-logo">
              <Link href="index">
                <img src="img/logo-3.png" alt="Logo" />
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>


              <div className="ltn__main-menu">
                <ul>
                  <li>
                    <Link href="/ ">Home</Link>
                  </li>
                  <li>
                    <Link href="/productpage">Products</Link>
                  </li>
                  <li>
                    <Link href="/Doctorlist">Doctors</Link>
                  </li>
                  <li>
                    <Link href="/news">News</Link>
                  </li>
                </ul>
              </div>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>
  )
}

export default Header2