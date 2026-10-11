import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
 import Swal from "sweetalert2";
function PaymentPage() {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const price = 999;

  const upiId = "6392147312@ptyes";
  const name = "Notesy App";

  const getUPILink = () => {
    return `upi://pay?pa=${upiId}&pn=${name}&am=${price}&cu=INR`;
  };

  // ✅ FIXED FUNCTION
  const handlePaymentDone = async () => {
  const email = localStorage.getItem("adminEmail");

  try {
    await axios.post(
      `http://localhost:8080/user/activate999/${email}`
    );

    localStorage.setItem("premium", "true");
    localStorage.setItem("userPlan", "PREMIUM");

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 600);

    localStorage.setItem("expiry", expiry.toISOString());

    Swal.fire("Success", "999 Plan Activated 🚀", "success");

    navigate("/upload");

  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Payment activation failed", "error");
  }
};
useEffect(() => {
  const email = localStorage.getItem("adminEmail");

  if (!email) {
    // Agar email hi nahi hai, toh payment page dikhao ya login pe bhejo
    return;
  }

  // Sirf Server se check karo ki user premium hai ya nahi
  axios.get(`http://localhost:8080/user/checkPlan/${email}`)
    .then((res) => {
      // ✅ Sirf res.data.valid check karo
      if (res.data.valid === true) {
        
        // Local storage ko bhi server ke sath sync kar do
        localStorage.setItem("premium", "true");
        localStorage.setItem("userPlan", "PREMIUM");

        Swal.fire({
          title: "Already Premium 🚀",
          text: "You already have access. Redirecting...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate("/upload");
        }, 2000);
      } else {
        // ❌ Agar server mana kar de, toh local storage saaf karo
        localStorage.setItem("premium", "false");
        localStorage.setItem("userPlan", "FREE");
      }
    })
    .catch((err) => {
      console.log("Error checking plan:", err);
    });

}, [navigate]);
const handlePaymentClick = () => {
  if (localStorage.getItem("userPlan") === "PREMIUM") {
    Swal.fire("Already Upgraded 🚀", "Use your premium features", "info");
    navigate("/upload");
    return;
  }

  setShowQR(true);
};
  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>🚀 Premium Plan</h1>
        <h2 style={styles.price}>₹999 / 6 Months</h2>

        <div style={styles.features}>
          <p>📄 All File Support (PDF, DOCX, TXT, PPT)</p>
          <p>🖼️ Image OCR (Hindi + English)</p>
          <p>🎧 Audio → Text (Speech-to-Text)</p>
          <p>🎥 Video → Notes Conversion</p>
          <p>🤖 Smart AI Summarization</p>
          <p>⚡ Fast Processing</p>
          <p>📤 Share & Receive Notes</p>
          <p>🎧 Audio Summary Download</p>
          <p>📊 Structured Notes</p>
          <p>🔐 Secure Storage</p>
        </div>

        {!showQR ? (
          <button style={styles.buyBtn} onClick={() => setShowQR(true)}>
            Buy Now 🚀
          </button>
        ) : (
          <div style={styles.qrBox}>

            <h3 style={{ color: "#424874" }}>
              Scan & Pay ₹{price}
            </h3>

            <QRCodeCanvas value={getUPILink()} size={220} />

            <p style={{ marginTop: "10px", color: "#424874" }}>
              Pay using GPay / PhonePe / Paytm
            </p>

            <button style={styles.payBtn} onClick={handlePaymentDone}>
              I Have Paid ✔
            </button>

            <button style={styles.backBtn} onClick={() => setShowQR(false)}>
              Back
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F4EEFF",
    padding: "20px",
    fontFamily: "Arial"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#DCD6F7",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    border: "2px solid #A6B1E1"
  },

  title: {
    marginBottom: "10px",
    color: "#424874"
  },

  price: {
    color: "#424874",
    marginBottom: "20px"
  },

  features: {
    textAlign: "left",
    marginBottom: "20px",
    lineHeight: "1.8",
    fontSize: "14px",
    color: "#424874"
  },

  buyBtn: {
    width: "100%",
    padding: "12px",
    background: "#424874",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer"
  },

  qrBox: {
    marginTop: "20px"
  },

  payBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "#A6B1E1",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  backBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#424874",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

export default PaymentPage;