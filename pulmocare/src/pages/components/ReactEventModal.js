import React, { useState } from "react";
import Modal from 'react-modal';

export default function ({isOpen,onClose,onEventAdded}){

    const [title,setTitle]=useState("");
    const [start,setTitle]=useState("");
    const [title,setTitle]=useState("");

    return{
     <Modal isOpen={isOpen} onRequestClose={onClose}>
     <form onSubmit={onSubmit}>
     <input placeholder="Description" value={title} onChange={e => setTitle(e.target.value)}/>

     </form>
     </Modal>
    }
}