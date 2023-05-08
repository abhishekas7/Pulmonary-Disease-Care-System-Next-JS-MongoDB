import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const validationSchema = yup.object().shape({
  address1: yup.string().required("Address 1 is required"),
  address2: yup.string().required("Address 2 is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip is required"),
});

function Updateaddress({ address }) {
  const [editAddress, setEditAddress] = useState(address);
  const [addresses, setAddresses] = useState([]);


  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    const response = await axios.get("/api/cart/Addaddress");
    setAddresses(response.data.data);
  };

  const formik = useFormik({
    initialValues: {
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      zip: address.zip,
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const response = await axios.put(
          `/api/cart/${address._id}`,
          editAddress  
        );
        console.log(response.status);
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            icon: "success",
            text: "Address Updated successfully",
          });
          
        }fetchAddresses();
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Error Not Updated",
        });
      }
    },
  });

  useEffect(() => {
    setEditAddress(address);
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAddress({ ...editAddress, [name]: value });
  };

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <Form.Group controlId="formAddress1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  value={editAddress.address1}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.address1 && !!formik.errors.address1
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address1}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="formAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  name="address2"
                  value={editAddress.address2}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.address2 && !!formik.errors.address2
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address2}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group controlId="formAddress1">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={editAddress.city}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.city && !!formik.errors.city
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address1}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={editAddress.state}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.state && !!formik.errors.state
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address1}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group controlId="formZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.zip && !!formik.errors.zip}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="col-6">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Updateaddress;
