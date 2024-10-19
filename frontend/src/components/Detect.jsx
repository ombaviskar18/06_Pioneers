import React, { useState } from 'react';
import V2 from "../assets/video2.mp4";

const DetectFraud = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedFile(file);
  }

  const handleDetectActivity = () => {
    // Logic for detecting suspicious activity goes here
    alert('Detecting suspicious activity for: ' + selectedFile.name);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="flex justify-center">
        <video 
          src={V2} 
          loop 
          muted 
          autoPlay
          className="w-full max-w-sm rounded-lg transition-all duration-300 ease-in-out"
        />
      </div>

      <h1 className="text-4xl font-bold mb-6">Fraud_X Detection System</h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md hover:shadow-[0_0_20px_4px_rgba(255,0,0,0.7)]">
        <div className="border-dashed border-2 border-gray-400 p-4 rounded-lg">
          <p className="mb-2">Drag and drop file here</p>
          <p className="text-sm text-gray-500">Limit: 200MB per file • CSV</p>
          <div className="mt-4 flex justify-center">
            <label className="px-4 py-2 glowing-button cursor-pointer">
              Browse files
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {selectedFile && (
          <div className="mt-4">
            <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
              <span>{selectedFile.name}</span>
              <span className="text-sm text-gray-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={handleDetectActivity}
                className="bg-red-800 hover:shadow-[0_0_20px_4px_rgba(255,0,0,0.7)] rounded-3xl text-white font-bold py-2 px-4  transition duration-300"
              >
                Detect Suspicious Activity
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetectFraud;
