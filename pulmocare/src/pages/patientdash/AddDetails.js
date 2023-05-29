import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateProfile = ({ datas }) => {
  const [initial, setInitial] = useState(datas?datas:null)
//   if(datas){
//   const [initial, setInitial] = useState({
//     age: datas.age,
//     gender: datas.gender,
//     name: {
//       first: datas.name.first,
//       last: datas.name.last,
//     },
//     dateOfBirth: '',
//     image: '',
//     mobile: datas.mobile,
//   });
// }

  const [patientData, setPatientData] = useState([]);

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
  });

  const submit = async values => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to submit the form',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('age', values.age);
        formData.append('mobile', values.mobile);
        formData.append('gender', values.gender);
        formData.append('name.first', values.name.first);
        formData.append('name.last', values.name.last);
        formData.append('dateOfBirth', values.dateOfBirth);

        try {
          const response = await fetch('/api/patient/updateprofile', {
            method: 'PUT',
            body: formData,
          });

          if (response.ok) {
            Swal.fire({
              title: 'Success!',
              text: 'Form submitted successfully',
              icon: 'success',
            });
            // Update state or perform necessary actions to reflect the changes
          } else {
            throw new Error('Form submission failed');
          }
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
          <h5><b>Edit Profile</b></h5>
      <Formik
        initialValues={initial}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            {patientData &&
              patientData.map((data, i) => <p key={i}></p>)}
  <Row>
  <Col md={6}>
    <label htmlFor='name.first'>First name</label>
    <Field type='text' name='name.first' />
    <ErrorMessage name='name.first' />
  </Col>
  <Col md={6}>
    <label htmlFor='name.last'>Last name</label>
    <Field type='text' name='name.last' />
    <ErrorMessage name='name.last' />
  </Col>
  <Col md={6}>
    <label htmlFor='inputNumber' className='col-sm-2 col-form-label'>
      Image Upload
    </label>
    <div className=''>
      <input
        type='file'
        onChange={event => setFile(event.target.files[0])}
      />
      <ErrorMessage
        name='image'
        className='text-danger'
        component='div'
      />
    </div>
  </Col>
  <Col md={6}>
    <label htmlFor='dateOfBirth'>Date of birth</label>
    <Field type='date' name='dateOfBirth' className='form-control' />
    <ErrorMessage name='dateOfBirth' />
  </Col>
  <Col md={6}>
    <label htmlFor='age'>Age</label>
    <Field type='number' name='age' className='form-control' />
    <ErrorMessage name='age' />
  </Col>
  <Col md={6}>
    <label htmlFor='gender'>Gender</label>
    <Field as='select' name='gender' className='form-control'>
      <option value=''>Select gender</option>
      <option value='male'>Male</option>
      <option value='female'>Female</option>
      <option value='other'>Other</option>
    </Field>
    <ErrorMessage name='gender' />
  </Col>
  <Col md={6}>
    <label htmlFor='mobile'>Mobile</label>
    <Field type='text' name='mobile' />
    <ErrorMessage name='mobile' />
  </Col>
</Row>

<button
  type='submit'
  className='btn btn-primary mt-3'
  disabled={isSubmitting}
>
  Submit
</button>
      </Form>
    )}
  </Formik>
</div>
);
};

export default UpdateProfile;
