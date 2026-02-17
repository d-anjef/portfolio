import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import './Hero.css';

// Floating icon component for 3D background
function FloatingIcon({ position, scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;
      
      meshRef.current.rotation.x = mouseY * 0.1 + state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = mouseX * 0.1 + state.clock.elapsedTime * 0.15;
    }
  });

  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// 3D Background Scene
function Scene({ activeView }) {
  const icons = [
    { pos: [-4, 2, 0], scale: 0.8 },
    { pos: [-3, -1, -1], scale: 0.6 },
    { pos: [4, 2, 0], scale: 0.8 },
    { pos: [3, -1, -1], scale: 0.6 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {icons.map((icon, i) => (
        <FloatingIcon key={i} position={icon.pos} scale={icon.scale} />
      ))}
    </>
  );
}

export default function Hero({ onOpenProjects, onOpenVideos }) {
  const [activeView, setActiveView] = useState('split'); // 'split', 'developer', 'designer'

  const handleClick = (side) => {
    if (activeView === side) {
      setActiveView('split');
    } else {
      setActiveView(side);
    }
  };

  // Handle developer projects button click
  const handleDeveloperProjects = (e) => {
    e.stopPropagation(); // Prevent triggering the side click
    if (onOpenProjects) {
      onOpenProjects();
    }
  };

  // Handle designer projects button click
  const handleDesignerProjects = (e) => {
    e.stopPropagation(); // Prevent triggering the side click
    if (onOpenVideos) {
      onOpenVideos();
    }
  };

  return (
    <div className="hero-container">
      {/* Three.js Canvas Background */}
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Scene activeView={activeView} />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className={`hero-content view-${activeView}`}>
        
        {/* Developer Side */}
        <div 
          className={`side developer-side ${activeView === 'developer' ? 'active' : ''} ${activeView === 'designer' ? 'hidden' : ''}`}
          onClick={() => handleClick('developer')}
        >
          <h1 className="main-title developer-title">Developer</h1>
          
          {/* Show subtitles in both split and expanded view */}
          {(activeView === 'split' || activeView === 'developer') && (
            <div className="subtitle-list developer-subtitles">
              <p className="subtitle">Full Stack Developer</p>
              <p className="subtitle">FrontEnd Developer</p>
            </div>
          )}
          
          {activeView === 'developer' && (
            <button className="projects-btn developer-projects" onClick={handleDeveloperProjects}>
              PROJECTS
            </button>
          )}
          
          {activeView === 'split' && (
            <button className="projects-btn developer-projects-split" onClick={handleDeveloperProjects}>
              PROJECTS
            </button>
          )}
        </div>

        {/* Designer Side */}
        <div 
          className={`side designer-side ${activeView === 'designer' ? 'active' : ''} ${activeView === 'developer' ? 'hidden' : ''}`}
          onClick={() => handleClick('designer')}
        >
          <h1 className="main-title designer-title">Creatives</h1>
          
          {/* Show subtitles in both split and expanded view */}
          {(activeView === 'split' || activeView === 'designer') && (
            <div className="subtitle-list designer-subtitles">
              <p className="subtitle">UI / UX Designer</p>
              <p className="subtitle">Photographer | Video </p>
            </div>
          )}
          
          {activeView === 'designer' && (
            
            <button className="projects-btn designer-projects" onClick={handleDesignerProjects}>
              PROJECTS
            </button>
          )}
          
          {activeView === 'split' && (
            <button className="projects-btn designer-projects-split" onClick={handleDesignerProjects}>
              PROJECTS
            </button>
          )}
        </div>

        {/* Portrait */}
        <div className={`portrait-wrapper view-${activeView}`}>
          {/* Split View */}
          {activeView === 'split' && (
            <div className="portrait-split-container">
              <img 
                src="/assets/photos/dev.png"
                alt="Developer" 
                className="portrait-half-img developer-img"
              />
              <img 
                src="/assets/photos/designer.png"
                alt="Designer" 
                className="portrait-half-img designer-img"
              />
            </div>
          )}
          
          {/* Developer Full View */}
          {activeView === 'developer' && (
            <div className="portrait-full-container">
              <img 
                src="/assets/photos/dev.png" 
                alt="Developer" 
                className="portrait-full-img"
              />
            </div>
          )}
          
          {/* Designer Full View */}
          {activeView === 'designer' && (
            <div className="portrait-full-container">
              <img 
                src="/assets/photos/designer.png" 
                alt="Designer" 
                className="portrait-full-img"
              />
            </div>
          )}
        </div>

        {/* Developer Icons - Split View - WITH 5% GAP */}
        {activeView === 'split' && (
          <div className="icons-developer-split">
            {/* Top curve */}
            <div className="icon-item" style={{ top: '26%', left: '29.5%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" alt="GitLab" />
            </div>
            
            {/* Upper left curve */}
            <div className="icon-item" style={{ top: '32%', left: '24.2%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
            </div>
            <div className="icon-item" style={{ top: '39%', left: '19.8%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
            </div>
            
            {/* Left side vertical */}
            <div className="icon-item" style={{ top: '47%', left: '17.6%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
            </div>
            <div className="icon-item" style={{ top: '55%', left: '17.6%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" />
            </div>
            <div className="icon-item" style={{ top: '62%', left: '19.05%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" />
            </div>
            
            {/* Bottom left curve */}
            <div className="icon-item" style={{ top: '68%', left: '22.5%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
            </div>
            <div className="icon-item" style={{ top: '74%', left: '26.75%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            </div>
            
            {/* Inner curve (closer to center) */}
            <div className="icon-item" style={{ top: '34%', left: '33%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
            </div>
            <div className="icon-item" style={{ top: '42%', left: '28.45%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
            </div>
            <div className="icon-item" style={{ top: '50%', left: '25.75%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" />
            </div>
            <div className="icon-item" style={{ top: '58%', left: '24.9%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
            </div>
            <div className="icon-item" style={{ top: '65%', left: '27.6%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" />
            </div>
            <div className="icon-item" style={{ top: '71%', left: '32%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />
            </div>
          </div>
        )}

        {/* Designer Icons - Split View - WITH 5% GAP */}
        {activeView === 'split' && (
          <div className="icons-designer-split">
            {/* Top right */}
            <div className="icon-item" style={{ top: '26%', right: '27.75%' }}>
              <svg viewBox="0 0 24 24" fill="#1769FF" width="100%" height="100%">
                <rect width="24" height="24" rx="4" fill="#1769FF"/>
                <text x="12" y="17" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Be</text>
              </svg>
            </div>
            
            {/* Upper right curve */}
            <div className="icon-item" style={{ top: '33%', right: '22.35%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Photoshop" />
            </div>
            <div className="icon-item" style={{ top: '41%', right: '18.8%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
            </div>
            
            {/* Right side vertical */}
            <div className="icon-item" style={{ top: '49%', right: '17.1%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" alt="After Effects" />
            </div>
            <div className="icon-item" style={{ top: '57%', right: '17.1%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" alt="Illustrator" />
            </div>
            <div className="icon-item" style={{ top: '64%', right: '19.05%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" alt="Adobe XD" />
            </div>
            
            {/* Bottom right curve */}
            <div className="icon-item" style={{ top: '70%', right: '23.35%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <circle cx="12" cy="12" r="10" fill="#31A8FF"/>
                <path d="M7 5h2v10h5v2H7V5z" fill="#001E36"/>
                <path d="M15 11h2v2h-2v-2zm0-4h2v2h-2V7z" fill="#001E36"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '76%', right: '27.6%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="WordPress" />
            </div>
            
            {/* Inner curve (closer to center) */}
            <div className="icon-item" style={{ top: '37%', right: '28.45%' }}>
              <svg viewBox="0 0 24 24" fill="#9999FF" width="100%" height="100%">
                <rect width="24" height="24" rx="4" fill="#00005B"/>
                <path d="M7 5h5c2.5 0 4 1.5 4 4s-1.5 4-4 4H9v4H7V5zm2 6h3c1.1 0 2-.9 2-2s-.9-2-2-2H9v4z" fill="#9999FF"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '45%', right: '25.75%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '53%', right: '24.9%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <circle cx="12" cy="12" r="10" fill="#000000"/>
                <path d="M12 6l6 6-6 6V6z" fill="#FFFFFF"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '61%', right: '27.6%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Developer Expanded Icons - WITH 5% GAP */}
        {activeView === 'developer' && (
          <div className="icons-developer-expanded">
            <div className="icon-item" style={{ top: '18%', right: '35.7%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
            </div>
            <div className="icon-item" style={{ top: '25%', right: '29.6%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
            </div>
            <div className="icon-item" style={{ top: '33%', right: '24.2%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
            </div>
            <div className="icon-item" style={{ top: '42%', right: '20.35%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
            </div>
            <div className="icon-item" style={{ top: '51%', right: '18.45%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
            </div>
            <div className="icon-item" style={{ top: '60%', right: '20.35%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
            </div>
            <div className="icon-item" style={{ top: '68%', right: '25.05%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
            </div>
            <div className="icon-item" style={{ top: '75%', right: '31.15%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            </div>
            <div className="icon-item" style={{ top: '37%', right: '30.3%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" />
            </div>
            <div className="icon-item" style={{ top: '46%', right: '26.75%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />
            </div>
            <div className="icon-item" style={{ top: '55%', right: '24.05%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" />
            </div>
            <div className="icon-item" style={{ top: '64%', right: '28.45%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" />
            </div>
            <div className="icon-item" style={{ top: '28%', right: '33%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" alt="GitLab" />
            </div>
            <div className="icon-item" style={{ top: '81%', right: '26.75%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" />
            </div>
          </div>
        )}

        {/* Designer Expanded Icons - FIXED POSITIONS */}
        {activeView === 'designer' && (
          <div className="icons-designer-expanded">
            <div className="icon-item" style={{ top: '20%', left: '16%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
            </div>
            <div className="icon-item" style={{ top: '27%', left: '11%' }}>
              <svg viewBox="0 0 24 24" fill="#1769FF" width="100%" height="100%">
                <rect width="24" height="24" rx="4" fill="#1769FF"/>
                <text x="12" y="17" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Be</text>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '35%', left: '7%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Photoshop" />
            </div>
            <div className="icon-item" style={{ top: '44%', left: '5%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" alt="After Effects" />
            </div>
            <div className="icon-item" style={{ top: '53%', left: '6%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" alt="Illustrator" />
            </div>
            <div className="icon-item" style={{ top: '62%', left: '9%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" alt="Adobe XD" />
            </div>
            <div className="icon-item" style={{ top: '70%', left: '13%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '77%', left: '19%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '39%', left: '12%' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="WordPress" />
            </div>
            <div className="icon-item" style={{ top: '48%', left: '14%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <circle cx="12" cy="12" r="10" fill="#31A8FF"/>
                <path d="M7 5h2v10h5v2H7V5z" fill="#001E36"/>
                <path d="M15 11h2v2h-2v-2zm0-4h2v2h-2V7z" fill="#001E36"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '57%', left: '16%' }}>
              <svg viewBox="0 0 24 24" fill="#9999FF" width="100%" height="100%">
                <rect width="24" height="24" rx="4" fill="#00005B"/>
                <path d="M7 5h5c2.5 0 4 1.5 4 4s-1.5 4-4 4H9v4H7V5zm2 6h3c1.1 0 2-.9 2-2s-.9-2-2-2H9v4z" fill="#9999FF"/>
              </svg>
            </div>
            <div className="icon-item" style={{ top: '66%', left: '19%' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <circle cx="12" cy="12" r="10" fill="#000000"/>
                <path d="M12 6l6 6-6 6V6z" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>
        )}

        {/* Dividing Line (only in split view) */}
        {activeView === 'split' && <div className="dividing-line"></div>}
      </div>
    </div>
  );
}