import React from "react";
import { motion } from "framer-motion";
import ChromaGrid from "./ChromaGrid";
import "./Videos.css";

const videoData = [
  {
    title: "Masthya Narayan Recreation Center",
    subtitle: "Ad Project | 4K UHD",
    handle: "0:46 Sec",
    image: "/assets/photos/MNRC.png",
    url: "https://www.facebook.com/share/v/1AhTYNQswD/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "Nhega Jatra",
    subtitle: "Personal Project | 1080 HD",
    handle: "1:02 Min",
    image: "/assets/photos/JTR.png",
    url: "https://www.facebook.com/share/v/1K1qAMQyLY/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "SwastiShree Gurukul",
    subtitle: "Commercial | 1080 HD",
    handle: "0:34 Sec",
    image: "/assets/photos/SS.png",
    url: "https://www.tiktok.com/@matshyanarayanrecreation/video/7254529750226504961",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "Machchhegaun Mela",
    subtitle: "Personal | 1080 HD",
    handle: "0:30 Sec",
    image: "/assets/photos/mela.png",
    url: "https://www.tiktok.com/@matshyanarayanrecreation/video/7259313392286960914",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "Anil Gurung’s Project",
    subtitle: "Personal | 1080 HD",
    handle: "0:45 Sec",
    image: "/assets/photos/AG.png",
    url: "https://www.instagram.com/reel/C1wr59Ht2Yh/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  }
];

const Videos = ({ onClose }) => {
  return (
    <div className="videos-modal-overlay">
      <motion.div
        className="videos-modal-window"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="videos-modal-header">
          <span className="videos-title glitch-text">🎬 Video Projects</span>
          <div className="window-controls">
            <button className="window-btn yellow" />
            <button className="window-btn green" />
             <button className="window-btn red" onClick={onClose} />
          </div>
        </div>

        <p className="videos-description">Click a card to watch the video.</p>

        <div className="grid-scroll-area">
          <ChromaGrid 
            items={videoData} 
            columns={3} 
            radius={250} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Videos;