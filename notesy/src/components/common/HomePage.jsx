import "../../css/homepage.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header2 from "./Header2";


export default function HomePage() {
  const navigate = useNavigate();




  return (
    <>
      <Header2 />

      <div className="home">

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">

            <h1>
              Transform Your Notes with <span>AI</span>
            </h1>

            <p className="subtitle">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              Summarize. Understand. Listen. Share.
            </p>

            <p className="desc">
              Notesy helps you convert long notes into smart summaries with
              keywords and audio — boosting your productivity instantly.
            </p>

            <div className="hero-buttons">
              <button onClick={() => navigate("/userreg")}>
                <i className="fa-solid fa-rocket"></i> Get Started
              </button>

              <button
                className="secondary"
                onClick={() => navigate("/demoupload")}
              >
                <i className="fa-solid fa-play"></i> Live Demo
              </button>
            </div>
           
      
 

          </div>
        </section>

        {/* FEATURES */}
        <section className="features">

          <div className="card">
            <i className="fa-solid fa-brain"></i>
            <h3>Summarization</h3>
            <p>Convert long notes into short, meaningful summaries.</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-key"></i>
            <h3>Keywords</h3>
            <p>Automatically extract important topics.</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-volume-high"></i>
            <h3>Audio</h3>
            <p>Listen to notes using text-to-speech.</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-share-nodes"></i>
            <h3>Sharing</h3>
            <p>Share notes securely with other users.</p>
          </div>

        </section>

        {/* ABOUT */}
        <section className="about">
          <h2><i className="fa-solid fa-circle-info"></i> About Notesy</h2>
          <p>
            Notesy is an AI-powered platform designed to simplify how users
            interact with large notes. It generates summaries, extracts key
            points, and converts text into audio for smarter learning.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="how">
          <h2><i className="fa-solid fa-gears"></i> How It Works</h2>

          <div className="steps">

            <div>
              <i className="fa-solid fa-upload"></i>
              <h3>1. Upload Notes</h3>
              <p>Paste or upload your notes.</p>
            </div>

            <div>
              <i className="fa-solid fa-robot"></i>
              <h3>2. AI Processing</h3>
              <p>AI generates summaries & keywords.</p>
            </div>

            <div>
              <i className="fa-solid fa-headphones"></i>
              <h3>3. Listen & Share</h3>
              <p>Listen or share your notes easily.</p>
            </div>

          </div>
        </section>

        {/* DASHBOARD PREVIEW */}
        <section className="preview">
          <h2><i className="fa-solid fa-display"></i> Smart Dashboard Experience</h2>
          <p>See how Notesy transforms your notes instantly</p>

          <div className="preview-box">
            <div className="fake-ui">
              <p><strong>Input:</strong> Long paragraph notes...</p>
              <hr />
              <p><strong>Output:</strong> Short summarized content with key points...</p>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="why">
          <h2><i className="fa-solid fa-star"></i> Why Choose Notesy?</h2>

          <div className="why-grid">
            <div><i className="fa-solid fa-clock"></i> Saves Time</div>
            <div><i className="fa-solid fa-brain"></i> AI Powered</div>
            <div><i className="fa-solid fa-bolt"></i> Easy to Use</div>
            <div><i className="fa-solid fa-shield-halved"></i> Secure Sharing</div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Start using Notesy today</h2>
          <button onClick={() => navigate("/userreg")}>
            <i className="fa-solid fa-user-plus"></i> Create Account
          </button>
           <button onClick={() => window.open("public/notesy - Google Chrome 2026-04-12 09-15-55.mp4")} style={{marginTop:"10px"}}> Watch Demo </button>
        </section>

       

        <Footer />
      </div>
    </>
  );
}