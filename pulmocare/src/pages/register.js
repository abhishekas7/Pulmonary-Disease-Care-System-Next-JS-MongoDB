import Script from 'next/script'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import isEmail from 'validator/lib/isEmail';
import disposableEmailDomains from 'disposable-email-domains';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const register = () => {
  const validRoles = ['patient'];
  const router = useRouter();

  return (
    <div>
      <div className="ltn__login-area pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center" data-aos="fade-left" data-aos-duration="2000">
                <h6 className="section-title" style={{fontSize:'28px'}}>
                  Create Your Account
                </h6>
       
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className='row'>

              </div>
              <div className="account-login-inner" data-aos="fade-up" data-aos-duration="1500">
                <Formik
                  initialValues={{ name: '', password: '', email: '', confirmPassword: '', role: '' }}
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .required('Required')
                      .matches(/^[A-Za-z\s]+$/, 'Name can only contain alphabets and spaces')
                      .matches(/^\S+$/, 'Name cannot contain spaces'),
                    password: Yup.string()
                      .required('Required')
                      .min(8, 'Must be at least 8 characters')
                      .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
                      ),
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Required')
                      .test(
                        'not-disposable-email',
                        'Please use a non-disposable email address',
                        (value) => {
                          if (!value) return false;
                          const [, domain] = value.split('@');
                          return isEmail(value) && !disposableEmailDomains.includes(domain);
                        }
                      )
                    ,
                    confirmPassword: Yup.string()
                      .oneOf([Yup.ref('password'), null], 'Passwords must match')
                      .required('Required'),
                    // .notOneOf([Yup.ref('password')], 'New password cannot be the same as previous password')

                    role: Yup.string()
                      .required('Required')
                      .test(
                        'valid-role',
                        'Please select a valid role',
                        (value) => validRoles.includes(value)
                      )
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await axios.post("/api/register", values);
                      console.log(response.data.status);
                  
                      // Check if the response contains an error indicating that the user already exists
                      if (!response) {
                        toast.error(response.data.message)
                        setSubmitting(false);
                        return;
                      }
                      if (response === false) {
                        toast.error("User all ready Registered");
                      } else {
                        toast.success("Register Sucessfull");
                        router.push('/user/Emailverify');
                      }
                      // If the user does not exist, redirect to the login page
                    
                      // router.push('/login');
                  
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);
                    } catch (err) {
                      console.error(err);
                      setSubmitting(false);
                    }
                  }}
                  
                >
                  {({ isSubmitting }) => (
                    <Form className="ltn__form-box">
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

                          <div className='col-12'>
                          <Field type="text" name="email" placeholder="Email*" className="form-control" />
                      <ErrorMessage name="email" className="error-message" component="div" />
                        </div>
                        <div className='col-6'>
                    
                        <button
                          className="theme-btn-1 btn reverse-color btn-block"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Creating account...' : 'CREATE ACCOUNT'}
                        </button>
                   
                        </div>
                        <div className='col-6'>
                        <Link href="/login"><p style={{fontSize:'14px',paddingTop:'15px'}}>ALREADY HAVE AN ACCOUNT ?</p></Link>

                        </div>
              

                        </div>
                      </div>
                     
                 
                    
                 
                    </Form>
                  )}
                </Formik>

          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default register