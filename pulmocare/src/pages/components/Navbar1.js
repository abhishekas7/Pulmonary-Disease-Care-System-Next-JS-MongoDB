import Link from 'next/link';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { signOut, useSession } from 'next-auth/react'
import { Store } from '@/util/Store'
import { useContext } from 'react'
import { Badge } from 'react-bootstrap';

function Navbar1() {
    const { state, dispatch } = useContext(Store);

    const {cart} = state;
  
  
    const sess=useSession()
    const logout=()=>{
         signOut({callbackUrl:'/login'})
  
    }
  return (
    <div>
        
        <Navbar bg="light" expand="lg">

      <Container fluid>
        <Navbar.Brand href="#">Pulmocare</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
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
    <div className='ml-5 margin-nav'>
    <h6>
    <i className="icon-shopping-cart" /><Badge bg="success"> {state.cart.cartItems.length}</Badge>
      </h6>
    <Link
                    href="#ltn__utilize-cart-menu"
                    className="ltn__utilize-toggle"
                  >
                    <span className="mini-cart-icon">
                      
                     
                    </span>
                    <h6>
                    <Link href={'/Addtocart'}>
                    <span>Your Carts</span>{" "}
                    </Link>
                      {/* <span className="ltn__secondary-color">$89.25</span> */}
                    </h6>
                  </Link>
                  
    </div>
    

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navbar1