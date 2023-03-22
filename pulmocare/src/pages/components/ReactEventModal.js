import React, { useState } from "react";
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import moment from "moment";

export default function ({isOpen,onClose,onEventAdded}){

    const [reason,setReson]=useState("");
    const [date,setDate]=useState(new Date());
 

    const onSubmit = (event) =>{
        event.preventDefault();

        onEventAdded({
            reason,
            date,
        })

        onClose();
        alert(reason)
        alert(date)
    }
    

    return(
     <Modal isOpen={isOpen} onRequestClose={onClose}>
     <form onSubmit={onSubmit}>
     <input placeholder="Description" value={reason} onChange={e => setReson(e.target.value)}/>
        <div>
            <label for="date">date</label>
        <Datetime value={date} onChange={date=>setDate(date)}/>
        </div>
        <button>Book Now</button>
     </form>
     </Modal>
    )
}