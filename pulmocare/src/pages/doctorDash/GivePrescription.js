import { useState } from 'react';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect } from 'react';

const appId = 'a28da191-2c7e-4bc9-9076-d0f2ff76a3b1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function GivePrescription() {
  const [isRecording, setIsRecording] = useState(false);

  const [transcrip, setTranscript] = useState([]);



  

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    finalTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(transcript)
    console.log(transcript)
   }, [])

  const handleRecord = () => {
    setIsRecording(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} sm={12} className="text-center">
          <h5>Record Prescription</h5>
          <p>Hold the record button to start recording your prescription.</p>
          {isRecording ? (
            <Button variant="danger" onClick={handleStop}>
              Stop Recording
            </Button>
          ) : (
            <Button variant="primary" onClick={handleRecord}>
              Start Recording
            </Button>
          )}
          <p className="mt-3">Transcript:</p>
          <div className="bg-light rounded p-3">
            <p>{transcript}</p>
          </div>
          {isRecording && (
            <Button variant="light" className="mt-3" onClick={handleReset}>
              Clear Transcript
            </Button>
          )}
          {listening && <Spinner animation="border" variant="primary" className="mt-3" />}
          {!listening && finalTranscript && (
            <Button variant="success" className="mt-3">
              Save Prescription
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default GivePrescription;
