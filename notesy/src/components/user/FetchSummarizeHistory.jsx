import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";
import "../../css/summarizehistory.css";

// Chart
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function FetchSummarizeHistory() {
  const email = localStorage.getItem("adminEmail");
  const APIURL = `http://localhost:8080/user/History/${email}`;

  const [summaries, setSummaries] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
const navigate =useNavigate();
    
    useEffect(()=>{
      
      if (email === null)
    navigate("/userLogin")
  
    },[])
  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const res = await axios.get(APIURL);
      setSummaries(res.data);
      setOriginalData(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete?")) return;

  try {
    await axios.delete(`http://localhost:8080/user/deleteSummary/${id}`);

    const updated = summaries.filter(item => item.id !== id);
    setSummaries(updated);

  } catch (error) {
    console.error(error);
  }
};

  // SEARCH
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // CHART DATA
  const chartData = {
    labels: summaries.map((item, index) => `Note ${index + 1}`),
    datasets: [
      {
        label: "Summary Length",
        data: summaries.map((item) => item.summarizeNotes.length),
        backgroundColor: "#3F72AF",
        borderRadius: 6,
      },
    ],
  };

  return (
    <>
      <UserHeader />

      <div className="history-container">

        {/* ===== STATS ===== */}
        <div className="stats-container">
          <div className="stat-card">
            <h4>Total Notes</h4>
            <p>{originalData.length}</p>
          </div>

          <div className="stat-card">
            <h4>Latest Title</h4>
            <p>{originalData[0]?.title || "N/A"}</p>
          </div>
        </div>

        {/* ===== TITLE ===== */}
        <h2 className="history-title">📊 Your Summarized Notes</h2>

        {/* ===== SEARCH ===== */}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search notes..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* ===== CHART ===== */}
        <div className="chart-container">
          <h3>📈 Notes Analytics</h3>
          <Bar data={chartData} />
        </div>

        {/* ===== CONTENT ===== */}
        <div className="history-grid">

          {originalData.length === 0 ? (
            <p className="no-data">No notes found 😢</p>
          ) : searchText ? (

            // 🔍 SEARCH MODE
            originalData
              .filter(item =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, index) => (
                <div
                  key={index}
                  className="search-item"
                  onClick={() => setSelectedNote(item)}
                >
                  📌 {item.title}
                </div>
              ))

          ) : (

            // 📦 NORMAL MODE
            summaries.map((item, index) => (
           
              <div key={index} className="history-card">

  <h3 className="history-card-title">{item.title}</h3>

  <p className="history-email">
    <b>Email:</b> {item.email}
  </p>

  <p className="history-text">
    {item.summarizeNotes}
  </p>

  {/* ✅ YEH ADD KARNA HAI */}
  <button
    className="delete-btn"
    onClick={() => handleDelete(item.id)}
  >
    🗑 Delete
  </button>

</div>
            ))

          )}

        </div>

      </div>

      {/* ===== MODAL ===== */}
      {selectedNote && (
        <div className="modal-overlay" onClick={() => setSelectedNote(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            
            <h2>{selectedNote.title}</h2>
            <p><b>Email:</b> {selectedNote.email}</p>
            <p className="modal-text">{selectedNote.summarizeNotes}</p>

            <button onClick={() => setSelectedNote(null)}>Close</button>

          </div>
        </div>
      )}
     <Footer/>
    </>
  );
}

export default FetchSummarizeHistory;