/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getError } from "@/util/error";



function Demo({Data}) {
  const [text, setText] = useState('');
  const [prescription, setPrescription] = useState({});
  const [entities, setEntities] = useState([]);
  const [showPayload, setShowPayload] = useState(false);





  useEffect(() => {
    webSpeech();
    

  }, []);

 


  const webSpeech = () => {
    if ("webkitSpeechRecognition" in window) {
      let speechRecognition = new webkitSpeechRecognition();
      let final_transcript = "";
  
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';
  
      speechRecognition.onstart = () => {
        document.querySelector("#status").style.display = "block";
      };
  
      speechRecognition.onerror = () => {
        document.querySelector("#status").style.display = "none";
      };
  
      speechRecognition.onend = () => {
        document.querySelector("#status").style.display = "none";
      };
  
      speechRecognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          }
        }
  
        document.querySelector("#final").innerHTML = final_transcript;
        setText(final_transcript);
      };
  
      document.querySelector("#start").onclick = () => {
        speechRecognition.start();
      };
  
      document.querySelector("#stop").onclick = () => {
        speechRecognition.stop();
      };
    } else {
      console.log("Speech Recognition Not Available");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/ttest', { payload: text });
      setPrescription(res.data);
      setEntities(res.data);
      console.log(res.data);
    } catch (err) {
      getError(err);
      if(err){
        alert('model is loading')
      }
    }
  };
  function getBadgeColor(entityGroup) {
    switch (entityGroup) {
      case "DOSAGE":
        return "bg-primary";
      case "FORM":
        return "bg-secondary";
      case "DRUG":
        return "bg-success";
      case "ROUTE":
        return "bg-info";
      case "FREQUENCY":
        return "bg-warning";
      case "DURATION":
        return "bg-danger";
      default:
        return "bg-dark";
    }
  }


  const generatePrescriptionPDF = () => {
    const doc = new jsPDF();
   
    // Add doctor and patient details
    doc.setFontSize(14);
    doc.text(`Doctor's Name: '${Data.doctor.user.name}'}`, 20, 20);
    doc.text(`Patient's Name: ${Data.patient.name.first} ${Data.patient.name.last}`, 20, 27);
   
    // Create the table headers and data
    const headers = [["Medicine Name", "Dosage", "Duration", "Frequency"]];
    const data = entities.map((entity) => {
      const drug = entity.entity_group === "DRUG" ? entity.word : "";
      const dosage = entity.entity_group === "DOSAGE" ? entity.word : "";
      const duration = entity.entity_group === "DURATION" ? entity.word : "";
      const frequency = entity.entity_group === "FREQUENCY" ? entity.word : "";
      return [drug, dosage, duration, frequency];
    });
  
    // Customize empty cells with a hyphen
    const didParseCell = (data) => {
      if (data.section === "body" && data.cell.text === "") {
        data.cell.text = "-";
      }
    };
  
    // Generate the table
    doc.autoTable({
      head: headers,
      body: data,
      startY: 40,
      theme: "grid",
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 12,
        fillColor: "#FFFFFF",
        textColor: "#444444",
        lineWidth: 0.5,
      },
      didParseCell,
    });
  
    // Add space for diagnosis reason
    doc.setFontSize(12);
    doc.text("Diagnosis Reason: ______________________", 20, doc.autoTable.previous.finalY + 20);
  
    // Add signature and date lines
    doc.setFontSize(10);
    doc.text("Doctor's Signature: ______________________", 20, doc.autoTable.previous.finalY + 40);
    doc.text("Date: ______________________", 20, doc.autoTable.previous.finalY + 47);
  
    // Save the PDF
    doc.save("prescription.pdf");
  };
  
  const generatePresc = () => {
    const doc = new jsPDF();
   
    // Add doctor and patient details
    doc.setFontSize(14);
    doc.text(`Doctor's Name: '${Data.doctor.user.name}'}`, 20, 20);
    doc.text(`Patient's Name: ${Data.patient.name.first} ${Data.patient.name.last}`, 20, 27);
   
    // Create the table headers and data
    const headers = [["Medicine Name", "Dosage", "Duration", "Frequency"]];
    const data = entities.map((entity) => {
      const drug = entity.entity_group === "DRUG" ? entity.word : "";
      const dosage = entity.entity_group === "DOSAGE" ? entity.word : "";
      const duration = entity.entity_group === "DURATION" ? entity.word : "";
      const frequency = entity.entity_group === "FREQUENCY" ? entity.word : "";
      return [drug, dosage, duration, frequency];
    });
  
    // Customize empty cells with a hyphen
    const didParseCell = (data) => {
      if (data.section === "body" && data.cell.text === "") {
        data.cell.text = "-";
      }
    };
  
    // Generate the table
    doc.autoTable({
      head: headers,
      body: data,
      startY: 40,
      theme: "grid",
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 12,
        fillColor: "#FFFFFF",
        textColor: "#444444",
        lineWidth: 0.5,
      },
      didParseCell,
    });
  
    // Add space for diagnosis reason
    doc.setFontSize(12);
    doc.text("Diagnosis Reason: ______________________", 20, doc.autoTable.previous.finalY + 20);
  
    // Add signature and date lines
    doc.setFontSize(10);
    doc.text("Doctor's Signature: ______________________", 20, doc.autoTable.previous.finalY + 40);
    doc.text("Date: ______________________", 20, doc.autoTable.previous.finalY + 47);
  
    // Save the PDF
    doc.save("prescription.pdf");
  };
  

  return (
    <>
      <p><b>Name :</b>{Data.patient.name.first} {Data.patient.name.last}</p>
      <form>
        <h6 className="mt-4">Transcript</h6>
        <div>
          <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="final"
        style={{
          border: "1px solid gray",
          height: 300,
          borderRadius: 8,
        }}
      />
        </div>
        <button
      className="btn btn-warning"
      type="submit"
      onClick={handleSubmit}
    >
          Extract medical terms
        </button>
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
        {entities.length > 0 && (
        <div>
          <h4>Medicines and Dosage</h4>
          <ul>
            {entities.map((entity, index) => (
              <li key={index}>
                {entity.entity_group}:{" "}
                <span className={`badge rounded-pill ${getBadgeColor(entity.entity_group)}`}>{entity.word}</span>
              </li>
          ))}
          </ul>
          <button
           className="btn btn-primary"
           onClick={generatePrescriptionPDF}
         >
            Generate PDF
          </button>
          <button
           className="btn btn-danger"
           onClick={generatePresc}
         >
            Generate PDF
          </button>
        
        </div>
    )}
        {showPayload && (
        <>
          <h2>Payload:</h2>
          <p>{text}</p>
          <h2>Response:</h2>
          <p>{JSON.stringify(prescription)}</p>
        </>
    )}
      </div>
    </>
  );
}

export default Demo;
