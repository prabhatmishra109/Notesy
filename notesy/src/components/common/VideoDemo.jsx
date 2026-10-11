import { useEffect, useRef, useState } from "react";
import "../../css/videodemo.css"

export default function VideoDemo() {
  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(1.25);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  return (
    <div className="video-page">

      {/* Header */}
      <div className="video-header">
        <h2>🎬 Notesy Demo</h2>
        <button onClick={() => window.close()}>❌ Close</button>
      </div>

      {/* Video */}
      <div className="video-container">
        <video
          ref={videoRef}
          controls
          autoPlay
          className="video-player"
        >
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Controls */}
      <div className="controls">
        <span>Speed:</span>

        <button onClick={() => setSpeed(1)}>1x</button>
        <button onClick={() => setSpeed(1.25)}>1.25x</button>
        <button onClick={() => setSpeed(1.5)}>1.5x</button>
        <button onClick={() => setSpeed(2)}>2x</button>
      </div>

    </div>
  );
}