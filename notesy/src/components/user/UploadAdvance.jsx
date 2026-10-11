

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// import UserHeader from "./UserHeader";
// import Footer from "../common/Footer";
// import "../../css/uploadnotes.css";

// function UploadAdvance() {

//   const navigate = useNavigate();
//   const email = localStorage.getItem("adminEmail");

//   const [loading, setLoading] = useState(false);
//   const [isListening, setIsListening] = useState(false);

//   const [data, setData] = useState({
//     email: email,
//     title: "",
//     notes: "",
//     summary: ""
//   });


// const [url, setUrl] = useState('');

// const [result, setResult] = useState({ text: '', summary: '' });

// useEffect(() => {
//     // 1. Check karein ki URL valid hai ya nahi
//     if (url.trim().length > 10) { 
//         const delayDebounceFn = setTimeout(() => {
//             handleAutoExtract();
//         }, 1000); // User ke rukne ke 1 second baad start hoga

//         return () => clearTimeout(delayDebounceFn);
//     }
// }, [url]); // Jab bhi 'url' change hoga, yeh chalega

// const handleAutoExtract = async () => {
//     setLoading(true);
//     try {
//         const response = await axios.post('http://localhost:8080/user/process-link', {
//             url: url,
//             plan: "PREMIUM"
//         });
        
//         // Data set karein taki screen par dikhe
//         setResult(response.data);
//     } catch (error) {
//         console.error("Error:", error);
//     } finally {
//         setLoading(false);
//     }
// };
//   ////////////////////////////////////////////////
//   useEffect(() => {

//     const plan = localStorage.getItem("userPlan");

//     if (!email) {
//       navigate("/userLogin");
//       return;
//     }

//     if (plan !== "PREMIUM") {
//       Swal.fire({
//         title: "Premium Required 🚀",
//         text: "Please upgrade to access this feature",
//       }).then(() => navigate("/upload"));
//     }

//   }, [email, navigate]);

//   ////////////////////////////////////////////////
//   // FILE HANDLER (UNCHANGED LOGIC)
//   ////////////////////////////////////////////////
//   const handleFile = async (e) => {

//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("plan", "PREMIUM");

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:8080/user/process-file",
//         formData
//       );

//       setData(prev => ({
//         ...prev,
//         notes: res.data.text,
//         summary: res.data.summary
//       }));

//     } catch (err) {
//       Swal.fire("Processing failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   ////////////////////////////////////////////////
//   // VOICE INPUT (NEW UI ONLY)
//   ////////////////////////////////////////////////
//   const startVoice = () => {

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";

//     recognition.start();
//     setIsListening(true);

//     recognition.onresult = (e) => {
//       const text = e.results[0][0].transcript;

//       setData(prev => ({
//         ...prev,
//         notes: prev.notes + " " + text
//       }));
//     };

//     recognition.onend = () => setIsListening(false);
//   };

//   ////////////////////////////////////////////////
//   // SUBMIT (UNCHANGED LOGIC)
//   ////////////////////////////////////////////////
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!data.summary) {
//       Swal.fire("Upload file first");
//       return;
//     }

//     navigate("/textsummarizerpage", {
//       state: { notesData: data }
//     });
//   };

//   ////////////////////////////////////////////////
//   return (
//     <>
//       <UserHeader />

//       <div className="upload-page" style={{marginTop:"20px"}}>

//         <h2 className="upload-title">Upload Notes (Premium)</h2>

//         <div className="upload-container">

//           <form className="upload-form" onSubmit={handleSubmit}>

//             <label>Email</label>
//             <input value={data.email} readOnly className="upload-input" />

//             <label>Title</label>
//             <input
//               className="upload-input"
//               onChange={(e) =>
//                 setData({ ...data, title: e.target.value })
//               }
//             />

//             {/* TEXTAREA */}
//             <label>Notes (Paste / Type / Speak)</label>
//             <textarea
//               className="upload-textarea"
//               value={data.notes}
//               onChange={(e) =>
//                 setData({ ...data, notes: e.target.value })
//               }
//               placeholder="Write or paste notes..."
//             />

//             {/* FILE */}
//             <label>Upload File</label>
//             <input
//               type="file"
//               accept=".txt,.pdf,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.mp3,.mp4,.wav"
//               onChange={handleFile}
//               className="upload-file"
//             />


//             {/* VOICE */}
//             <button
//             style={{marginBottom:"20px"}}
//               type="button"
//               className="voice-btn"
//               onClick={startVoice}
//               style={{ background: isListening ? "red" : "#a6b1e1" }}
//             >
//               🎤 {isListening ? "Listening..." : "Speak Notes"}
              
//             </button>

//             {/* SUBMIT */}
//             <button type="submit" className="upload-btn">
              
//               {loading ? "Processing..." : "Upload & Summarize"}
//             </button>

//             {loading && <div className="loader"></div>}

//           </form>

//           {/* PREVIEW */}
//           <div className="upload-preview">
//             <h4>Preview</h4>
//             <div className="preview-content">
//               {data.notes || "Extracted text will appear here..."}
//             </div>
//           </div>

//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default UploadAdvance;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import UserHeader from "./UserHeader";
import Footer from "../common/Footer";
import "../../css/uploadnotes.css";

function UploadAdvance() {
  const navigate = useNavigate();
  const email = localStorage.getItem("adminEmail");

  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [url, setUrl] = useState(""); // URL state add ki gayi

  const [data, setData] = useState({
    email: email,
    title: "",
    notes: "",
    summary: "",
  });

  // AUTO EXTRACT LOGIC (Jab link paste ho)
  useEffect(() => {
    if (url.trim().length > 10) {
      const delayDebounceFn = setTimeout(() => {
        handleAutoExtract();
      }, 1000); // 1 second wait karega paste karne ke baad

      return () => clearTimeout(delayDebounceFn);
    }
  }, [url]);

  const handleAutoExtract = async () => {
    setLoading(true);
    const cleanUrl = url.trim().split("http").filter(Boolean).map(u => "http" + u)[0];
    try {
     const response = await axios.post("http://localhost:8080/user/process-link", {
  url: cleanUrl,
  plan: "PREMIUM",
});

      // Extracted text ko seedha 'data' state mein daalna taaki textarea mein dikhe
      setData((prev) => ({
        ...prev,
        notes: response.data.text,
        summary: response.data.summary,
      }));
      
      Swal.fire({
        icon: 'success',
        title: 'Link Extracted!',
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("BACKEND ERROR:", error.response.data);

    alert("Backend says: " + error.response.data); // simple dikhega
  } else {
    alert("Server not reachable");
  }
}
  };

  // CHECK PLAN & AUTH
  useEffect(() => {
    const plan = localStorage.getItem("userPlan");
    if (!email) {
      navigate("/userLogin");
      return;
    }
    if (plan !== "PREMIUM") {
      Swal.fire({
        title: "Premium Required 🚀",
        text: "Please upgrade to access this feature",
      }).then(() => navigate("/upload"));
    }
  }, [email, navigate]);

  // FILE HANDLER
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("plan", "PREMIUM");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/user/process-file", formData);
      setData((prev) => ({
        ...prev,
        notes: res.data.text,
        summary: res.data.summary,
      }));
    } catch (err) {
      Swal.fire("Processing failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // VOICE INPUT
  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    setIsListening(true);
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setData((prev) => ({
        ...prev,
        notes: prev.notes + " " + text,
      }));
    };
    recognition.onend = () => setIsListening(false);
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.summary) {
      Swal.fire("Extract some content first (File or Link)");
      return;
    }
    navigate("/textsummarizerpage", {
      state: { notesData: data },
    });
  };

  return (
    <>
      <UserHeader />
      <div className="upload-page" style={{ marginTop: "20px" }}>
        <h2 className="upload-title">AI Advanced Extraction (Link/File/Voice)</h2>
        <div className="upload-container">
          <form className="upload-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input value={data.email} readOnly className="upload-input" />

            {/* --- NEW: LINK INPUT FIELD --- */}
            <label style={{ color: "#6a479c", fontWeight: "bold" }}>Paste Web/Video Link (Auto-Extract)</label>
            <input
              type="url"
              className="upload-input"
              placeholder="Paste YouTube or Website URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ border: "2px solid #a6b1e1" }}
            />

            <label>Title</label>
            <input
              className="upload-input"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter title for these notes"
            />

            <label>Notes (Extracted Text)</label>
            <textarea
              className="upload-textarea"
              value={data.notes}
              onChange={(e) => setData({ ...data, notes: e.target.value })}
              placeholder="Extracted text will appear here automatically..."
            />

            <label>Upload File</label>
            <input
              type="file"
              accept=".txt,.pdf,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.mp3,.mp4,.wav"
              onChange={handleFile}
              className="upload-file"
            />

            <button
              type="button"
              className="voice-btn"
              onClick={startVoice}
              style={{
                background: isListening ? "red" : "#a6b1e1",
                marginBottom: "20px",
              }}
            >
              {isListening ? "Listening..." : "🎤 Speak Notes"}
            </button>

            <button type="submit" className="upload-btn">
              {loading ? "Processing..." : "Generate Final Summary"}
            </button>

            {loading && <div className="loader"></div>}
          </form>

          <div className="upload-preview">
            <h4>Live Preview</h4>
            <div className="preview-content">
              {data.notes || "Paste a link or upload a file to see magic..."}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UploadAdvance;