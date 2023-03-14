import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  phone: Yup.string().required("Phone number is required"),
  age: Yup.number().required("Age is required").positive().integer(),
  gender: Yup.string().required("Gender is required"),
  message: Yup.string().required("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  subject: "",
  phone: "",
  age: "",
  gender: "",
  message: "",
};

const Boodoc = () => {

  console.log();
  
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
    <Header/>
  
    <div className="container p-5 ">
      <h1>Slot Validation</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          
          <Form>
            <div className="col-12">
            <div className="row">
            <div className="col-md-6">
               <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                type="text"
                className={`input-item form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
              />
              {errors.name && touched.name ? (
                <div className="invalid-feedback">{errors.name}</div>
              ) : null}
            </div>
            </div>
            <div className="col-md-6">
            <div className="input-item form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className={`input-item form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
              />
              {errors.email && touched.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </div>  
            </div>
            <div className="col-md-6">
            <div className="input-item form-group">
              <label htmlFor="subject">Subject</label>
              <Field
                name="subject"
                type="text"
                className={`input-item form-control ${
                  errors.subject && touched.subject ? "is-invalid" : ""
                }`}
              />
              {errors.subject && touched.subject ? (
                <div className="invalid-feedback">{errors.subject}</div>
              ) : null}
            </div>
            </div>
            <div className="col-md-6">
            <div className="input-item form-group">
              <label htmlFor="phone">Phone</label>
              <Field
                name="phone"
                type="text"
                className={`input-item form-control ${
                  errors.phone && touched.phone ? "is-invalid" : ""
                }`}
              />
              {errors.phone && touched.phone ? (
                <div className="invalid-feedback">{errors.phone}</div>
              ) : null}
            </div>
            </div>

<div className="col-md-6">
<div className="form-group">
              <label htmlFor="age">Age</label>
              <Field
                name="age"
                type="number"
                className={`input-item form-control ${
                  errors.age && touched.age ? "is-invalid" : ""
                }`}
              />
              {errors.age && touched.age ? (
                <div className="invalid-feedback">{errors.age}</div>
              ) : null}
            </div>
</div>
<div className="col-md-6">
   <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <Field
                name="gender"
                component="select"
                className={`input-item input-item form-control ${
                  errors.gender && touched.gender
                  ? "is-invalid"
                  : ""
              }`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  {errors.gender && touched.gender ? (
                    <div className="invalid-feedback">{errors.gender}</div>
                  ) : null}
                </div>
</div>
<div className="col-md-6">

</div>
            </div>
            </div>  
         
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <Field
                    name="message"
                    component="textarea"
                    className={`input-item form-control ${
                      errors.message && touched.message ? "is-invalid" : ""
                    }`}
                  />
                  {errors.message && touched.message ? (
                    <div className="invalid-feedback">{errors.message}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <Footer/>

    </>
     );
    };
    
export default Boodoc       