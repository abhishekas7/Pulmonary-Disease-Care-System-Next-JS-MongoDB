<<<<<<< HEAD
import React from 'react'

function Test() {
=======
// import React, { useState } from 'react';


// function Test() {
//   const [prescription, setPrescription] = useState({
//     dosage: '',
//     patientName: '',
//     medicine: '',
//     duration: ''
//   });
//   const [listening, setListening] = useState(false);
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();
  
//   const startListening = () => {
//     recognition.start();
//     setListening(true);
//   }

//   const stopListening = () => {
//     recognition.stop();
//     setListening(false);
//   }

//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     console.log(transcript);
//     const natural = require('natural');
//     const tokenizer = new natural.WordTokenizer();
//     const tokens = tokenizer.tokenize(transcript);
//     const dosageRegex = /[0-9]+(mg|g)/;
//     const patientNameRegex = /[A-Z][a-z]+\s[A-Z][a-z]+/;
//     const medicineRegex = /([A-Z][a-z]+\s?){1,2}/;
//     const durationRegex = /[0-9]+\s(days|weeks|months)/;
//     let dosage = null;
//     let patientName = null;
//     let medicine = null;
//     let duration = null;
//     for (let i = 0; i < tokens.length; i++) {
//       if (dosageRegex.test(tokens[i])) {
//         dosage = tokens[i];
//       } else if (patientNameRegex.test(tokens[i])) {
//         patientName = tokens[i];
//       } else if (medicineRegex.test(tokens[i])) {
//         medicine = tokens[i];
//       } else if (durationRegex.test(tokens[i])) {
//         duration = tokens[i];
//       }
//     }
//     setPrescription({ dosage, patientName, medicine, duration });
//   }

//   return (
//     <div className="App">
//       <h1>Prescription Form</h1>
//       <div className="input-container">
//         <label htmlFor="dosage">Dosage:</label>
//         <input type="text" id="dosage" value={prescription.dosage} onChange={(e) => setPrescription({ ...prescription, dosage: e.target.value })} />
//       </div>
//       <div className="input-container">
//         <label htmlFor="patient-name">Patient Name:</label>
//         <input type="text" id="patient-name" value={prescription.patientName} onChange={(e) => setPrescription({ ...prescription, patientName: e.target.value })} />
//       </div>
//       <div className="input-container">
//         <label htmlFor="medicine">Medicine:</label>
//         <input type="text" id="medicine" value={prescription.medicine} onChange={(e) => setPrescription({ ...prescription, medicine: e.target.value })} />
//       </div>
//       <div className="input-container">
//         <label htmlFor="duration">Duration:</label>
//         <input type="text" id="duration" value={prescription.duration} onChange={(e) => setPrescription({ ...prescription, duration: e.target.value })} />
//       </div>
//       <div className="button-container">
//         {!listening ? <button onClick={startListening}>Start Listening</button> : <button onClick={stopListening}>Stop Listening</button>}
//       </div>
//     </div>
//   );
// }

// export default Test;
import React from 'react'

const Test = () => {
>>>>>>> 7111d1c36d34ae9eb6caa73fc83c36039a80ebbe
  return (
    <div>Test</div>
  )
}

<<<<<<< HEAD
export default Test
=======
export default Test
>>>>>>> 7111d1c36d34ae9eb6caa73fc83c36039a80ebbe
