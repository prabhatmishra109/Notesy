import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import Footer from "../common/Footer";
import Swal from "sweetalert2";
import axios from "axios";

import "../../css/uploadnotes.css";

function UploadNotes() {
  const navigate = useNavigate();
  const email = localStorage.getItem("adminEmail");
  const plan = localStorage.getItem("userPlan") || "FREE";

  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false); // 🔥 NEW

  const [data, setData] = useState({
    email: email,
    title: "",
    notes: "",
    summary: ""
  });

  useEffect(() => {
    if (!email) navigate("/userLogin");
  }, [email, navigate]);

  ////////////////////////////////////////////////
  // TEXTAREA AUTO RESIZE (NEW)
  ////////////////////////////////////////////////
  const handleNotesChange = (e) => {
    setData({ ...data, notes: e.target.value });
  };

  ////////////////////////////////////////////////
  // FILE HANDLER (UNCHANGED LOGIC + LOADER)
  ////////////////////////////////////////////////
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const name = file.name.toLowerCase();

    const isAllowed =
      name.endsWith(".txt") ||
      name.endsWith(".docx") ||
      name.endsWith(".pdf");

    if (!isAllowed) {
      e.target.value = "";
      Swal.fire({
        title: "Upgrade Required 🚀",
        text: "Only TXT, PDF, DOCX allowed in free plan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Upgrade"
      }).then((res) => {
        if (res.isConfirmed) navigate("/payment");
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("plan", plan);

    try {
      setLoading(true); // 🔥 loader start

      const res = await axios.post(
        "http://localhost:8080/user/process-file",
        formData
      );

      setData((prev) => ({
        ...prev,
        notes: res.data.text,
        summary: res.data.summary
      }));

    } catch (err) {
      Swal.fire("Error processing file ❌");
    } finally {
      setLoading(false); // 🔥 loader stop
    }
  };

  ////////////////////////////////////////////////
  // VOICE INPUT (UNCHANGED)
  ////////////////////////////////////////////////
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;

      setData((prev) => ({
        ...prev,
        notes: (prev.notes ? prev.notes + " " : "") + speechText
      }));
    };

    recognition.onend = () => setIsListening(false);
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const hasNotes = data.notes && data.notes.trim().length > 0;

  if (!hasNotes) {
    Swal.fire("Write or upload notes first");
    return;
  }

  navigate("/textsummarizerpage", {
    state: { notesData: data }
  });
};
  ////////////////////////////////////////////////
  return (
    <>
      <UserHeader />

      <div className="upload-page"style={{marginTop:"20px"}}>

        <h2 className="upload-title">Upload Notes (Free)</h2>

        <div className="upload-container">

          <form className="upload-form">

            <label>Email</label>
            <input value={data.email} readOnly className="upload-input" />

            <label>Title</label>
            <input
              className="upload-input"
              onChange={(e) =>
                setData({ ...data, title: e.target.value })
              }
            />

            {/* 🔥 TEXTAREA ADDED */}
            <label>Notes (Paste / Type / Speak)</label>
            <textarea
              className="upload-textarea"
              value={data.notes}
              onChange={handleNotesChange}
              placeholder="Write or paste your notes here..."
            />

            <label>Upload File</label>
            <input
              type="file"
              accept=".txt,.pdf,.docx"
              onChange={handleFile}
              className="upload-file"
            />

            <button
            style={{marginBottom:"20px"}}
              type="button"
              onClick={startVoiceInput}
              className="voice-btn"
            >
              🎤 {isListening ? "Listening..." : "Speak Notes"}
            </button>

            
            <button
  className="upload-btn"
  onClick={handleSubmit}
>
   {loading ? "Processing..." : "Upload & Summarize"}
  Upload & Summarize
</button>

            {/* 🔥 LOADER */}
            {loading && <div className="loader"></div>}

          </form>

          <div className="upload-preview">
            <h4>Preview</h4>

            <div className="preview-content">
              {data.notes || "Extracted text will appear here..."}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default UploadNotes;