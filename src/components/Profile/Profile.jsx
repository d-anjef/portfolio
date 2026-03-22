import React from 'react';
import './Profile.css';
import Lanyard from './Lanyard';
import TextType from './TextType'; // Adjust path if necessary

const Profile = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const bioText = "A passionate Web Developer focused on creating engaging and dynamic web applications. If you're looking to build something amazing for the web, whether it's a new application or collaborating on an existing project, feel free to reach out. Let's connect and develop something incredible together! Beyond the world of code, I'm also a creative professional with a keen eye for photography and videography. I love merging technical skills with artistic vision, and I'm proficient in the Adobe Creative Suite, including Premiere Pro for video editing, color grading, and motion graphics. Whether it's capturing stunning visuals or bringing stories to life through video, I'm always eager to explore new creative ventures.";

  return (
    <div className="profile-modal-overlay">
      <div className="profile-popup-window">
        {/* Header Bar */}
        <div className="profile-header">
          <div className="header-left">
            <span className="window-icon">👤</span>
            <span className="heading-name">Profile.exe</span>
          </div>
          <div className="profile-window-controls">
            <button className="window-button window-minimize" />
            <button className="window-button window-maximize" />
            <button className="window-button window-close" onClick={onClose} />
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-window-content">
          <div className="content-layout">
            
            {/* Left: 3D Lanyard Column */}
            <div className="lanyard-column">
              <Lanyard />
            </div>

            {/* Right: Text Description Column */}
            <div className="description-column">
              <div className="text-wrapper">
                <span className="intro-badge">
                  <TextType 
                    text="Let me introduce myself." 
                    typingSpeed={70} 
                    showCursor={false} 
                    loop={false} 
                  />
                </span>
                
                <h1 className="main-titles">
                  <TextType 
                    text="Hey ! It's me Anjef Dangol. " 
                    typingSpeed={40} 
                    initialDelay={1500} 
                    loop={false}
                  />
                </h1>
                
                <div className="about-content">
                  <TextType 
                    text={bioText}
                    typingSpeed={20}
                    initialDelay={3000}
                    loop={false}
                    className="about-paragraph"
                    cursorCharacter="_"
                  />
                </div>

                <div className="contact-hint">
                  {/* Subtle hint for interactivity */}
                  <span className="hint-text">Explore : Try dragging the card!</span><br></br>
                  <br></br>
                  <div>
                  {/* Download Resume */}
            <a href="/assets/AnjefCV.pdf" download className="download-resume">
              📄 Download Resume
            </a>
            </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;