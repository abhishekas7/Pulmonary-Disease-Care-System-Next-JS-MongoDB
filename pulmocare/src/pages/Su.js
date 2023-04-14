import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Su() {
  const [text, setText] = useState('');
  const [prescription, setPrescription] = useState({});
  const [recognizing, setRecognizing] = useState(false);
  const recognition = new window.webkitSpeechRecognition();

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
    try {
      const res = await axios.post('/api/prescribe', { text });
      setPrescription(res.data);
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
          Enter prescription text:
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button type="submit">Extract medical terms</button>
      </form>
      <p>Dosage: {prescription.dosage}</p>
      <p>Patient name: {prescription.patientName}</p>
      <p>Medicine: {prescription.medicine}</p>
      <p>Duration: {prescription.duration}</p>
    </div>
  );
}

export default Su;
