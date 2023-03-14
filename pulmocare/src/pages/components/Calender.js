import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'



function Calender() {
  return (
    <section>
    <button>Add Event</button>
   <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        
        // events={events}
        // eventContent={renderEventContent}
      />
    </section>
  )
}

export default Calender