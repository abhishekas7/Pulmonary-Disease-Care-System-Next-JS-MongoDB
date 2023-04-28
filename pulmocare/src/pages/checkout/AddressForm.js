import Modalc from '@/components/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Updateaddress from '../api/cart/Updateaddress';

function AddressForm() {

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
    <div className="row">
       {addresses.length>0?addresses.map((address) => (  <div className="col-6 m-3" style={{backgroundColor:'white',padding:'15px',borderRadius:'10px'}}>
        <div>
         
            <div key={address._id}>
              <p>{address.address1}</p>
              <p>{address.address2}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <Modalc btnname={<i className="fas fa-edit"></i>} content={<Updateaddress address={address}/>} heading={'UpdateAdress'} />
            </div>
         
        </div>
        </div> )):(<p className="mt-3">No Address Found</p>)}
    </div>
</div>


    </div>
  )
}

export default AddressForm