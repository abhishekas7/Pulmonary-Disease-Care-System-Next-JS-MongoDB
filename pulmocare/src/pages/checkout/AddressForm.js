/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Modalc from '@/components/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Updateaddress from '../api/cart/Updateaddress';

function AddressForm(props) {

  const getAddress=(e)=>{
    props.onOptionChange(e.target.value);
  }

  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState({});

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    const response = await axios.get("/api/cart/Addaddress");
    setAddresses(response.data.data);
  };

  return (
    <div>
      <div className="col-12">


        <div className='col-12'>
          <div className='row'>
            <div className='col-12' style={{backgroundColor:'#f2f25f2',color:'black',borderRadius:'15px',padding:'15px'}}>
              {addresses.length>0?addresses.map((address) => (  
                <div className='pt-4' style={{position: 'relative', borderBottom: '1px solid #ccc'}}>


                  <div className='row'>
                    <div className='col-md-6'>
                      <input type="radio" name="address" value={address._id} onChange={getAddress} style={{position: 'absolute', left: '10px', top: '10px'}} />
          
          
                      <label htmlFor={`address_${address._id}`} style={{paddingLeft: '40px'}}>
                        <div key={address._id}>
                          <p>{address.address1}</p>
                          <p>{address.address2}</p>
                          <p>
                            {address.city}, {address.state} {address.zip}
                          </p>
                        </div>
                      </label>

                    </div>
                    <di className='col-md-6'>
                      <Modalc btnname={'Change'} content={<Updateaddress address={address}/>} heading={'UpdateAdress'} style={{padding: '10px' ,marginLeft: '100px'}} />
                    </di>
                  </div>

                </div>
     
        )):(<p className="mt-3">No Address Found</p>)}
            </div>

          </div>
        </div>


      </div>


    </div>
  )
}

export default AddressForm