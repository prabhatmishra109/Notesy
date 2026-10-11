import React, {  useState } from "react";
import "../../css/help2.css";
import {
  FaUserPlus,
  FaSignInAlt,
  FaUpload,
  FaShareAlt,
  FaDownload,
  FaPlay,
  FaUserShield,
} from "react-icons/fa";
import Header2 from "./Header2";
import Footer from "./Footer";


const Help2 = () => {
  const [active, setActive] = useState("guide");
  const [openFAQ, setOpenFAQ] = useState(null);
 

  


  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Register Account",
      desc: "Sign up using your name, email and password to access Notesy platform.",
    },
    {
      icon: <FaSignInAlt />,
      title: "Login",
      desc: "Login using your registered credentials to open your dashboard.",
    },
    {
      icon: <FaUpload />,
      title: "Upload / Paste Notes",
      desc: "Upload your notes file or paste text. AI will generate summary automatically.",
    },
    {
      icon: <FaPlay />,
      title: "Audio Playback",
      desc: "Listen to summarized notes using text-to-speech feature.",
    },
    {
      icon: <FaShareAlt />,
      title: "Share Notes",
      desc: "Share your notes with other users using their email address securely.",
    },
    {
      icon: <FaDownload />,
      title: "Download Notes",
      desc: "Download summarized notes in PDF or text format for offline use.",
    },
    {
      icon: <FaUserShield />,
      title: "Admin Control",
      desc: "Admin monitors users, feedback and ensures smooth platform operation.",
    },
  ];

  const faqs = [
    {
      q: "How do I register on Notesy?",
      a: "Click on Register → Enter your details → Submit → Now you can login.",
    },
    {
      q: "How can I upload notes?",
      a: "Go to Dashboard → Upload section → Select file or paste notes → Click Submit.",
    },
    {
      q: "How does AI summarization work?",
      a: "Once you upload notes, AI automatically processes and generates a short summary with key points.",
    },
    {
      q: "Can I listen to notes?",
      a: "Yes, click on the Play button to listen to notes using audio playback feature.",
    },
    {
      q: "How to share notes with others?",
      a: "Enter receiver's email → Click Share → They will receive your notes.",
    },
    {
      q: "Can I download notes?",
      a: "Yes, click on Download button to save notes as PDF or text file.",
    },
    {
      q: "What does Admin do?",
      a: "Admin manages users, checks feedback, handles issues and ensures platform security.",
    },
  ];

  return (
    <>
      {/* ✅ Header on top */}
      
<Header2/>
      <div className="help-container " style={{marginTop:"100px"}}>

        {/* Sidebar */}
        <div className="help-sidebar">
          <h2>Help Center</h2>
          <ul>
            <li className={active === "guide" ? "active" : ""} onClick={() => setActive("guide")}>
              User Guide
            </li>
            <li className={active === "faq" ? "active" : ""} onClick={() => setActive("faq")}>
              FAQ
            </li>
            <li className={active === "admin" ? "active" : ""} onClick={() => setActive("admin")}>
              Admin Guide
            </li>
            <button onClick={() => window.open("public/notesy - Google Chrome 2026-04-12 09-15-55.mp4")}> Watch Demo </button>
   
          </ul>
        </div>

       
  
  
        <div className="help-content">

          {/* GUIDE */}
          {active === "guide" && (
            <>
              <h1>How to Use Notesy Platform</h1>

              <div className="card-grid">
                {steps.map((step, i) => (
                  <div className="help-card" key={i}>
                    <div className="icon">{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Extra Detail Section */}
              <div className="extra-info">
                <h2>About Notesy</h2>
                <p>
                  Notesy is an AI-powered platform that helps you summarize, understand,
                  and share notes easily. You can upload notes, generate summaries,
                  listen to them, and collaborate with others.
                </p>
              </div>
            </>
          )}

          {/* FAQ */}
          {active === "faq" && (
            <>
              <h1>Frequently Asked Questions</h1>

              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-item"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <h3>{faq.q}</h3>
                  {openFAQ === i && <p>{faq.a}</p>}
                </div>
              ))}
            </>
          )}

          {/* ADMIN */}
          {active === "admin" && (
            <>
              <h1>Admin Guide</h1>

              <div className="admin-box">
                <ul>
                  <li>View all registered users</li>
                  <li>Monitor system activity</li>
                  <li>Manage feedback and support requests</li>
                  <li>Ensure platform security and performance</li>
                </ul>
              </div>
            </>
          )}

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Help2;