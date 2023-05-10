/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Su() {
  const [payload, setText] = useState('');
  const [prescription, setPrescription] = useState({});
  const [recognizing, setRecognizing] = useState(false);
  const recognition = new window.webkitSpeechRecognition();


  const [showPayload, setShowPayload] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setText(finalTranscript);
    };

    recognition.onend = () => {
      setRecognizing(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startRecognition = () => {
    recognition.start();
    setRecognizing(true);
  };
  
  const stopRecognition = () => {
    recognition.stop();
    setRecognizing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPayload(true);

    try {
   

      const res = await axios.post('/api/ttest', { payload:payload });
      setPrescription(res.data);
      setTimeout(() => {
        setResponse(prescription);
      }, 100);
      
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={startRecognition} disabled={recognizing}>
        Start
      </button>
      <button onClick={stopRecognition} disabled={!recognizing}>
        Stop
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Enter prescription payload:
          <textarea value={payload} onChange={(e) => setText(e.target.value)} />
        </label>
        <button type="submit">Extract medical terms</button>
      </form>

      {response.length > 0 && (
      <ul>
        {response.map((term, index) => (
          <li key={index}>
            {index + 1}: {JSON.stringify(term)}
          </li>
        ))}
      </ul>
    )}

    </div>
  );
}

export default Su;
