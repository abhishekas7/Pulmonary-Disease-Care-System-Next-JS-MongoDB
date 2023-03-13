import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Bg from '../images/doc_pat.png'
function Login() {
  const [data, setData] = useState([]);
const navigate = useNavigate();
useEffect(() => {
    const myValue = sessionStorage.getItem("myKey");
    const type = sessionStorage.getItem("type");
    console.log(type)
    if(myValue&& type==='user'){
      console.log(myValue)
      navigate('/userdash')
    }
    if(myValue&& type==='admin'){
      console.log(myValue)
      navigate('/admindash')
    }
    if(myValue&& type==='doctor'){
      console.log(myValue)
      navigate('/docdash')
    }
});


  return (
<>
<div className="container-fluid">
  <div className="row ">
    <div className="col-6 mt-5">
    <img src={Bg} alt='ss' className='img-fluid' width={400}/>
 <div className="w-100 mt-5">
 <div className="col-md-5 d-block">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          } 
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('http://localhost:8000/login', values)
          
            .then(response => {
              console.log(response);
              setData([...data, response.data]);
              console.log(response.data.user.role);
              const my = sessionStorage.setItem("myKey",response.data.token);
              sessionStorage.setItem("data",response.data.user.name);
              const myValue = sessionStorage.setItem("type",response.data.user.role);
              setSubmitting(false);
              navigate('/login')
            })
            .catch(error => {
              console.log(error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <Field type="text" name="email" className="form-control" placeholder="Enter your name" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="text" name="password" className="form-control" placeholder="Enter your age" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      </div>
 </div>
    </div>
    <div className="col-6">
      ddd
    </div>
  </div>
</div>
</>

    
  );
}

export default Login;
