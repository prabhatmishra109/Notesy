import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserHeader from "./UserHeader";
import "../../css/sharenotes.css"
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

function ShareNotes() {

  const email = localStorage.getItem("adminEmail");

  const APIURL = "http://localhost:8080/user/uploadFile";

  const [data, setData] = useState({
    senderEmail: email,
    receiverEmail: "",
    subject: "",
    notes: ""
  });

  const [file, setFile] = useState(null);

  const navigate =useNavigate();
    
    useEffect(()=>{
      
      if (email === null)
    navigate("/userLogin")
  
    },[])

  // INPUT HANDLER
  const fetchData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // FILE SELECT
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // SUBMIT FUNCTION
  const submitData = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire("Error", "Please select file", "error");
      return;
    }

    try {

      const formData = new FormData();

      // JSON part
      formData.append(
        "notessummarizefile",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      // File part
      formData.append("pdfFile", file);

      const res = await axios.post(APIURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      //  RESPONSE CHECK
      if (res.data.body.message === "Invalid receiver email") {
       
        Swal.fire("Error", "Receiver email not found ", "error");
      } else {
        Swal.fire("Success", "Notes Shared Successfully ", "success");

        // RESET FORM
        setData({
          senderEmail: email,
          receiverEmail: "",
          subject: "",
          notes: ""
        });
 console.log(res.data)
        setFile(null);
      }

    } catch (err) {
      console.log(err);

      //  ERROR HANDLE (Backend se message)
      if (err.response && err.response.data.message) {
        Swal.fire("Error", err.response.data.message, "error");
      } else {
        Swal.fire("Error", "Upload Failed", "error");
      }
    }
  };

  return (
    <>
      <UserHeader />

      <div style={{ padding: "100px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "500px" }}>

          <h3>Share Notes</h3>

          <form onSubmit={submitData}>

            <input
              type="text"
              name="senderEmail"
              value={data.senderEmail}
              readOnly
              className="form-control mb-3"
            />

            <input
              type="text"
              name="receiverEmail"
              placeholder="Receiver Email"
              className="form-control mb-3"
              value={data.receiverEmail}
              onChange={fetchData}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="form-control mb-3"
              value={data.subject}
              onChange={fetchData}
              required
            />

            <input
              type="file"
              className="form-control mb-3"
              onChange={handleFileChange}
              required
            />

            <button className="btn btn-primary w-100">
              Share Notes
            </button>

          </form>

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ShareNotes;