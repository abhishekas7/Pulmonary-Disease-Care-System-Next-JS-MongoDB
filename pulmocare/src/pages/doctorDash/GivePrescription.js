import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";


function Demo() {
  const speech = () => {
    var langs = [
      ["Afrikaans", ["af-ZA"]],
      ["Bahasa Indonesia", ["id-ID"]],
      ["Bahasa Melayu", ["ms-MY"]],
      ["Català", ["ca-ES"]],
      ["Čeština", ["cs-CZ"]],
      ["Deutsch", ["de-DE"]],
      [
        "English",
        ["en-AU", "Australia"],
        ["en-CA", "Canada"],
        ["en-IN", "India"],
        ["en-NZ", "New Zealand"],
        ["en-ZA", "South Africa"],
        ["en-GB", "United Kingdom"],
        ["en-US", "United States"],
      ],
      [
        "Español",
        ["es-AR", "Argentina"],
        ["es-BO", "Bolivia"],
        ["es-CL", "Chile"],
        ["es-CO", "Colombia"],
        ["es-CR", "Costa Rica"],
        ["es-EC", "Ecuador"],
        ["es-SV", "El Salvador"],
        ["es-ES", "España"],
        ["es-US", "Estados Unidos"],
        ["es-GT", "Guatemala"],
        ["es-HN", "Honduras"],
        ["es-MX", "México"],
        ["es-NI", "Nicaragua"],
        ["es-PA", "Panamá"],
        ["es-PY", "Paraguay"],
        ["es-PE", "Perú"],
        ["es-PR", "Puerto Rico"],
        ["es-DO", "República Dominicana"],
        ["es-UY", "Uruguay"],
        ["es-VE", "Venezuela"],
      ],
      ["Euskara", ["eu-ES"]],
      ["Euskara", ["eu-ES"]],
      ["Français", ["fr-FR"]],
      ["Galego", ["gl-ES"]],
      ["Hrvatski", ["hr_HR"]],
      ["IsiZulu", ["zu-ZA"]],
      ["Íslenska", ["is-IS"]],
      ["Italiano", ["it-IT", "Italia"], ["it-CH", "Svizzera"]],
      ["Magyar", ["hu-HU"]],
      ["Nederlands", ["nl-NL"]],
      ["Norsk bokmål", ["nb-NO"]],
      ["Polski", ["pl-PL"]],
      ["Português", ["pt-BR", "Brasil"], ["pt-PT", "Portugal"]],
      ["Română", ["ro-RO"]],
      ["Slovenčina", ["sk-SK"]],
      ["Suomi", ["fi-FI"]],
      ["Svenska", ["sv-SE"]],
      ["Türkçe", ["tr-TR"]],
      ["български", ["bg-BG"]],
      ["Pусский", ["ru-RU"]],
      ["Српски", ["sr-RS"]],
      ["한국어", ["ko-KR"]],
      [
        "中文",
        ["cmn-Hans-CN", "普通话 (中国大陆)"],
        ["cmn-Hans-HK", "普通话 (香港)"],
        ["cmn-Hant-TW", "中文 (台灣)"],
        ["yue-Hant-HK", "粵語 (香港)"],
      ],
      ["日本語", ["ja-JP"]],
      ["Lingua latīna", ["la"]],
    ];

    let select_language = document.querySelector("#select_language");
    let select_dialect = document.querySelector("#select_dialect");

    for (var i = 0; i < langs.length; i++) {
      select_language.options[i] = new Option(langs[i][0], i);
    }

    select_language.selectedIndex = 6;
    updateCountry();
    select_dialect.selectedIndex = 6;

    function updateCountry() {
      for (var i = select_dialect.options.length - 1; i >= 0; i--) {
        select_dialect.remove(i);
      }
      var list = langs[select_language.selectedIndex];
      for (var i = 1; i < list.length; i++) {
        select_dialect.options.add(new Option(list[i][1], list[i][0]));
      }
      select_dialect.style.visibility =
        list[1].length == 1 ? "hidden" : "visible";
    }
  };

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
      speechRecognition.lang = document.querySelector("#select_dialect").value;

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
    speech();
    webSpeech();
  }, []);

  return (
    <>
      <div className="mt-4" id="div_language">
        <h2 className="mb-3">Select Language</h2>
        <select
          className="form-select"
          id="select_language"
          onchange="updateCountry()"
        />
        <select className="form-select mt-2" id="select_dialect" />
      </div>
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
