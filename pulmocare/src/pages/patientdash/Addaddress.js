import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import Modalc from "@/components/Modal";
import Updateaddress from "../api/cart/Updateaddress";

const validationSchema = yup.object().shape({
  address1: yup.string().required("House Name is required"),
  address2: yup.string().required("Address 2 is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip is required"),
});

function Addaddress() {
  const formik = useFormik({
    initialValues: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema,
onSubmit: async (values) => {
  try {
    const response = await axios.post("/api/cart/Addaddress", values);
    console.log(response.status);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: "success",
        text: "Address created successfully",
      });
     // Move the function call inside the `if` block
    }  fetchAddresses();
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Error Not Inserted",
    });
  }
},

  });
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState({});
  const [pin, setPin] = useState({});
  

  useEffect(() => {

    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    const response = await axios.get("/api/cart/Addaddress");
    setAddresses(response.data.data);
  };

  const fetchPincode = async (pin) => {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
    const postOffices = response.data[0].PostOffice;
    if (postOffices && postOffices.length > 0) {
      const address2 = postOffices[0].Name;
      const city = postOffices[0].Division;
      const state = postOffices[0].State;
      
      formik.setFieldValue('address2', address2);
      formik.setFieldValue('city', city);
      formik.setFieldValue('state', state);
    }
  };

  

  const handleDelete = async (id) => {
    try {
      
      const response = await axios.delete(`/api/cart/${id}`);
      if (response.status === 200) {
        setAddresses(addresses.filter((address) => address._id !== id));
        Swal.fire({
          icon: 'success',
          text: 'Address deleted successfully',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        text: 'Error deleting address',
      });
    }
  };
  

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`/api/cart/${id}`);
      setEditAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  



  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <div className="col-12">
          <h6><b className="text-danger">Enter the Pincode and Search</b></h6>
          <div className="row">
            <div className="col-6">
              <Form.Group controlId="formAddress1">
                <Form.Label>House Name</Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  value={formik.values.address1}
                  onChange={formik.handleChange}
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
                  value={formik.values.address2}
                  onChange={formik.handleChange}
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
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.city && !!formik.errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.state && !!formik.errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="formZip">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  minLength={1}
                  min={7}
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.zip && !!formik.errors.zip}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.zip}
                </Form.Control.Feedback>

              </Form.Group>
         
            </div>
            <div className="col-6">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              <div className="col-6">
              <button type="button" variant="success" onClick={()=>{fetchPincode(formik.values.zip)}}  className='btn btn-success '>Get Details</button>

              </div>
          </div>
        </div>
      </Form>

      <div>
<div className="col-12">
    <div className="row">
       {addresses.length>0?addresses.map((address) => (  <div className="col-md-3 m-3" style={{backgroundColor:'white',padding:'15px',borderRadius:'10px'}}>
        <div>
         
            <div key={address._id}>
              <p>{address.address1}</p>
              <p>{address.address2}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <button onClick={() => {handleDelete(address._id)}} className="btn">
                <i className="fas fa-trash"></i>
              </button>
       
              <Modalc btnname={<i className="fas fa-edit"></i>} content={<Updateaddress address={address}/>} heading={'UpdateAdress'} savebtn={null}/>
            </div>
         
        </div>
        </div> )):(<p className="mt-3">No Address Found</p>)}
    </div>
</div>
      </div>
    </div>
  );
}

export default Addaddress;
