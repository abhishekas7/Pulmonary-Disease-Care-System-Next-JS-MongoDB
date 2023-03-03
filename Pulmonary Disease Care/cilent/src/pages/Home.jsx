import React from 'react'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Banner from '../components/Banner'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Header from '../components/Header'

import ChatBot from 'react-simple-chatbot';


const Home = () => {



  return (
   <>





   <Header></Header>
<Banner></Banner>
<ChatBot
botAvatar='../assets/images/logo/favicon.png'
  steps={[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      end: true,
    },
  ]}
/>
<Features></Features>
<Footer/>
<Link to={'/test'}>ss</Link>
   </>
  )
}

export default Home