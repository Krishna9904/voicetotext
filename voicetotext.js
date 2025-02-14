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






import React, { useState } from "react";

const data = {
  react: {
    description:
      "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components. React uses a virtual DOM to improve performance and supports hooks for state and lifecycle management.",
    video: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
    documentation: "https://react.dev/",
    creator: "Facebook (Meta)",
  },
  javascript: {
    description:
      "JavaScript is a versatile programming language primarily used for web development. It enables interactive web pages, supports asynchronous programming, and is widely used in frontend and backend development.",
    video: "https://www.youtube.com/watch?v=upDLs1sn7g4",
    documentation: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    creator: "Brendan Eich",
  },
  html: {
    description:
      "HTML stands for HyperText Markup Language. It is the standard language for creating web pages and web applications. It provides the basic structure of a webpage, which can be enhanced with CSS and JavaScript.",
    video: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
    documentation: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    creator: "Tim Berners-Lee",
  },
  css: {
    description:
      "CSS, or Cascading Style Sheets, is used for styling HTML elements and improving the visual presentation of web pages. It supports features like animations, transitions, and responsive design.",
    video: "https://www.youtube.com/watch?v=1PnVor36_40",
    documentation: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    creator: "Håkon Wium Lie",
  },
};

export default function DynamicTemplate() {
  const [searchText, setSearchText] = useState("");

  const matchedKey = Object.keys(data).find(
    (key) =>
      searchText.toLowerCase().includes(key) &&
      searchText.toLowerCase().split(key).length === 2
  );

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <textarea
        placeholder="Enter text..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          height: "100px",
        }}
      />
      {matchedKey && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
            {matchedKey.charAt(0).toUpperCase() + matchedKey.slice(1)}
          </h2>
          <p style={{ marginTop: "5px", color: "#555" }}>
            {data[matchedKey].description}
          </p>
          <p>
            <strong>Creator:</strong> {data[matchedKey].creator}
          </p>
          <a
            href={data[matchedKey].documentation}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "green",
              textDecoration: "underline",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Read Documentation
          </a>
          <a
            href={data[matchedKey].video}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Watch Video
          </a>
        </div>
      )}
    </div>
  );
}

