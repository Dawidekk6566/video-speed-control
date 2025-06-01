import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlayerPage() {
  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [videoSrc, setVideoSrc] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
  async function downloadVideoWithSpeed() {
    if (!videoRef.current || !videoSrc) return;

    setIsProcessing(true);

    try {
      // Get the original video file from localStorage
      const originalVideoSrc = localStorage.getItem("videoSrc");
      if (!originalVideoSrc) {
        throw new Error("Original video not found");
      }

      // Create a filename that indicates the selected speed
      const speedText = speed === 1 ? "original" : `${speed}x_speed`;
      const fileName = `video_${speedText}.mp4`;

      // Fetch the blob from the URL
      const response = await fetch(originalVideoSrc);
      const blob = await response.blob();

      // Create download link
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Error downloading video. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      {" "}
      {/* Top Right Buttons - Fixed to very corner */}
      <div className="fixed top-4 right-4 z-50 flex space-x-3">
        <button
          onClick={downloadVideoWithSpeed}
          disabled={isProcessing}
          className="green-button px-4 py-2 rounded-lg text-sm"
        >
          {isProcessing ? "Processing..." : "↓ Download Video"}
        </button>
        <button
          onClick={goBackToUpload}
          className="white-button px-4 py-2 rounded-lg text-sm"
        >
          ← Upload New Video
        </button>
      </div>
      <div className="w-full py-8">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="font-bold text-5xl mb-4 text-white tracking-tight">
            Edit Your Video
          </h1>
          <p className="text-lg text-gray-400 font-light">
            Control your video playback speed
          </p>
        </div>{" "}
        {/* Video Player Section */}
        <div className="flex flex-col items-center space-y-8 px-4">
          {/* Video Container */}
          <div className="video-container w-full max-w-6xl">
            <video
              controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
              disablePictureInPicture
              ref={videoRef}
              className="w-full h-auto border-2 border-gray-600 rounded-2xl shadow-2xl bg-black"
              src={videoSrc}
              controls
              style={{ maxHeight: "50vh" }}
            />
          </div>
          {/* Speed Controls */}
          <div className="modern-card m-6 p-8 w-full max-w-md">
            <div className="flex flex-col items-center space-y-6">
              <h3 className="text-2xl font-semibold text-white">
                Speed Control
              </h3>
              <div className="flex items-center space-x-6 w-full">
                <span className="text-gray-400 text-sm font-mono">0.25x</span>
                <input
                  value={speed}
                  onChange={changeSpeed}
                  className="flex-1 modern-slider"
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
        </div>
      </div>
    </main>
  );
}

export default PlayerPage;
