import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function ChangePassword() {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'New Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Make API call to change password
      const response = await axios.put('/api/patient/change-password', values);
      console.log(response.data);
      // Clear the form and show success message
      resetForm();
      alert('Password changed successfully!');
    } catch (error) {
      // Handle error
      console.error(error);
      alert('Failed to change password. Please try again.');
    } finally {
      setSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <div>
      <h5><b>Change Password</b></h5>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="currentPassword">Current Password</label>
              <Field type="password" name="currentPassword" />
              <ErrorMessage name="currentPassword" component="div" />
            </div>

            <div>
              <label htmlFor="newPassword">New Password</label>
              <Field type="password" name="newPassword" />
              <ErrorMessage name="newPassword" component="div" />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>

            <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
              Change Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
