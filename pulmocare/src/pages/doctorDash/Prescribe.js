import axios from "axios";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";


function Demo() {

  const [text, setText] = useState('');
  const [prescription, setPrescription] = useState({});

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0,10);
  console.log(date);

  const webSpeech = () => {
    if ("webkitSpeechRecognition" in window) {
      // Initialize webkitSpeechRecognition
      let speechRecognition = new webkitSpeechRecognition();



      // String for the Final Transcript
      let final_transcript = "";

      // Set the properties for the Speech Recognition object
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';

      // Callback Function for the onStart Event
      speechRecognition.onstart = () => {
        // Show the Status Element
        document.querySelector("#status").style.display = "block";
      };
      speechRecognition.onerror = () => {
        // Hide the Status Element
        document.querySelector("#status").style.display = "none";
      };
      speechRecognition.onend = () => {
        // Hide the Status Element
      };

      speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
 

        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } 
        }

        // Set the Final transcript and Interim transcript.
        document.querySelector("#final").innerHTML = final_transcript;
        console.log(final_transcript)
        setText(final_transcript);
      };

      // Set the onClick property of the start button
      document.querySelector("#start").onclick = () => {
        // Start the Speech Recognition
        speechRecognition.start();
      };
      // Set the onClick property of the stop button
      document.querySelector("#stop").onclick = () => {
        // Stop the Speech Recognition
        speechRecognition.stop();
      };
    } else {
      console.log("Speech Recognition Not Available");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/doctor/prescribe', { text });
      setPrescription(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    webSpeech();
  }, []);



  return (
    <>
        <form>
            <h6 className="mt-4">Transcript</h6>

   
   <div>
   <textarea value={text} onChange={(e) => setText(e.target.value)}  id="final" style={{ border: "1px solid gray", height: 300, borderRadius: 8 }}/>

   </div>

  
            <button className="btn btn-warning" type="submit" onClick={handleSubmit}>Extract medical terms</button>

      
        </form>
    <div className="mt-4">
        <button className="btn btn-success" id="start">
          Start
        </button>
        <button className="btn btn-danger" id="stop">
          Stop
        </button>
        <p id="status" className="lead mt-3" style={{ display: "none" }}>
          Listening...
        </p>
      </div>
      <div>
      <p>Dosage: {prescription.dosage}</p>
      <p>Patient name: {prescription.patientName}</p>
      <p>Medicine: {prescription.medicine}</p>
      <p>Duration: {prescription.duration}</p>
      </div>
    </>
  );
}

export default Demo;
