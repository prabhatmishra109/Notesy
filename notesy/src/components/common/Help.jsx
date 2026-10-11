import React, { useState } from "react";
import axios from "axios";
import "../../css/help.css"
import { FaRobot, FaMicrophone } from "react-icons/fa";

const Help = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  // 🔥 Send message
  const handleSend = async () => {
    if (!input) return;

    const userMsg = { type: "user", text: input };

    try {
      const res = await axios.post("http://localhost:8080/user/help", {
        message: input,
      });

      const botMsg = { type: "bot", text: res.data.reply };

      setChat([...chat, userMsg, botMsg]);

      speak(res.data.reply);

    } catch (err) {
      console.log(err);
    }

    setInput("");
  };

  // 🎤 Voice input
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };
    recognition.start();
  };

  // 🔊 Voice output
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="help-container">

      <h1 className="title">Help Center 🤖</h1>

      <div className="chatbox">
        <div className="chat-body">
          {chat.map((msg, i) => (
            <div key={i} className={msg.type}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
          />
          <button onClick={handleSend}>Send</button>
          <button onClick={startVoice}>
            <FaMicrophone />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Help;