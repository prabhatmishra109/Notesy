import "../../css/textsummarize.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import Footer from "../common/Footer";
import SmartMindMap from "./SmartMindMap";

export default function TextSummarizePage() {
const [loading, setLoading] = useState(false);
const [videoUrl, setVideoUrl] = useState("");
const [videoLoading, setVideoLoading] = useState(false);
  const location = useLocation();
const [summaryText, setSummaryText] = useState("");
  const rawText = location?.state?.notesData?.notes || "";
  const email = location?.state?.notesData?.email || "";
  const title = location?.state?.notesData?.title || "";

  const APIURL = `http://localhost:8080/user/summaryId/${email}`;

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) navigate("/userLogin");
  }, []);



  // 🔹 CLEAN OCR TEXT
  function cleanOCRText(text) {
    if (!text) return "";

    return text
      .replace(/https?:\/\/\S+/g, "")
      .replace(/TutorialsDuniya\.com/gi, "")
      .replace(/Contributor:.*?\n/gi, "")
      .replace(/\s+/g, " ")
      .split(". ")
      .filter((line, index, arr) => arr.indexOf(line) === index)
      .join(". ")
      .trim();
  }

  const cleanedText = cleanOCRText(rawText);

  const [data, setData] = useState({
    inputText: cleanedText,
    summary: "",
    loading: false,
  });

  // 🔹 SAVE SUMMARY
  const saveSummary = async (result) => {
    try {
      const payload = {
        email,
        title,
        summarizeNotes: result,
      };

      await axios.post(APIURL, payload);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 MAIN SUMMARIZE FUNCTION (UPDATED)
  const handleSummarize = async () => {
    if (!data.inputText) {
      setData(prev => ({
        ...prev,
        summary: "Please provide some text",
      }));
      return;
    }

    setData(prev => ({ ...prev, loading: true, summary: "" }));

    try {
      const finalText = cleanOCRText(data.inputText);

      // ✅ BACKEND CALL
      const response = await axios.post(
        "http://localhost:8080/user/summarize-cohere",
        {
          text: finalText
        }
      );

      const result = response.data;

      setData(prev => ({
        ...prev,
        summary: result,
      }));

      saveSummary(result);

    } catch (err) {
      setData(prev => ({
        ...prev,
        summary: "Error: " + err.message,
      }));
    }

    setData(prev => ({ ...prev, loading: false }));
  };

  // 🔹 FORMAT TEXT
  const formatBoldText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/#{1,6}\s?/g, "");
  };


  const handlePlay = () => {
  if (!data.summary) return;

  const cleanText = data.summary.replace(/\*\*/g, "");

  const speech = new SpeechSynthesisUtterance(cleanText);

  speech.lang = "en-US"; // or "hi-IN"
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
};

  const handlePause = () => window.speechSynthesis.pause();
  const handleResume = () => window.speechSynthesis.resume();
  const handleStop = () => window.speechSynthesis.cancel();

  // 🔹 DOWNLOAD SUMMARY PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();

    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text("Summary", width / 2, 20, { align: "center" });

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    const text = data.summary.replace(/\*\*/g, "");
    const splitText = doc.splitTextToSize(text, width - 20);

    doc.text(splitText, 10, 30);
    doc.save("summary.pdf");
  };

  // 🔹 DOWNLOAD FULL PDF
  const downloadFullPDF = () => {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();

    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text("Full Report", width / 2, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text("Original Text:", 10, 30);

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    const original = doc.splitTextToSize(data.inputText, width - 20);
    doc.text(original, 10, 40);

    let y = 40 + original.length * 7;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("Times", "Bold");
    doc.setFontSize(14);
    doc.text("Summary:", 10, y);

    const summary = doc.splitTextToSize(
      data.summary.replace(/\*\*/g, ""),
      width - 20
    );

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);
    doc.text(summary, 10, y + 10);

    doc.save("full-report.pdf");
  };
// Apne component ke andar ye function rakhein
const handleAudioDownload = async (rawSummaryText) => {
    if (!rawSummaryText) {
        alert("Pehle summary generate karein!");
        return;
    }

    // Cleaning symbols
    let cleanText = rawSummaryText
        .replace(/[*#-_]/g, '')    
        .replace(/\s+/g, ' ')      
        .trim();

    try {
        // API call using Backticks for Template Literals
        const response = await fetch(`http://localhost:8080/user/download-summary-audio?summaryText=${encodeURIComponent(cleanText)}`);
        
        if (!response.ok) throw new Error("Server error");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'summary_audio.wav';
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error:", error);
        alert("Audio download nahi ho saka.");
    }
};


return(
    <>
      <UserHeader />

      <div className="summarize-page">
        <h2 className="summarize-title" style={{ marginTop: "30px" }}>
          AI Text Summarizer
        </h2>

        <div className="summarize-container">

          {/* LEFT */}
          <div className="input-section">
            <h4>Original Text</h4>

            <textarea
              className="summarize-textarea"
              value={data.inputText}
              onChange={(e) =>
                setData({ ...data, inputText: e.target.value })
              }
            />

            <button
              className="summarize-btn"
              onClick={handleSummarize}
              disabled={data.loading}
            >
              {data.loading ? "Summarizing..." : "Summarize"}
              
            </button>
          </div>

          {/* RIGHT */}
          <div className="output-section">
            <h4>Summary</h4>

            <div
              className="summary-box"
              dangerouslySetInnerHTML={{
                __html: formatBoldText(
                  data.summary || "Your summary will appear here..."
                ),
              }}
            ></div>

            {data.summary && (
              <div className="summary-actions">

                <button onClick={downloadPDF} className="btn btn-success">
                  Download Summary PDF
                </button>

                <button onClick={downloadFullPDF} className="btn btn-success">
                  Download Full Report
                </button>

                <button onClick={handlePlay} className="btn btn-success">
                  ▶ Play
                </button>
  <button onClick={() => handleAudioDownload(data.summary)}>
    Download Audio
</button>


      

     

                <button onClick={handlePause} className="btn btn-warning">
                  ⏸ Pause
                </button>

                <button onClick={handleResume} className="btn btn-info">
                  ▶ Resume
                </button>

                <button onClick={handleStop} className="btn btn-danger">
                  ⏹ Stop
                </button>
<button
  onClick={() =>
    navigate("/smartmind", {
      state: { summary: data.summary }
    })
  }
  className="btn btn-primary"
>
  🧠 Open Mind Map
</button>
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}