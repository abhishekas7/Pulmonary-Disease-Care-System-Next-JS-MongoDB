import { useState } from 'react';
import Footer from '../Footer';
import Header from '../components/Header';
import axios from 'axios';
import AddressView from './AddressView';
import db from '@/util/db';
import Address from '@/models/Address';
import { getSession } from 'next-auth/react';

function AddressCheck({addressget}) {



  return (
    <div>


<AddressView addressget={addressget}/>

    </div>
    
  );
}

export default AddressCheck;

export async function getServerSideProps(context) {
  db.connect();
  const session = await getSession(context);

  const user_id = session.user._id;



  const addressget = await Address.find({ user: user_id });
  // const cartItem = await CartSchema.find()
  //   .populate("products.productId")
  //   .exec();

  console.log(addressget);




  return {
    props: {
      addressget: JSON.parse(JSON.stringify(addressget)),
    },
  };
}
