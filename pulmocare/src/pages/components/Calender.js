import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ReactEventModal from './ReactEventModal'
import { useRef } from 'react'
import axios from 'axios'
import moment from 'moment'


function Calender() {

  const[modalOpen,setModalOpen] = useState(false)

  const calenderRef = useRef(null)
  const [events,setEvents] =useState([])

  const onEventAdded = event =>{
    let calendarApi = calenderRef.current.getApi()
    calendarApi.addEvent(event);
  }

  async function handleEventAdd(data){
    await axios.post("api/calender/create-booking",data.event);
  }
  async function handleDataSet(data){
    const response = await axios.get(`"api/calendar/getevents?start="${moment(data.start).toISOString()}"&end="${moment(data.end).toISOString()}`);
      setEvents(response.data)
      console.log(response.data);
  }

  return (
    <section>
    <button onClick={() => setModalOpen(true)}>Add Event</button>
<div style={{position:"relative", zIndex:0}}>
<FullCalendar
   ref={calenderRef}
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        eventAdd={(event => handleEventAdd(event))}
        datesSet={(date)=>handleDataSet(date)}
        events={events}
        // eventContent={renderEventContent}
      />
</div>
<ReactEventModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
      
    </section>
  )
}

export default Calender