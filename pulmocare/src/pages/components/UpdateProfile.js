import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function UpdateProfile({patient}) {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    gender: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const validationSchema = Yup.object({
    name: Yup.string().required("NameRequired"),
    age: Yup.string().required("Age Required"),

    gender: Yup.string().required("Gender Required"),
    email: Yup.string().email("Invalid email address").required("Required"),

    currentPassword: Yup.string().min(8, "Must be at least 8 characters"),
    newPassword: Yup.string().min(8, "Must be at least 8 characters"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // setIsLoading(true);
    // make API call to update profile with values
    // set isLoading to false and handle any errors
  };

  useEffect(() => {
    // setIsLoading(true);
    // make API call to fetch user details
    // update initialValues with fetched values
    // set isLoading to false and handle any errors
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {apiError && <p>{apiError}</p>}
      {!isLoading && !apiError && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row mb-50">
                <div className="col-md-6">
                  <label>Name:</label>
                  <Field type="text" name="name" value={patient.name} disabled />
                  <ErrorMessage name="name" />
                </div>
                <div className="col-md-6">
                  <label>Email:</label>
                  <Field type="text" name="email" value={patient.email} disabled/>
                  <ErrorMessage name="email" />
                </div>
                <div className="col-md-6">
                  <label>Age:</label>
                  <Field type="text" name="age" value={patient.age}/>
                  <ErrorMessage name="age" />
                </div>
                <div className="col-md-6">
                  <div>
                    <label>
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        className="m-5"
                      />
                      Male
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        className="m-5"
                      />
                      Female
                    </label>
                    {/* <label>
              <Field type="radio" name="gender" value="other" className="m-5" />
             other
            </label> */}
                  </div>
                  <ErrorMessage name="gender" />
                </div>
                <div className="col-md-6">
                  <label>Pin:</label>
                  <Field type="text" name="pincode" value={patient.pin} />
                  <ErrorMessage name="pincode" />
                </div>
              </div>

              <div className="btn-wrapper">
                <button
                  type="submit"
                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                  disabled={isSubmitting}
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default UpdateProfile;
