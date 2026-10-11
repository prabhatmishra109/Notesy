import React from "react";
import { Link } from "react-router-dom";
import "../../css/footer.css";

function Footer() {
  return (
    
    <footer className="footer">

      <div className="footer-glass">

        <div className="footer-top">

          {/* Brand */}
          <div className="footer-section">
            <h2 className="footer-logo">
              <i className="fa-solid fa-book-open"></i> NOTESY
            </h2>
            <p>
              Smart academic notes platform designed for modern students.
              Organize, share and grow with Notesy.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-section">
            <h3>
              <i className="fa-solid fa-compass"></i> Explore
            </h3>
            <ul>
              <li><Link to="/homepage"><i className="fa-solid fa-house"></i> Home</Link></li>
              <li><Link to="/userLogin"><i className="fa-solid fa-book"></i> Notes</Link></li>
              <li><Link to="/about"><i className="fa-solid fa-circle-info"></i> About</Link></li>
              <li><Link to="/contact"><i className="fa-solid fa-envelope"></i> Contact</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="footer-section">
            <h3>
              <i className="fa-solid fa-user"></i> Account
            </h3>
            <ul>
              <li><Link to="/userLogin"><i className="fa-solid fa-right-to-bracket"></i> Login</Link></li>
              <li><Link to="/userreg"><i className="fa-solid fa-user-plus"></i> Register</Link></li>
              <li><Link to="/privacy"><i className="fa-solid fa-shield-halved"></i> Privacy Policy</Link></li>
              <li><Link to="/term"><i className="fa-solid fa-shield-halved"></i>Term&Condition</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3>
              <i className="fa-solid fa-paper-plane"></i> Subscribe
            </h3>
            <p>Get latest updates & notes alerts.</p>

            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-github"></i>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 NOTESY | Designed by Prabhat Mishra | Final Year Project
        </div>

      </div>
    </footer>
  );
}

export default Footer;