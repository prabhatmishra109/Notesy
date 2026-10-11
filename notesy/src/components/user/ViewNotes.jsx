import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";
import "../../css/viewnotes.css";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

function ViewNotes() {
  const email = localStorage.getItem("adminEmail");
  const APIURL = `http://localhost:8080/user/receivenotes/${email}`;

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate =useNavigate();
    
    useEffect(()=>{
      
      if (email === null)
    navigate("/userLogin")
  
    },[])
  useEffect(() => {
    axios
      .get(APIURL)
      .then((res) => {
        // SAFE CHECK (important)
        if (Array.isArray(res.data)) {
          setNotes(res.data);
        } else {
          setNotes([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setNotes([]);
        setLoading(false);
      });
  }, []);

  // Date format function
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  return (
    <>
      <UserHeader />

      <div className="container">
        <h2 style={{marginTop:"90px"}}>Received Notes</h2>
{/* No Data */}
{!loading && notes.length === 0 && (
  <div className="empty-box">
    <img
      src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
      alt="no notes"
    />
    <h3>No Notes Found</h3>
    <p>You haven't received any notes yet.</p>
  </div>
)}

        {/* Table */}
        {!loading && notes.length > 0 && (
          <table style={{marginBottom:"200px"}}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Sender</th>
                <th>File</th>
              </tr>
            </thead>

           <tbody>
  {notes.map((note, i) => (
    <tr key={i}>
      <td>{formatDate(note.date)}</td>
      <td>{note.subject}</td>
      <td>{note.senderEmail}</td>
      <td>
        <div className="file-box">
          <span className="file-name">{note.fileName}</span>
          <a
            href={`http://localhost:8080/uploads/notessummarizefile/${note.fileName}`}
          >
            ⬇
          </a>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table >
        )}
      </div>
      <Footer/>
    </>
  );
}

export default ViewNotes;