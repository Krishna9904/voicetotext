import React, { useState } from "react";

const VoiceToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleVoiceToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const resultText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(resultText);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div>
      <h2>Voice to Text</h2>
      <button onClick={handleVoiceToText} disabled={isListening}>
        {isListening ? "Listening..." : "Start Listening"}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <VoiceToText />
    </div>
  );
}

export default App;
