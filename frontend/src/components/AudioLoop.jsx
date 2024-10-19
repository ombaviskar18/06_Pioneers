import React, { useEffect, useRef } from "react";
import Ms from "../assets/bg_ms.mp3";

const AudioLoop = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src={Ms} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioLoop;
