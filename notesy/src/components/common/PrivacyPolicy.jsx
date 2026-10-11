import React from "react";
import "../../css/privacypolicy.css";
import Header2 from "./Header2";
import { FaShieldAlt, FaLock, FaUserCheck, FaDatabase } from "react-icons/fa";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header2 />

      <section className="privacy">
        <div className="container">

          {/* HERO */}
          <div className="privacy-hero" style={{marginTop:"160px"}}>
            <h1>Privacy Policy</h1>
            <p>We value your privacy and ensure your data is protected with modern security standards.</p>
          </div>

          {/* CARDS */}
          <div className="privacy-grid">

            <div className="card">
              <FaDatabase className="icon" />
              <h3>Data Collection</h3>
              <p>
                We collect only essential data like name, email, and notes to provide smart AI features.
              </p>
            </div>

            <div className="card">
              <FaLock className="icon" />
              <h3>Security</h3>
              <p>
                All your data is encrypted and protected using secure APIs and authentication systems.
              </p>
            </div>

            <div className="card">
              <FaUserCheck className="icon" />
              <h3>User Control</h3>
              <p>
                You can manage, delete, or share your data anytime with complete control.
              </p>
            </div>

            <div className="card">
              <FaShieldAlt className="icon" />
              <h3>Usage</h3>
              <p>
                Your data is used only for summarization, AI processing, and improving your experience.
              </p>
            </div>

          </div>

          {/* FOOTER */}
          <div className="privacy-footer">
            <p>© 2026 NOTESY • Built by Prabhat Mishra</p>
          </div>

        </div>
      </section>
      <Footer/>
    </>
  );
}