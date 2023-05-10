/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const UpdateProducts = ({Item}) => {
  const [image, setImage] = useState("");
 

  

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    manufacturer: Yup.string().required("Manufacturer is required"),
    prescription_required: Yup.string().required("Prescription is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Quantity must be a whole number")
      .min(0, "Quantity must be at least 0"),
    category: Yup.string().required("Category is required"),
  });

  const getImage = async (e) => {
    setImage(e.target.files[0]);
  };

  const categoryOptions = [
    { value: "", label: "Select a category" },
    { value: "medical", label: "Medical" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "personal-care", label: "Personal Care" },
    { value: "beauty-products", label: "Beauty Products" },
    { value: "baby-care", label: "Baby Care" },
    { value: "vitamins-and-supplements", label: "Vitamins and Supplements" },
    { value: "health-foods", label: "Health Foods" },
    { value: "home-health-care", label: "Home Health Care" },
    { value: "medical-equipment", label: "Medical Equipment" },
    { value: "mobility-aids", label: "Mobility Aids" },
    { value: "first-aid", label: "First Aid" },
    { value: "foot-care", label: "Foot Care" },
    { value: "eye-care", label: "Eye Care" },
    { value: "ear-care", label: "Ear Care" },
    { value: "oral-care", label: "Oral Care" },
    { value: "skincare", label: "Skin Care" },
    { value: "hair-care", label: "Hair Care" },
    { value: "fragrances", label: "Fragrances" },
    { value: "cosmetics", label: "Cosmetics" },
    { value: "sexual-health", label: "Sexual Health" },
    { value: "homeopathy", label: "Homeopathy" },
  ];

  const Submit = async (values) => {
    const body = new FormData();
    body.append("file", image);
    body.append("name", values.name);
    body.append("category", values.category);
    body.append("price", values.price);
    body.append("quantity", values.quantity);
    body.append("manufacturer", values.manufacturer);
    body.append("description", values.description);
    body.append("prescription_required", values.prescription_required);
    try {
        
        const response = await fetch(`/api/product/editproduct/${Item._id}`, {method: 'PUT', body: body})
 
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

  };

  return (
    <div className="col-12">
      <p>{Item._id}</p>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          manufacturer: "",
          prescription_required: false,
          image: "",
          quantity: 0,
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          Submit(values);
          resetForm("");
          alert("product added");
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <div className="col-12 form-group">
              <div className="row">
                <div className="col-12">
                  <h4 className="mt-4">
                    <strong>Product</strong>
                  </h4>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" className="form-control" />
                    <ErrorMessage
                      name="name"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <Field
                      type="number"
                      name="price"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="price"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <Field
                      type="text"
                      name="manufacturer"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="manufacturer"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="prescription_required">
                      Prescription Required
                    </label>
                    <select
                      class="form-select"
                      multiple=""
                      aria-label="multiple select example"
                      name="prescription_required"
                    >
                      <option selected="">Select</option>
                      <option value="1">Yes</option>
                      <option value="2">No</option>
                    </select>
                    <ErrorMessage
                      name="prescription_required"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label for="inputNumber" class="col-sm-2 col-form-label">
                      Image Upload
                    </label>
                    <div class="">
                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        onChange={getImage}
                        name="image"
                      />
                      <ErrorMessage
                        name="image"
                        className="text-danger"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6 mt-5">
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <Field
                      type="number"
                      name="quantity"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="quantity"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>
                <div className="col-6 mt-4">
                  <div className="form-group">
                    <label htmlFor="category">Description</label>
                    <Field
                      type="text"
                      name="description"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="description"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>
                <div className="col-6 mt-4">
                  <div className="">
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <Field
                        as="select"
                        name="category"
                        className="form-control"
                        id="category"
                        value={values.category}
                        onChange={handleChange}
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}

                        <ErrorMessage
                          name="category"
                          className="text-danger"
                          component="div"
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProducts;
