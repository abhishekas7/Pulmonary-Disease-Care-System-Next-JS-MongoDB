import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/getsasi')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <Formik
        initialValues={{ name: '', age: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.age) {
            errors.age = 'Required';
          } else if (isNaN(values.age)) {
            errors.age = 'Invalid age';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('http://localhost:8000/sasi', values)
            .then(response => {
              setData([...data, response.data]);
              setSubmitting(false);
            })
            .catch(error => {
              console.log(error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className="form-control" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <Field type="text" name="age" className="form-control" placeholder="Enter your age" />
              <ErrorMessage name="age" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      {data.map((item, index) => (
        <div key={index}>
          <h2></h2>
          <p></p>
          <tr>
        <td>{item.name}</td>
        <td>{item.age}</td>

      </tr>
        </div>
      ))}
    </div>
  );
}

export default Test;
