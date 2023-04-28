import React, { useEffect, useState } from 'react';

function Deafultpage({ userdet }) {


  const [user, setUser] = useState(userdet);

  useEffect(() => {
    setUser(userdet);
  }, [userdet]);



  return (
    <div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-body p-5'>
            <div className='row'>
              <div className='col-3'>
                <img className='rounded' src='/images/welcome.png' alt='person image' />
              </div>
              <div className='col-9'>
                <p>Welcome back</p>
                <h1 className='card-title m-0 p-0'>{user?.name}</h1>
                <p>
                  We would like to take this opportunity to welcome you to our practice and to thank you for choosing our physicians to participate in your healthcare. We look forward to providing you with personalized, comprehensive health care focusing on wellness and prevention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deafultpage;
