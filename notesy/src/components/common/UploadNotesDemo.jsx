import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import worker from "pdfjs-dist/legacy/build/pdf.worker?url";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
import Swal from "sweetalert2";

import "../../css/uploadnotes.css"

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

function UploadNotesDemo() {

  const navigate = useNavigate();
  const email = localStorage.getItem("adminEmail");

  const [data, setData] = useState({
    email: email,
    title: "",
    notes: ""
  });

  //////////////////////////////////////////////////
  // FILE READER (ALL FORMAT)
  //////////////////////////////////////////////////

  const readFile = async (event) => {

    const file = event.target.files[0];
    if (!file) return;

    try {

      ////////////////////////////////// TXT
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const text = await file.text();
        setData(prev => ({ ...prev, notes: text }));
      }

      ////////////////////////////////// DOCX
      else if (file.name.endsWith(".docx")) {
        const buffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buffer });
        setData(prev => ({ ...prev, notes: result.value }));
      }

      ////////////////////////////////// PPTX 🔥
 else if (file.name.endsWith(".pptx")) {

  Swal.fire({ title: "Reading PPT...", didOpen: () => Swal.showLoading() });

  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const PPTX = require("pptxjs");
      const pptx = new PPTX();

      const slides = await pptx.parse(e.target.result);

      let text = "";

      slides.forEach((slide, i) => {
        slide.shapes.forEach(shape => {
          if (shape.text) {
            text += shape.text + " ";
          }
        });
      });

      Swal.close();

      // ✅ TEXT MIL GAYA
      if (text.trim().length > 30) {
        setData(prev => ({ ...prev, notes: text }));
      } 
      
      // ❌ TEXT NAHI MILA → fallback
      else {
        Swal.fire({
          icon: "warning",
          title: "No Text Found!",
          text: "This PPT may contain images. Please upload PDF or images for better OCR."
        });
      }

    } catch (err) {
      console.log(err);
      Swal.close();
      alert("PPT read failed");
    }
  };

  reader.readAsArrayBuffer(file);
}

      ////////////////////////////////// IMAGE OCR
      else if (file.type.startsWith("image/")) {

        Swal.fire({ title: "OCR Processing...", didOpen: () => Swal.showLoading() });

        const reader = new FileReader();

        reader.onload = async () => {

          const result = await Tesseract.recognize(reader.result, "eng+hin");
          Swal.close();

          setData(prev => ({ ...prev, notes: result.data.text }));
        };

        reader.readAsDataURL(file);
      }

      ////////////////////////////////// PDF
      else if (file.name.endsWith(".pdf")) {

        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          const pageText = content.items.map(i => i.str).join(" ");
          text += pageText;
        }

        // OCR fallback
        if (text.trim().length < 50) {

          Swal.fire({ title: "OCR on PDF...", didOpen: () => Swal.showLoading() });

          let ocrText = "";

          for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;

            const img = canvas.toDataURL("image/png");

            const result = await Tesseract.recognize(img, "eng+hin");
            ocrText += result.data.text;
          }

          Swal.close();
          setData(prev => ({ ...prev, notes: ocrText }));

        } else {
          setData(prev => ({ ...prev, notes: text }));
        }
      }

      else {
        alert("Unsupported file");
      }

    } catch (err) {
      console.log(err);
      alert("Error reading file");
    }
  };

  //////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////

  const summariseData = (e) => {
    e.preventDefault();

    navigate("/demopage", {
      state: { notesData: data }
    });
  };

  //////////////////////////////////////////////////
 return (
  <>
  

    <div className="upload-page" style={{marginTop:"60px"}}>
      <h2 className="upload-title">Upload Notes</h2>

      <div className="upload-container">
        
        {/* LEFT FORM */}
        <form className="upload-form" onSubmit={summariseData}>

          <label>Email</label>
          <input value={data.email} readOnly className="upload-input" />

          <label>Title</label>
          <input
            placeholder="Enter title..."
            name="title"
            required
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="upload-input"
          />

          <label>Upload File</label>
          <input
            type="file"
            accept=".txt,.pdf,.docx,.pptx,image/*"
            onChange={readFile}
            className="upload-file"
          />

          <button className="upload-btn">Upload & Summarize</button>
        </form>

        {/* RIGHT PREVIEW */}
        <div className="upload-preview">
          <h4>Preview</h4>
          <div className="preview-content">
            {data.notes || "Your extracted notes will appear here..."}
          </div>
        </div>

      </div>
    </div>
  </>
);
}

export default UploadNotesDemo;