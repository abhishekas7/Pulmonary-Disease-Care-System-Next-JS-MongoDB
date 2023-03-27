import React from 'react'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const appId = 'a28da191-2c7e-4bc9-9076-d0f2ff76a3b1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);


function GivePrescription() {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
      const startListening = () => SpeechRecognition.startListening({ continuous: true });
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
  return (
    <div>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button
      onTouchStart={startListening}
      onMouseDown={startListening}
      onTouchEnd={SpeechRecognition.stopListening}
      onMouseUp={SpeechRecognition.stopListening}
    >Hold to talk</button>
    <p>{transcript}</p>
  </div>
  )
}

export default GivePrescription