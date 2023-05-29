/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import axios from 'axios';
import Modal from 'react-modal';
import React, { useState } from "react";
import * as Yup from 'yup';

import Datetime from 'react-datetime';
import moment from "moment";
// import { al } from '../../../public/assets/vendor/chart.js/chunks/helpers.segment';
import { getError } from '@/util/error';
import swal from 'sweetalert';

const events = [
  { title: 'Meeting', start: new Date() }
]

function Calender({doctor}) {

  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [phonenumber, setPhoneNumber] = useState('');

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required('Please enter a reason for your booking'),
    date: Yup.date().required('Please enter a date for your booking'),
    phonenumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Please enter a valid phone number')
      .required('Please enter your phone number'),
  });

  const onSubmit = async (event) =>{
      event.preventDefault();


      validationSchema.validate({ reason, date, phonenumber }, { abortEarly: false })
      .then(async () => {
        await axios.post('/api/calender/create-booking',{'reason':reason,'phonenumber':phonenumber,'date':date,'doctor':doctor._id,}).then((res=>alert(res.data.message)));
        swal("Thank you for booking a slot with us. Your appointment is on waiting .Once approved the you will get the notification");
  
      })
      .catch((error) => {
       console.log(getError(error));

      });


      
  }

  const yesterday = moment().subtract(1, 'day');
const disablePastDt = current => {
  return current.isAfter(yesterday);
};

const events = [
  { title: 'Meeting', start: new Date() }
]

  return (
    <div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        validRange={{
          start: moment().startOf('month').toDate(), // start of current month
          // end: moment().endOf('month').toDate() // end of current month
        }}
        
        // events={events}
        // eventAdd={(event => handleEventAdd(event))}
        eventContent={renderEventContent}
      />
      <div> 
       
        <form onSubmit={onSubmit} className='mt-5'>
          <label for="date">Symptoms</label>
          <input id='sym' type="text" placeholder="Enter the Reason" value={reason} onChange={e => setReason(e.target.value)}/>
          <div>
            <label for="date">Date</label>
            <Datetime name='date' value={date} onChange={date=>setDate(date)}  isValidDate={disablePastDt}/>
          </div>
          <label>
            Phone number:</label>
          <input id='phone'
          type="text" placeholder="Enter your Phone Number"
          value={phonenumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
          <button class="theme-btn-1 btn reverse-color btn-block" type="submit" >BookNow</button>
        </form>
      </div>
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default Calender

