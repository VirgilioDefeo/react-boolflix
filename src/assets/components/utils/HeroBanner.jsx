import React from 'react';
import "./HeroBanner.css";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        src="/public/videos/video.mp4"
      />
      <div className="hero-content">
        <h1>Boolflix in azione</h1>
        <p>Guarda subito il banner video personalizzato!</p>
        <div className="hero-buttons">
          <button className="play">▶ Riproduci</button>
          <button className="info">ℹ Altre info</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
