import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {
  return (
<>
    <header className="header-area">
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 d-md-flex">
                        <h6 className="mr-3"><span className="mr-2"><i className="fa fa-mobile"></i></span> call us now! +1 305 708 2563</h6>
                        <h6 className="mr-3"><span className="mr-2"><i className="fa fa-envelope-o"></i></span> medical@example.com</h6>
                        <h6><span className="mr-2"><i className="fa fa-map-marker"></i></span> Find our Location</h6>
                    </div>
                    <div className="col-lg-3">
                        <div className="social-links">
                            <ul>
                                <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-instagram"></i></Link></li>
                                <li><Link to="#"><i className="fa fa-vimeo"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="header" >
            <div className="container">
                
                <div className="">
                <Navbar expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link"> <Link to={'/login'}>LOGIN</Link></Nav.Link>
           

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>		
                </div>
                <div>

                </div>
            </div>
        </div>
    </header>
</>
  )
}

export default Header