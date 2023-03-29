import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductForm = () => {

    const[image,setImage] = useState('')

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
  
const Submit =async (values)=>{
    
    const body = new FormData()
    body.append('file', image)
    body.append('name', values.name)
    body.append('category', values.category);
    body.append('price', values.price);
    body.append('quantity', values.quantity);
    body.append('manufacturer', values.manufacturer);
    body.append('description', values.description);
    body.append('prescription_required',values.prescription_required);
    const response = await fetch('/api/product/addproduct', {method: 'POST', body})
}

  return (
<div className='col-md-8'>

<Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
        manufacturer: '',
        prescription_required: false,
        image:'',
        quantity: 0,
        category: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        
        Submit(values)
        alert('product added')
      }}
    >
      {({ isSubmitting }) => (
        <Form>

<div className="col-12 form-group">
  <div className='row'>
    <div className='col-12'>
    <h4 className='mt-4'><strong>Add Product</strong></h4>
    </div>
    <div className='col-md-6'>
      
    <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className="form-control" />
            <ErrorMessage name="name" className="text-danger" component="div" />
          </div>
    </div>
    <div className='col-6'>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Field type="number" name="price" className="form-control" />
            <ErrorMessage name="price" className="text-danger" component="div" />
          </div>
    </div>
    <div className='col-6'>
    <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <Field type="text" name="manufacturer" className="form-control" />
            <ErrorMessage name="manufacturer" className="text-danger" component="div" />
          </div>
    </div>
    <div className='col-6'>
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
    <div className='col-12'>
     
    <div className="form-group">
                  <label for="inputNumber" class="col-sm-2 col-form-label" >Image Upload</label>
                  <div class="">
                    <input class="form-control" type="file" id="formFile" onChange={getImage } name='image'/>
                    <ErrorMessage name="image" className="text-danger" component="div" />
                  </div>
          </div>
    </div>
    <div className='col-6 mt-4'>
    <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <Field type="number" name="quantity" className="form-control" />
            <ErrorMessage name="quantity" className="text-danger" component="div" />
          </div>
    </div>
    <div className='col-6 mt-4'>
    <div className="form-group">
            <label htmlFor="category">Category</label>
            <Field type="text" name="category" className="form-control" />
            <ErrorMessage name="category" className="text-danger" component="div" />
          </div>
    </div>
    <div className='col-12'>
    <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Submit</button>
    </div>

  </div>
</div>
        </Form>
      )}
    </Formik>
   

</div>
    
  );
};

export default ProductForm;
