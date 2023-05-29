import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required")
});

const MyForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/api/doctor/regblog", values);
      console.log(response.data);
      // Do something with the response if needed
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.error(error);
      // Handle the error if needed
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Formik
            initialValues={{
              title: "",
              category: "",
              description: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="title" placeholder="Title" />
                <ErrorMessage name="title" component="div" className="error" />
                <Field type="text" name="category" placeholder="Category" />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error"
                />
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default MyForm;
