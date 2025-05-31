import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlayerPage() {
  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [videoSrc, setVideoSrc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get video URL from localStorage
    const savedVideoSrc = localStorage.getItem("videoSrc");
    if (savedVideoSrc) {
      setVideoSrc(savedVideoSrc);
    } else {
      // If no video found, redirect to home page
      navigate("/");
    }
  }, [navigate]);

  function changeSpeed(e) {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  }

  function goBackToUpload() {
    // Clean up the video URL
    if (videoSrc) {
      URL.revokeObjectURL(videoSrc);
      localStorage.removeItem("videoSrc");
    }
    setVideoSrc(null);
    setSpeed(1);
    // Navigate back to home page
    navigate("/");
  }

  if (!videoSrc) {
    return (
      <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400">Loading video...</p>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-bold text-5xl mb-4 text-white tracking-tight">
            Video Player
          </h1>
          <p className="text-lg text-gray-400 font-light">
            Control your video playback speed
          </p>
        </div>

        {/* Video Player Section */}
        <div className="flex flex-col items-center space-y-8">
          {/* Video Container */}
          <div className="video-container">
            <video
              ref={videoRef}
              className="w-full h-auto border-2 border-gray-600 rounded-2xl shadow-2xl bg-black"
              src={videoSrc}
              controls
              style={{ maxHeight: "70vh" }}
            />
          </div>

          {/* Speed Controls */}
          <div className="modern-card p-8 w-full max-w-md">
            <div className="flex flex-col items-center space-y-6">
              <h3 className="text-2xl font-semibold text-white">
                Speed Control
              </h3>
              <div className="flex items-center space-x-6 w-full">
                <span className="text-gray-400 text-sm font-mono">0.25x</span>
                <input
                  value={speed}
                  onChange={changeSpeed}
                  className="flex-1 slider focus-ring"
                  type="range"
                  min={0.25}
                  max={3}
                  step={0.25}
                />
                <span className="text-gray-400 text-sm font-mono">3.00x</span>
              </div>
              <div className="text-center">
                <p className="text-lg text-white font-medium">
                  Current speed: <span className="font-mono">{speed}x</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={goBackToUpload}
              className="modern-button px-8 py-3 rounded-xl text-lg"
            >
              ← Upload New Video
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-12">
        <div className="text-gray-500">
          <span>Made by: </span>
          <span className="text-white font-semibold">Dawidekk</span>
        </div>
      </footer>
    </main>
  );
}

export default PlayerPage;
