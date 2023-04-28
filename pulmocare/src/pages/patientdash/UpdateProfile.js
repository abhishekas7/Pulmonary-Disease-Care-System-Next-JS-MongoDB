import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const UpdateProfile = () => {



 const [patientData, setPatientData] = useState([]);

  const getData=async ()=>{
    const response = await fetch('/api/patient/updateprofile', {method: 'GET'})
    console.log(response);
  }

  useEffect(() => {
    fetch('/api/patient/updateprofile')
      .then(response => response.json())
      .then(data => setPatientData(data))
      .catch(error => console.error(error));
  }, []);
  
 
  const [file, setFile] = useState(null);

    const validationSchema = Yup.object().shape({
      age: Yup.number().positive().required('Age is required'),
      mobile: Yup.string().required('Mobile is required'),
      gender: Yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
      name: Yup.object().shape({
        first: Yup.string().required('First name is required'),
        last: Yup.string().required('Last name is required'),
      }),
      dateOfBirth: Yup.date().required('Date of birth is required'),
      address: Yup.object().shape({
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zip: Yup.string().required('Zip is required'),
      }),
    });


  
const Submit = async (values) => {
  
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to submit the form',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, submit it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append('age', values.age);
      formData.append('mobile', values.mobile);
      formData.append('gender', values.gender);
      formData.append('name.first', values.name.first);
      formData.append('name.last', values.name.last);
      formData.append('dateOfBirth', values.dateOfBirth);
      formData.append('address.street', values.address.street);
      formData.append('address.city', values.address.city);
      formData.append('address.state', values.address.state);
      formData.append('address.zip', values.address.zip);
      try {
   
       const response = await fetch('/api/patient/updateprofile', {method: 'PUT', body: formData,})

        Swal.fire({
          title: 'Success!',
          text: 'Form submitted successfully',
          icon: 'success',
        });
        window.location.reload();

      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Form submission failed',
          icon: 'error',
        });
      }
      
    }
  });
};

  return (
<div className='container'>

<Formik
      initialValues={{
        age: '',
        gender: '',
        name: {
          first: '',
          last: '',
        },
        dateOfBirth: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
        },
        image: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        Submit(values);
        resetForm('');
        alert('product added')
      }}
    >
      {({ isSubmitting }) => (
      <Form>

{patientData && patientData.map((data,i)=>(
  <p>{data.age}</p>
))}
      <Row>
              <Col md={6}>
                <label htmlFor="name.first">First Name</label>
                <Field type="text" name="name.first" />
                <ErrorMessage name="name.first" className='text-danger' />
              </Col>
              <Col md={6}>
                <label htmlFor="name.last">Last name</label>
                <Field type="text" name="name.last" />
                <ErrorMessage name="name.last" />
              </Col>
           
              <Col md={6}>
              <label for="inputNumber" class="col-sm-2 col-form-label" >Image Upload</label>
                        <div class="">
                        <input type="file" onChange={(event) => setFile(event.target.files[0])} />
                          <ErrorMessage name="image" className="text-danger" component="div" />
                        </div>
      
              </Col>
              <Col md={6}>
                <label htmlFor="dateOfBirth">Date of birth</label>
                <Field type="date" name="dateOfBirth" className='form-control' />
                <ErrorMessage name="dateOfBirth" />
              </Col>
              <Col md={6}>
                <label htmlFor="age">Age</label>
                <Field type="number" name="age" className='form-control' />
                <ErrorMessage name="age" />
              </Col>
      
              <Col md={6}>
                <label htmlFor="gender">Gender</label>
                <Field as="select" name="gender" className='form-control'>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" />
              </Col>
              <Col md={6}>
                <label htmlFor="mobile">Mobile</label>
                <Field type="text" name="mobile" />
                <ErrorMessage name="mobile" />
              </Col>
              <Col md={6}>
                <label htmlFor="address.street">Street</label>
                <Field type="text" name="address.street" />
                <ErrorMessage name="address.street" />
              </Col>
              <Col md={6}>
                <label htmlFor="address.city">City</label>
                <Field type="text" name="address.city" />
                <ErrorMessage name="address.city" />
              </Col>
              <Col md={6}>
                <label htmlFor="address.state">State</label>
                <Field type="text" name="address.state" />
                <ErrorMessage name="address.state" />
              </Col>
              <Col md={6}>
                <label htmlFor="address.zip">Zip</label>
                <Field type="text" name="address.zip" />
                <ErrorMessage name="address.zip" />
              </Col>
            </Row>
      
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
      
          </Form>
      )}
    </Formik>
   

</div>
    
  );
};

export default UpdateProfile;
