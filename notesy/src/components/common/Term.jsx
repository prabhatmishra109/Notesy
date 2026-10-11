import React from "react";
import "../../css/term.css"
import Footer from "./Footer";
import Header2 from "./Header2";



function Terms() {
  return (
    <>
     <Header2/>

      <div className="terms-container">
        <div className="terms-card">

          <h1>Terms & Conditions</h1>
          <p className="last-updated">Last Updated: 2026</p>

          <section>
            <h3>1. Introduction</h3>
            <p>
              Welcome to Notesy, an AI-powered platform for summarizing and sharing notes. 
              By using our services, you agree to these terms and conditions.
            </p>
          </section>

          <section>
            <h3>2. User Responsibilities</h3>
            <p>
              Users must provide accurate information and are responsible for maintaining 
              the confidentiality of their accounts.
            </p>
          </section>

          <section>
            <h3>3. Content Usage</h3>
            <p>
              Uploaded notes must not contain illegal, harmful, or copyrighted content 
              without permission. Users are responsible for their uploaded data.
            </p>
          </section>

          <section>
            <h3>4. AI Processing</h3>
            <p>
              Notesy uses AI to generate summaries. While we aim for accuracy, results 
              may not always be perfect.
            </p>
          </section>

          <section>
            <h3>5. Privacy</h3>
            <p>
              User data is stored securely and is not shared without consent, except 
              where required by law.
            </p>
          </section>

          <section>
            <h3>6. Termination</h3>
            <p>
              We reserve the right to suspend or terminate accounts that violate 
              our terms.
            </p>
          </section>

          <section>
            <h3>7. Changes to Terms</h3>
            <p>
              These terms may be updated at any time. Continued use of the platform 
              means acceptance of the updated terms.
            </p>
          </section>

        </div>
      </div>
<Footer/>
    </>
  );
}

export default Terms;