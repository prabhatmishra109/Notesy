

import React from 'react'

function FetchFeedbackDetails({ feedArray }) {

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <span>
        {[...Array(totalStars)].map((_, i) => (
          <span
            key={i}
            style={{
              color: i < rating ? "#ffc107" : "#e4e5e9",
              fontSize: "18px",
              marginRight: "2px"
            }}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  if (!feedArray) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading feedback...
      </h3>
    );
  }

  return (
    <div style={{ background: "#f4f7fb", minHeight: "100vh", padding: "50px 0" }}>
      <div className="container">

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontWeight: "800", color: "#222" }}>
            Student Experiences ✈️
          </h1>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #0d6efd, #00c6ff)",
              margin: "10px auto",
              borderRadius: "10px"
            }}
          ></div>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Real reviews from happy Student Researcher Teacher
          </p>
        </div>

        {/* Cards */}
        <div className="row">
          {(feedArray || []).map((fobj, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "20px",
                  padding: "25px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  transition: "all 0.35s ease",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0px) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
                }}
              >

                {/* Top gradient strip */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "5px",
                    background: "linear-gradient(90deg, #0d6efd, #00c6ff)"
                  }}
                ></div>

                {/* User Info */}
                <div style={{ marginBottom: "15px" }}>
                  <div style={{ fontWeight: "700", fontSize: "18px", color: "#222" }}>
                    {fobj.user?.name || fobj.email || "Unknown User"}
                  </div>
                  <div style={{ fontSize: "13px", color: "#888" }}>
                    ✔ Verified Student
                  </div>
                </div>

                {/* ⭐ Rating Label */}
                <div style={{ marginBottom: "15px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#0d6efd" }}>
                    ⭐ Notes Summarize Score
                  </div>
                  {renderStars(fobj.rating || 0)}
                </div>

                {/* 💬 Review Label */}
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#0d6efd", marginBottom: "5px" }}>
                    💬 Experience Note
                  </div>

                  <div
                    style={{
                      background: "#f8f9fa",
                      padding: "15px",
                      borderRadius: "12px",
                      fontStyle: "italic",
                      color: "#444",
                      position: "relative"
                    }}
                  >
                    <span style={{ fontSize: "30px", color: "#0d6efd", position: "absolute", top: "-10px", left: "10px" }}>
                      “
                    </span>
                    <p style={{ marginTop: "10px", fontSize: "14px" }}>
                      {fobj.review || "No review provided"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FetchFeedbackDetails