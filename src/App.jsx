import { useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [videoSrc, setVideoSrc] = useState(null);
  const [showUpload, setShowUpload] = useState(true);

  function changeSpeed(e) {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  }

  function handleVideoUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setShowUpload(false);
    }
  }

  function resetVideo() {
    if (videoSrc) {
      URL.revokeObjectURL(videoSrc);
    }
    setVideoSrc(null);
    setShowUpload(true);
    setSpeed(1);
  }

  return (
    <>
      <main className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-bold text-7xl mb-6 text-white tracking-tight">
            Video Speed Control Tool
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Upload your video and control playback speed with precision
          </p>
        </div>

        {showUpload ? (
          /* Upload Section */
          <div className="flex flex-col items-center space-y-8">
            <div className="modern-card p-16 max-w-md">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex flex-col items-center cursor-pointer space-y-6 group"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform">
                  <svg
                    className="w-10 h-10 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-semibold text-white">
                    Choose Video File
                  </h3>
                  <p className="text-sm text-gray-500">
                    Supports MP4, WebM, AVI and more...
                  </p>
                </div>
              </label>
            </div>
          </div>
        ) : (
          /* Video Player Section */
          <div className="flex flex-col items-center space-y-8 w-full max-w-6xl">
            <div className="relative">
              <video
                ref={videoRef}
                className="border-2 border-gray-600 rounded-2xl shadow-2xl max-w-full h-auto"
                width={1000}
                height={600}
                src={videoSrc}
                controls
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

            {/* Reset Button */}
            <button
              onClick={resetVideo}
              className="modern-button px-8 py-3 rounded-xl text-lg"
            >
              Upload New Video
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="absolute bottom-8 text-center">
          <div className="text-gray-500">
            <span>Made by: </span>
            <span className="text-white font-semibold">Dawidekk</span>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
