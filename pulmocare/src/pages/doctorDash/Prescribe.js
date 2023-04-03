import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";


function Demo() {


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
        document.querySelector("#status").style.display = "none";
      };

      speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        let interim_transcript = "";

        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        // Set the Final transcript and Interim transcript.
        document.querySelector("#final").innerHTML = final_transcript;
        console.log(final_transcript)
        document.querySelector("#interim").innerHTML = interim_transcript;
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

  const [email,setEmail]=useState();
  const [name,setName]=useState();
  const [pateintID,setPateintID]=useState();
  const [show, setShow] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const handleClose = () => setShow(false);
  const sigCanvas = useRef({});
  const [result, setResult] = useState('<h3>Please Give Some Input</h3>');

  useEffect(() => {
    webSpeech();
  }, []);

  return (
    <>
   
      <h6 className="mt-4">Transcript</h6>
      <div
        className="p-3"
        style={{ border: "1px solid gray", height: 300, borderRadius: 8 }}
      >
        <span id="final" />
        <span id="interim" />
      </div>
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
    </>
  );
}

export default Demo;
