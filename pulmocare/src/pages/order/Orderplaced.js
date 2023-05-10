// eslint-disable-next-line no-unused-vars
import React from 'react' 

// eslint-disable-next-line no-unused-vars
import Confetti from 'react-confetti'



function Orderplaced() {



  return (
    <>


   
      <h1 className='m-5 p-5'>Payment Sucessfull</h1>
      <Confetti
        duration={5000}
  style={{
    width: '100vw',
    height: '100vh',
  }}
/>
    </>
  )
}

export default Orderplaced