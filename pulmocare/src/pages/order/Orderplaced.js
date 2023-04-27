import React from 'react' 

import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use-window-size';



function Orderplaced() {



  return (
    <>
<div>
    s
</div>

   
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