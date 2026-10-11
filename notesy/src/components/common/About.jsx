import React from "react";
import { motion } from "framer-motion";
import "../../css/style.css";
import "../../css/about.css";
import login from "../../assets/login.jpg";
import Header2 from "./Header2";
import Footer from "./Footer";

function About() {
  return (
    <>
      <Header2 />

      <div className="about-main container-fluid" style={{ marginTop: "70px" }}>

        {/* Title */}
        <motion.h1
          className="text-center about-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-book-open me-3"></i>
          About Notesy AI
        </motion.h1>

        {/* Intro Section */}
        <motion.p
          className="text-center about-desc mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Notesy is an AI-powered platform that helps users upload, summarize,
          and share notes efficiently. It enhances productivity through smart
          summarization, keyword extraction, and audio learning features.
        </motion.p>

        {/* Features Section */}
        <div className="row mt-5 text-center">

          <div className="col-md-3 mb-4">
            <div className="feature-box">
              <i className="fas fa-brain"></i>
              <h5>AI Summarization</h5>
              <p>Generate smart summaries from long notes instantly.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="feature-box">
              <i className="fas fa-key"></i>
              <h5>Keyword Extraction</h5>
              <p>Automatically highlight important keywords.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="feature-box">
              <i className="fas fa-volume-up"></i>
              <h5>Audio Learning</h5>
              <p>Convert notes into speech for better understanding.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="feature-box">
              <i className="fas fa-share-alt"></i>
              <h5>Easy Sharing</h5>
              <p>Share summarized notes with other users securely.</p>
            </div>
          </div>

        </div>

        {/* Vision Mission Goal */}
        <div className="row justify-content-center mt-5">

          <div className="col-md-4 mb-4">
            <motion.div className="card-custom text-center p-4" whileHover={{ scale: 1.05 }}>
              <i className="fas fa-eye icon-style"></i>
              <h4 className="mt-3">Vision</h4>
              <p>To revolutionize digital learning using AI-powered solutions.</p>
            </motion.div>
          </div>

          <div className="col-md-4 mb-4">
            <motion.div className="card-custom text-center p-4" whileHover={{ scale: 1.05 }}>
              <i className="fas fa-bullseye icon-style"></i>
              <h4 className="mt-3">Mission</h4>
              <p>To simplify education through intelligent note processing.</p>
            </motion.div>
          </div>

          <div className="col-md-4 mb-4">
            <motion.div className="card-custom text-center p-4" whileHover={{ scale: 1.05 }}>
              <i className="fas fa-flag-checkered icon-style"></i>
              <h4 className="mt-3">Goal</h4>
              <p>To enable collaborative and efficient digital learning.</p>
            </motion.div>
          </div>

        </div>

        {/* Developer Section */}
        <div className="row align-items-center mt-5 developer-box p-4">

          <div className="col-md-4 text-center">
            <img src={login} alt="Developer" className="img-fluid profile-img" />
          </div>

          <div className="col-md-8">
            <h3><i className="fas fa-user me-2"></i> Developer</h3>
            <p><i className="fas fa-user-circle me-2"></i><strong>Name:</strong> Prabhat Mishra</p>
            <p><i className="fas fa-envelope me-2"></i><strong>Email:</strong> prabhat@email.com</p>
            <p><i className="fas fa-map-marker-alt me-2"></i><strong>Location:</strong> Uttar Pradesh, India</p>

            <p>
              Final Year BCA Student | Full Stack Developer | AI Enthusiast.
              Passionate about building intelligent web applications using
              React, Spring Boot, and AI technologies.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;