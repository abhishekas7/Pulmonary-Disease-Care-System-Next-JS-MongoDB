import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ReactEventModal from './ReactEventModal'
import axios from 'axios';
import Modal from 'react-modal';
import React, { useState } from "react";

import Datetime from 'react-datetime';
import moment from "moment";
// import { al } from '../../../public/assets/vendor/chart.js/chunks/helpers.segment';
import { getError } from '@/util/error';

const events = [
  { title: 'Meeting', start: new Date() }
]

function Calender({doctor}) {

  const [reason,setReson]=useState("");
  const [date,setDate]=useState(new Date());
  const [phonenumber, setPhoneNumber] = useState("");


  const onSubmit = async (event) =>{
      event.preventDefault();
      alert(reason)
      alert(date)
      // console.log(event);
      try{
      await axios.post('/api/calender/create-booking',{'reason':reason,'phonenumber':phonenumber,'date':date,'doctor':doctor._id,}).then((res=>alert(res.data.message)));
      }catch(e){
        alert(getError(e))
      }
      // onEventAdded({
      //     reason,
      //     date,
      // })

      // onClose();
      
  }


  return (
    <div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        // events={events}
        // eventAdd={(event => handleEventAdd(event))}
        eventContent={renderEventContent}
      />
 <div>
   <form onSubmit={onSubmit}>
     <input type="text" placeholder="Description" value={reason} onChange={e => setReson(e.target.value)}/>
        <div>
            <label for="date">date</label>
        <Datetime value={date} onChange={date=>setDate(date)}/>
        </div>
        <label>
        Phone number:</label>
        <input
          type="text"
          value={phonenumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <button>Schedule Appointment</button>
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