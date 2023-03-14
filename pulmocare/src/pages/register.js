import Script from 'next/script'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';


const register = () => {
  
  return (
    <div>
  <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />
  <link rel="stylesheet" href="css/font-icons.css" />
  <link rel="stylesheet" href="css/plugins.css" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/responsive.css" />
  <div className="ltn__login-area pb-110">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="section-title-area text-center">
          <h1 className="section-title">
            Register <br />
            Your Account
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
            Sit aliquid, Non distinctio vel iste.
          </p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <div className='row'>
            
        </div>
        <div className="account-login-inner">
        <Formik
  initialValues={{ name: '', password: '', email: '', confirmPassword: '', role: '' }}
  validationSchema={Yup.object({
    name: Yup.string().required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Must be at least 8 characters'),
    email: Yup.string().email('Invalid email address').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    role: Yup.string().required('Required')
  })}
  onSubmit={async (values, { setSubmitting }) => {
    const response= await axios
      .post("/api/register",values)
      .then(res => console.log(res.data) )
      .catch(err => console.error(err));

    setTimeout(async() => {
      
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }}
>
  {({ isSubmitting }) => (
    <Form className="ltn__form-box contact-form-box">
      <div className="col-12 p-0">
        <div className="row p-0">
          <div className="col-12 p-3">
            <Field as="select" name="role" className="form-control p-4">
              <option value="">Select role</option>
              <option value="patient">Patient</option>
            </Field>
            <ErrorMessage name="role" className="error-message" component="div" />
          </div>
          <div className="col-6">
            <Field type="text" name="name" placeholder="Username" className="form-control" />
            <ErrorMessage name="name" className="error-message" component="div" />
          </div>
          <div className="col-6">
            <Field
              type="password"
              name="password"
              placeholder="Password*"
              className="form-control"
            />
            <ErrorMessage name="password" className="error-message" component="div" />
          </div>
          <div className="col-12">
            <Field type="password" name="confirmPassword" placeholder="Confirm Password*" className="form-control" />
            <ErrorMessage name="confirmPassword" className="error-message" component="div" />
          </div>
        </div>
      </div>
      <Field type="text" name="email" placeholder="Email*" className="form-control" />
      <ErrorMessage name="email" className="error-message" component="div" />
      <div className="checkbox-wrapper">
  
      </div>
      <div className="btn-wrapper">
        <button
          className="theme-btn-1 btn reverse-color btn-block"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'CREATE ACCOUNT'}
        </button>
      </div>
    </Form>
  )}
</Formik>

          <div className="by-agree text-center">
            
            <div className="go-to-btn mt-50">
              <Link href="login">ALREADY HAVE AN ACCOUNT ?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    




<Script src="https://example.com/script.js" />
<Script src="js/plugins.js"></Script>
    </div>
  )
}

export default register