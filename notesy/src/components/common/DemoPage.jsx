import "../../css/textsummarize.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function DemoPage() {

  // ================= LOGIN =================
  const storedEmail = localStorage.getItem("adminEmail");
  const isLoggedIn = !!storedEmail;
  const email = isLoggedIn ? storedEmail : "";

  // ================= ALERTS =================
  const showLoginAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please register/login → go to dashboard → upload notes → use all features.",
      showCancelButton: true,
      confirmButtonText: "Go to Login",
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.href = "/userLogin";
      }
    });
  };

  const showDashboardSuggestion = () => {
    Swal.fire({
      icon: "info",
      title: "Better Experience 🚀",
      text: "For better experience, go to Dashboard → Upload Notes → Summarize.",
      showCancelButton: true,
      confirmButtonText: "Go to Dashboard",
      cancelButtonText: "Continue Here",
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.href = "/userDashboard";
      }
    });
  };

  // ================= SHOW SUGGESTION ONCE =================
  useEffect(() => {
    if (isLoggedIn && !sessionStorage.getItem("shownSuggestion")) {
      showDashboardSuggestion();
      sessionStorage.setItem("shownSuggestion", "true");
    }
  }, []);

  // ================= DATA =================
  const location = useLocation();

  const rawText = location?.state?.notesData?.notes || "";
  const title = location?.state?.notesData?.title || "";

  const APIURL = isLoggedIn
    ? `http://localhost:8080/user/summaryId/${email}`
    : null;

  // ================= CLEAN OCR =================
  const cleanOCRText = (text) => {
    if (!text) return "";

    return text
      .replace(/https?:\/\/\S+/g, "")
      .replace(/TutorialsDuniya\.com/gi, "")
      .replace(/Contributor:.*?\n/gi, "")
      .replace(/\s+/g, " ")
      .split(". ")
      .filter((line, i, arr) => arr.indexOf(line) === i)
      .join(". ")
      .trim();
  };

  const cleanedText = cleanOCRText(rawText);

  // ================= STATE =================
  const [data, setData] = useState({
    inputText: cleanedText,
    summary: "",
    loading: false,
  });

  // ================= SAVE =================
  const saveSummary = async (result) => {
    if (!isLoggedIn) return;

    try {
      await axios.post(APIURL, {
        email,
        title,
        summarizeNotes: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SUMMARIZE =================
  const handleSummarize = async () => {
    if (!isLoggedIn) return showLoginAlert();

    if (!data.inputText) {
      return setData((prev) => ({
        ...prev,
        summary: "Please provide some text",
      }));
    }

    setData((prev) => ({ ...prev, loading: true, summary: "" }));

    try {
      const finalText = cleanOCRText(data.inputText);

      const response = await axios.post(
        "https://api.cohere.ai/v1/chat",
        {
          model: "command-a-03-2025",
          message: `Clean and summarize into structured notes:\n${finalText.slice(0, 4000)}`
        },
        {
          headers: {
            Authorization: "Bearer zRJsarq9M9VmtnIP5jUMGvbqq0Jh5wJQSlxhr7tK",
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        response.data.text ||
        response.data.message?.content?.[0]?.text ||
        "No summary generated.";

      setData((prev) => ({ ...prev, summary: result }));

      saveSummary(result);

    } catch (err) {
      setData((prev) => ({
        ...prev,
        summary: "Error: " + err.message,
      }));
    }

    setData((prev) => ({ ...prev, loading: false }));
  };

  // ================= FORMAT =================
  const formatBoldText = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // ================= AUDIO =================
  const handlePlay = () => {
    if (!isLoggedIn) return showLoginAlert();

    const clean = data.summary.replace(/\*\*/g, "");
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const handlePause = () => {
    if (!isLoggedIn) return showLoginAlert();
    window.speechSynthesis.pause();
  };

  const handleResume = () => {
    if (!isLoggedIn) return showLoginAlert();
    window.speechSynthesis.resume();
  };

  const handleStop = () => {
    if (!isLoggedIn) return showLoginAlert();
    window.speechSynthesis.cancel();
  };

  // ================= PDF =================
  const downloadPDF = () => {
    if (!isLoggedIn) return showLoginAlert();

    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();

    doc.text("Summary", width / 2, 20, { align: "center" });

    const text = doc.splitTextToSize(
      data.summary.replace(/\*\*/g, ""),
      width - 20
    );

    doc.text(text, 10, 30);
    doc.save("summary.pdf");
  };

  const downloadFullPDF = () => {
    if (!isLoggedIn) return showLoginAlert();

    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();

    doc.text("Full Report", width / 2, 20, { align: "center" });

    const original = doc.splitTextToSize(data.inputText, width - 20);
    doc.text(original, 10, 30);

    let y = 30 + original.length * 7;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    const summary = doc.splitTextToSize(
      data.summary.replace(/\*\*/g, ""),
      width - 20
    );

    doc.text(summary, 10, y + 10);
    doc.save("full-report.pdf");
  };

  // ================= UI =================
  return (
    <div className="summarize-page">

      <h2 className="summarize-title">
        AI Text Summarizer {!isLoggedIn && "(Demo Mode)"}
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
          />

          {data.summary && (
            <div className="summary-actions">

              <button onClick={downloadPDF}>Download Summary PDF</button>
              <button onClick={downloadFullPDF}>Download Full Report</button>

              <button onClick={handlePlay}>▶ Play</button>
              <button onClick={handlePause}>⏸ Pause</button>
              <button onClick={handleResume}>▶ Resume</button>
              <button onClick={handleStop}>⏹ Stop</button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}