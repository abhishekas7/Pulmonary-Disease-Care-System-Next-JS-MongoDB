import React from 'react'
import { signOut } from 'next-auth/react'

function Maindocdash() {
  const logout=()=>{
    signOut({callbackUrl:'/login'})
  }
  return (
    <div>Maindocdash
      <button onClick={logout}></button>
    </div>
  )
}

export default Maindocdash