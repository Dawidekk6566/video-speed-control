import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function handleVideoUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      // Store video URL in localStorage for the player page
      localStorage.setItem("videoSrc", url);
      // Navigate to the player page
      navigate("/player");
    }
  }

  return (
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

      {/* Upload Section */}
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
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
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
          </label>{" "}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
