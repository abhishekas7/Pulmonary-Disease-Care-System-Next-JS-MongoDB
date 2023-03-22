import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddDoctor = () => {

const[image,setImage] = useState('')

  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .required('Name is required'),
    email: Yup.string()
    .required('Email is required'),
    password: Yup.string()
    .required('Password is required'),
    specialty: Yup.string()
      .required('specialty is required'),
      description: Yup.string()
      .required('description is required'),
    experience: Yup.number()
      .required('experience is required')
      .positive('experience must be a positive number'),
    qualification: Yup.string()
      .required('qualification is required'),
  });

  const getImage = async (e) => {
    setImage(e.target.files[0])
  }
  
const Submit =async (values)=>{
    
    const body = new FormData()
    body.append('name', values.name);
    body.append('email', values.email);
    body.append('password', values.password);
    body.append('file', image)
    body.append('specialty', values.specialty);
    body.append('experience', values.experience);
    body.append('description', values.description);
    body.append('qualification', values.qualification);
    alert(body)
    const response = await fetch('/api/doctor/doctor', {method: 'POST', body})
}
  return (
<div className='col-md-6'>

<Formik
      initialValues={{
        name:'',
        email:'',
        password:'',
        specialty: '',
        description:'',
        experience: '',
        image:'',
        qualification: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        
        Submit(values)
        alert(values)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
            <h4 className='mt-4'>Add Doctor</h4>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className="form-control" />
            <ErrorMessage name="name" className="text-danger" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="text" name="email" className="form-control" />
            <ErrorMessage name="email" className="text-danger" component="div" />
          </div>
     
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="text" name="password" className="form-control" />
            <ErrorMessage name="password" className="text-danger" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <Field type="text" name="specialty" className="form-control" />
            <ErrorMessage name="specialty" className="text-danger" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" className="form-control" />
            <ErrorMessage name="description" className="text-danger" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <Field type="text" name="experience" className="form-control" />
            <ErrorMessage name="experience" className="text-danger" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <Field type="text" name="qualification" className="form-control" />
            <ErrorMessage name="qualification" className="text-danger" component="div" />
          </div>
       
          <div className="form-group">
                  <label for="inputNumber" class="col-sm-2 col-form-label" >Image Upload</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="file" id="formFile" onChange={getImage } name='image'/>
                    <ErrorMessage name="image" className="text-danger" component="div" />
                  </div>
          </div>
       
       
          <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
   

</div>
    
  );
};

export default AddDoctor;
