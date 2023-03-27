import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import axios from 'axios';
import { getError } from '@/util/error';

const EditProduct = ({item}) => {

    const [uproduct, setUproduct] = useState(item);

useEffect(() => {
console.log(item);
}, [])

const handleChange = (e) => {
    setUproduct({
      ...uproduct,
      [e.target.name]: e.target.value,

    });
  };


    const [image, setImage] = useState(item.image)

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        description: Yup.string()
            .required('Description is required'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price must be a positive number'),
        manufacturer: Yup.string()
            .required('Manufacturer is required'),
        prescription_required: Yup.string()
            .required('Prescription is required'),
        quantity: Yup.number()
            .required('Quantity is required')
            .integer('Quantity must be a whole number')
            .min(0, 'Quantity must be at least 0'),
        category: Yup.string()
            .required('Category is required'),
    });

    const getImage = async (e) => {
        setImage(e.target.files[0])
    }

    const Submit = async (values) => {

       try {
        const body = new FormData()
        body.append('id',uproduct._id)
        body.append('file', image)
        body.append('name', values.name)
        body.append('category', values.category);
        body.append('price', values.price);
        body.append('quantity', values.quantity);
        body.append('manufacturer', values.manufacturer);
        body.append('description', values.description);
        body.append('prescription_required', values.prescription_required);
        const response = await fetch('/api/product/editproduct', {method: 'PUT', body})
        alert(response.data)
       } catch (error) {
        console.log(getError(error))
       }
    }

    return (
        <div>

            <Formik
                initialValues={{
                    name: uproduct.name,
                    description: uproduct.description,
                    price: uproduct.price,
                    manufacturer: uproduct.manufacturer,
                    prescription_required: uproduct.prescription_required,
                    image: uproduct.image,
                    quantity: uproduct.quantity,
                    category: uproduct.category
                }}
             
                onSubmit={async (values, { setSubmitting }) => {

                    Submit(values)
                    alert(values.name)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>

                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field type="text" onChange={handleChange} value={uproduct.name}  name="name" className="form-control" />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <Field type="text" onChange={handleChange} value={uproduct.description} name="description" className="form-control" />
                                        <ErrorMessage name="description" className="text-danger" component="div" />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <Field type="number" onChange={handleChange} value={uproduct.price} name="price" className="form-control" />
                                        <ErrorMessage name="price" className="text-danger" component="div" />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="manufacturer">Manufacturer</label>
                                        <Field type="text" onChange={handleChange} value={uproduct.manufacturer}  name="manufacturer" className="form-control" />
                                        <ErrorMessage name="manufacturer" className="text-danger" component="div" />
                                    </div>
                                </div>
                          
                                <div className='col-md-12'>
                                    <div className="form-group">
                                        <label htmlFor="prescription_required">Prescription Required</label>
                                        <select class="form-select" multiple="" aria-label="multiple select example" name='prescription_required'>
                                            <option selected="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="2">No</option>
                                        </select>
                                        <ErrorMessage name="prescription_required" className="text-danger" component="div" />

                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className="form-group">
                                        <label for="inputNumber" class="col-sm-2 col-form-label" >Image</label>
                                        <div class="col-sm-10">
                                            <input class="form-control"  type="file" id="formFile" onChange={getImage} name='image' />
                                            <ErrorMessage name="image" className="text-danger" component="div" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Quantity</label>
                                        <Field type="number" onChange={handleChange} value={uproduct.quantity} name="quantity" className="form-control" />
                                        <ErrorMessage name="quantity" className="text-danger" component="div" />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <Field type="text" onChange={handleChange} name="category" value={uproduct.category}className="form-control" />
                                        <ErrorMessage name="category" className="text-danger" component="div" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>


        </div>

    );
};

export default EditProduct;
