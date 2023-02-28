import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Form,Button} from 'react-bootstrap'
import { RegUser } from "../services/api";

const Register = () => {

  const defaultValue = {
    usertype:'',
    email:'',
    username:'',
    password:'',
    conformpassword:'',
}


  const onValueChange = (e) =>{
    console.log(e.target.value);
    setUser({...user, [e.target.name] : e.target.value})
      // console.log(user);
}

const [user, setUser] =useState(defaultValue);

const addUserDetails = async () => {
  await RegUser(user);
  alert(JSON.stringify(user));
 
}

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link
                    to="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="../assets/images/logo/logo.png" alt="" />
                    {/* <span className="d-none d-lg-block">PulmoCare</span> */}
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Create an Account
                      </h5>
                      <p className="text-center small">
                        Enter your personal details to create account
                      </p>
                    </div>

{/* FORM STARTS */}


<div class="input-group mb-3">
<div style={{ display: 'block', 
                  width: 400, 
                  padding: 30 }}>
      <Form>
      <Form.Group className="mb-3">
          <Form.Control type="text" onChange={(e)=>onValueChange(e)}
                        placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" onChange={(e)=>onValueChange(e)}
                        placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Password" onChange={(e)=>onValueChange(e)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Conform Password" className="mb-3" onChange={(e)=>onValueChange(e)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => addUserDetails()}>
           Create Account
        </Button>
      </Form>
    </div>
</div>


                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
