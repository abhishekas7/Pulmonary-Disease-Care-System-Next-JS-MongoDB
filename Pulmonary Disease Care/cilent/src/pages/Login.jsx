import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit =  async (values, { setSubmitting }) => {
    setTimeout(async () => {
      // Mock login functionality
try {
  const res = await axios.post('http://localhost:8000/login', values);
  console.log(res);

  // localStorage.setItem('token', res.data.token);
  if(res.data.role==="admin")
  {
      navigate('/admindash');
  }
  else if(res.data.role==="doctor"){
      navigate('/docdash');
  }
  else if(res.data.role==="user"){
    navigate('/userdash');
}
  

} catch (error) {
  
}

      setSubmitting(false);
    }, 400);

    



  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        height: '100vh',
      }}
    >
      <Box sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
        <img
          src="https://via.placeholder.com/300x300.png?text=Logo"
          alt="Logo"
          style={{ height: '300px', width: '100%' }}
        />
      </Box>
      <Box sx={{ width: isSmallScreen ? '100%' : '50%' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: '1rem' }}>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Email"
                    name="email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
