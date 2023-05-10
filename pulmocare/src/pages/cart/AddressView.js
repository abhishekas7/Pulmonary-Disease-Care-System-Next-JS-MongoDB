/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

import { getError } from '@/util/error';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';


const Address = ({addressget,userid}) => {
    const [address,setaddress]=useState({
        address:'',
        city:'',
        country:'',
        zip:'',
})
const [addressview,setaddressview]=useState(addressget)

const router=useRouter()
const {data}=useSession()
const getUserdata=async()=>{

     axios.get('/api/cart/Address')
    .then(res => {
        console.log(res.data.data)
        setaddressview(res.data.data)
    });
    // alert('Hello')
  }
    // const updatehandeler=async ({item})=>{
    //     try{
    //         const {data} = await axios.put(`/api/update/address/${item._id}`,{'address':item.address,'city':item.city,'country':item.country,'zip':item.pin})
    //             if(data.status){
    //                 toast.success(data.message)
    //                 // router.reload()
    //             }else{
    //                 toast.error(data.message)
    //             }
                
    //        }catch(e){


    //         toast.error(getError(e))
    //        }

    // }

  
    const removehandler=async (id)=>{
        try{
            const {data} = await axios.put(`/api/delete/address/${id}`)
                if(data.status){
                    getUserdata() 
                    toast.success(data.message)
                    
                }else{
                    toast.error(data.message)
                }
                
            }catch(e){
            toast.error(getError(e))
           }
    }
      const validationSchema = Yup.object().shape({
        address: Yup.string()
          .min(5, "Address must be at least 5 characters")
          .max(100, "Address can't be more than 100 characters")
          .required("Address is required"),
        city: Yup.string()
          .min(3, "City must be at least 3 characters")
          .max(50, "City can't be more than 50 characters")
          .required("City is required"),
        pin: Yup.string()
          .matches(/^[0-9]{6}$/, "Invalid pin code")
          .required("Pin code is required"),
        country: Yup.string()
          .oneOf(
            ["India", "USA", "UK", "Australia", "Canada"],
            "Invalid country selected"
          )
          .required("Country is required"),
      });
      useEffect(() => {
        getUserdata()
      
      }, [])
          
      

      
  return (
    <div className='h-max w-full'>
      {/* <div className='p-5 border'>
       Address
           <div className='pl-4'>
                <div className='pt-2 h-1/2'>
                    <div className='w-full'>
                            <div className=''>Address</div>
                            <div className=''><input type='address' name='address' onChange={(e)=>setaddress({...address,address:e.target.value})}/></div>
                    </div>
                    <div className='w-full'>
                            <div className=''>City</div>
                            <div className=''><input type='address' name='city' onChange={(e)=>setaddress({...address,city:e.target.value})}/></div>
                    </div>
                    <div className='w-full'>
                            <div className=''>Country</div>
                            <div className=''><input type='address' name='country' onChange={(e)=>setaddress({...address,country:e.target.value})}/></div>
                    </div>
                    <div className='w-full'>
                            <div className=''>Zip</div>
                            <div className=''><input type='address' name='zip' onChange={(e)=>setaddress({...address,zip:e.target.value})}/></div>
                    </div>
                    
                    <button className='mt-3 border rounded pl-4 pr-4 pt-2 pb-2 ' type='button' onClick={sendServer}>Add Address</button>
                </div>
            </div>
        </div>
        <div className='h-1/2'>
        

        </div> */}
      <div className='p-5'>
        
        
        <Formik
        initialValues={{ address: address.address, city: address.city, pin:address.zip, country: address.pin }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
            toast.success('hi')
            console.log('hi')
      // handle form submission
          try{
              if(addressview.length>4){
                  toast.error('Remove an Adderess to add more')
              }else{
                  const {data} = await axios.post('/api/cart/Address', {'address':values.address,'city':values.city,'country':values.country,'zip':values.pin})
                  if(data.status){
                      getUserdata()
                      toast.success(data.message)
                      // const id=data.user._id 
                  }else{
                      toast.error(data.message)
                  }

                  // router.push('/profile/')
              }
          }catch(e){
              toast.error(getError(e))
          }
          }}
      >
          {({ errors, touched }) => (
            <Form className=''>
              <legend className='text-2xl'>Add Address</legend>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                  Address
                </label>

                <Field
          type="text"
          name="address"
          id="address"
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.address && touched.address ? "border-red-500" : ""
          }`}
        />
                <ErrorMessage name="address" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                  City
                </label>
                <Field
          type="text"
          name="city"
          id="city"
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.city && touched.city ? "border-red-500" : ""
          }`}
        />
                <ErrorMessage name="city" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="pin" className="block text-gray-700 font-bold mb-2">
                  Pin
                </label>
                <Field
          type="text"
          name="pin"
          id="pin"
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.pin && touched.pin ? "border-red-500" : ""
          }`}
        />
                <ErrorMessage name="pin" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
                  Country
                </label>
                <Field
          type="text"
          name="country"
          id="country"
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.country && touched.country ? "border-red-500" : ""
          }`}
        />
                <ErrorMessage name="country" component="div" className="text-red-500" />
              </div>
              <button type="submit"  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight hover:bg-amber-400 hover:text-white  focus:outline-none focus:shadow-outline`}>Submit</button>
            </Form>
  )}
        </Formik>
      </div>

      <div className='h-max -w-full bg-main'>
        <p className='text-white text-4xl font-bold p-5'>Address</p>  
        <div className='grid grid-cols-3 gap-3 w-full p-4'>
          {addressview.length>0?(
            <>
              {addressview.map((item,i)=>(
                <div  className='w-full h-max  p-4 bg-white shadow-md' key={i} >
                  <div className='flex w-full p-3 '  >

                    {/* <div className='flex justify-center items-start w-1/2'> Address:{item.address}</div>
                        <div className='w-1/2'>Zip:{item.zip}</div>
                    </div>
                    <div className='flex'>
                        <div className='flex justify-center items-start w-1/2'>City:{item.city}</div>
                        <div className='w-1/2'>Country:{item.country}</div> */}
                    <table >
                            
                      <tr >
                        <th className='flex justify-start items-center'>Address</th>
                        <td className='flex justify-start items-center'>{item.address}</td>
                      </tr>
                      <tr>
                        <th className='flex justify-start items-center'>City</th>
                        <td className='flex justify-start items-center'>{item.city}</td>
                                
                      </tr>
                      <tr>
                        <th className='flex justify-start items-center'>Zip</th>
                        <td className='flex justify-start items-center'>{item.zip}</td>
                               
                      </tr>
                      <tr>
                        <th className='flex justify-start items-center'>Country</th>
                        <td className='flex justify-start items-center'>{item.country}</td>
                        <td> <button type='button' className='btn btn-primary'  onClick={()=>removehandler(item._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg></button> <button type='button' className='cursor-pointer'  onClick={()=>updatehandler(item._id)}><i class="bi bi-pencil"></i></button></td>
                      </tr>


                    </table>
                  </div>
                </div> 
            ))} </>
            
            ):(<div className='w-full justify-center text-xl'>Add AN address</div>)}
        </div>
      </div>
    </div>
  )
}

export default Address