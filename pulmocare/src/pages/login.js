import Script from 'next/script'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify'
import { signIn,useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import User from '@/models/User';
import { useEffect } from 'react';

export default function Home() {
  const router=useRouter()
  const data=useSession()
  console.log(data)
  useEffect(() => {
    if(data.status=='authenticated'){
      router.push('/')
    }
  }, [])
    
  return (
  <>

  <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />
  <link rel="stylesheet" href="css/font-icons.css" />
  <link rel="stylesheet" href="css/plugins.css" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/responsive.css" />
<div className="ltn__login-area pb-65">
  {data.status}
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="section-title-area text-center">
          <h6 className="section-title">
            Sign In <br />
            To Your Account
          </h6>
          <p>
            Sign in to your Account<br />
            Order Medical products from PulmoCare as Per the Physician Suggestion
          </p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="account-login-inner">
        <Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  })}
  onSubmit={async (values, { setSubmitting, resetForm }) => {
    const result = await signIn('credentials', {
      redirect: false,
      email:values.email,
      password:values.password,
      });
if(result.error){
  toast.error(result.error)

}else{
  toast.success('Successfully logged')
  router.push('/')
}
      resetForm();
      
  }}
>
  {formik => (
    <Form className="ltn__form-box contact-form-box">
      <Field type="text" name="email" placeholder="Email*" />
      <ErrorMessage name="email" className="text-danger" />

      <Field type="password" name="password" placeholder="Password*" />
      <ErrorMessage name="password" className="text-danger" />

      <div className="btn-wrapper mt-0">
        <button className="theme-btn-1 btn btn-block" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Signing in...' : 'SIGN IN'}
        </button>
      </div>

      <div className="go-to-btn mt-20">
        <a href="#">
          <small>FORGOTTEN YOUR PASSWORD?</small>
        </a>
      </div>
    </Form>
  )}
</Formik>

        </div>
      </div>
      <div className="col-lg-6">
        <div className="account-create text-center pt-50">
          <h4>DONT HAVE AN ACCOUNT?</h4>
          <p>
        Go to Register Page and Creat the Account First <br />
            Happy Diagnosis 
          </p>
          <div className="btn-wrapper">
            <a href="register" className="theme-btn-1 btn black-btn">
              CREATE ACCOUNT
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<Script src="https://example.com/script.js" />
<Script src="js/plugins.js"></Script>
  </>
  )
}
