import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import loginImage from '../images/pexels-anna-shvets-3786153.jpg';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

// eslint-disable-next-line react-hooks/rules-of-hooks


const Login = () => {
  const navigate=useNavigate();
 useEffect(() => {
 
   if(!sessionStorage.getItem('sessionKey')){

     navigate('/login')

   }else{

      navigate('/')

   }
   return () => {
    console.log( sessionStorage.getItem('sessionKey'))

   }
 }, [])
 

  const handleSubmit = async (values) => {
    try {
      console.log(values)
      const response = await axios.post('http://localhost:8000/login', values);
      if (response) {
        var item_value = sessionStorage.setItem("sessionKey",response.data);
        var item = sessionStorage.setItem("value",response.data);
        navigate('/admindash');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} md={6}>
        <img src={loginImage} alt="login" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </Grid>
      <Grid container item xs={12} md={6} alignItems="center" justifyContent="center">
        <Grid item xs={10} sm={8} md={6}>
    <Formik
  initialValues={{ email: '', password: '' }}
  validate={values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  }}
  onSubmit={handleSubmit}
>
  {({ errors, touched, isSubmitting }) => (
    <Form>
      <Field
        as={TextField}
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        error={errors.email && touched.email}
        helperText={errors.email && touched.email && errors.email}
      />
      <Field
        as={TextField}
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        error={errors.password && touched.password}
        helperText={errors.password && touched.password && errors.password}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </Form>
  )}
</Formik>

        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
