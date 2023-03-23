import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const initialValues = {
  name: '',
  email: '',
  age:'',
  gender:'',
  pincode:'',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  age: Yup.string().required("Age Required"),
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is required'),
  pincode: Yup.string().required("pincode Required"),
});

const onSubmit = async (values) => {
  // console.log(values.age);

  const res = await axios
    .put('/api/patient/updateprofile',{values})
    .then(res => console.log(res.data) )
    .catch(err => console.error(err));
};

const UpdateProfile = ({patient}) => {
  return (
    <div>
      <h3>Profile</h3>
      <Formik initialValues={initialValues}  onSubmit={onSubmit}>
      {/* validationSchema={validationSchema} */}
        {({ touched, errors }) => (
          <Form>
            <div class="col-md-6">
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" value={patient.name}  disabled/>
              <ErrorMessage name="name" />
            </div>

            <div class="col-md-6">
              <label htmlFor="email">Email:</label>
              <Field type="text" name="email" value={patient.email} disabled/>
              <ErrorMessage name="email" />
            </div>

  
            <div class="col-md-6">
              <label htmlFor="age">Age:</label>
              <Field type="number" name="age" />
              <ErrorMessage name="age" />
            </div>

            <div class="col-md-6">
              <label htmlFor="gender">Gender:</label>
              <Field as="select" name="gender">
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="gender" />
            </div>
            <div class="col-md-6">
              <label htmlFor="pincode">Pincode:</label>
              <Field type="text" name="pincode" />
              <ErrorMessage name="pincode" />
            </div>

            <button type="submit" className='btn'>UPDATE DETAILS</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfile;
