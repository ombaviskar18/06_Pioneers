import React from 'react';
import V2 from "../assets/video2.mp4";

const DetectFraud = () => {
  return (
    <div className="mt-24 flex flex-col items-center justify-center text-white">
      <div className="flex justify-center">
        <video src={V2} loop muted autoPlay className="w-full max-w-sm rounded-lg transition-all duration-300 ease-in-out" />
      </div>
      <h1 className="text-4xl font-bold mb-6">Fraud_X Detection System</h1>

      <div className="flex justify-center w-full">
  <iframe 
    src="http://localhost:8501/" 
    title="Description of the content"
    className="w-full max-w-7xl h-full rounded-lg border-0 shadow-lg"
    style={{ aspectRatio: '16/9' }} 
  />
</div>

    </div>
  );
}

export default DetectFraud;
