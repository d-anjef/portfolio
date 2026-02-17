import React, { useState, useEffect, Suspense } from 'react';
import Header from './components/Header/Header';
import Dock from './components/Dock/Dock';
import SocialLinks from './components/SocialLinks/SocialLinks';
import Hero from './components/Hero/Hero';
import ProjectsWindow from './components/Projects/ProjectsWindow';
import Videos from './components/Videos/Videos';
import Contact from './components/Contact/Contact';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Hobbies from './components/Hobbies/Hobbies';
import ErrorBoundary from './components/ErrorBoundary';
import LetterGlitch from './components/LetterGlitch/LetterGlitch';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);

  // Logic for the Percentage Counter
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const increment = Math.floor(Math.random() * 8 + 1);
          return Math.min(prev + increment, 100);
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Main timer to hide loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenProjects = () => {
    setShowProjects(true);
    setShowVideos(false);
    setShowContact(false);
    setShowExperience(false);
    setShowEducation(false);
    setShowHobbies(false);
  };

  const handleOpenVideos = () => {
    setShowVideos(true);
    setShowProjects(false);
    setShowContact(false);
    setShowExperience(false);
    setShowEducation(false);
    setShowHobbies(false);
  };

  const handleOpenContact = () => {
    setShowContact(true);
    setShowProjects(false);
    setShowVideos(false);
    setShowExperience(false);
    setShowEducation(false);
    setShowHobbies(false);
  };

  const handleOpenExperience = () => {
    setShowExperience(true);
    setShowProjects(false);
    setShowVideos(false);
    setShowContact(false);
    setShowEducation(false);
    setShowHobbies(false);
  };

  const handleOpenEducation = () => {
    setShowEducation(true);
    setShowProjects(false);
    setShowVideos(false);
    setShowContact(false);
    setShowExperience(false);
    setShowHobbies(false);
  };

  const handleOpenHobbies = () => {
    setShowHobbies(true);
    setShowProjects(false);
    setShowVideos(false);
    setShowContact(false);
    setShowExperience(false);
    setShowEducation(false);
  };

  const handleCloseProjects = () => setShowProjects(false);
  const handleCloseVideos = () => setShowVideos(false);
  const handleCloseContact = () => setShowContact(false);
  const handleCloseExperience = () => setShowExperience(false);
  const handleCloseEducation = () => setShowEducation(false);
  const handleCloseHobbies = () => setShowHobbies(false);

  const isAnyModalOpen = showProjects || showVideos || showContact || showExperience || showEducation || showHobbies;

  return (
    // Forced 'dark' class
    <div className="app dark">
      {isLoading ? (
        <div className="loading-container">
          <LetterGlitch
            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />

          <div className="loading-overlay">
            <div className="loading-icon"></div>
            <div className="glitch-typewriter">
              <h1 className="typewriter-text">
                hello world !
                <span className="cursor">|</span>
              </h1>
              <div className="progress-counter">
                {progress}% Done
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorBoundary>
          {/* Removed darkMode props as they are no longer needed */}
          <Header
            onOpenContact={handleOpenContact}
            onOpenExperience={handleOpenExperience}
            onOpenEducation={handleOpenEducation}
            onOpenHobbies={handleOpenHobbies}
          />

          <div className={`main-content ${isAnyModalOpen ? 'content-blur' : ''}`}>
            {!isAnyModalOpen && (
              <Suspense fallback={<div className="fallback-bg" />}>
                <Hero
                  onOpenProjects={handleOpenProjects}
                  onOpenVideos={handleOpenVideos}
                  onOpenContact={handleOpenContact}
                />
              </Suspense>
            )}
          </div>

          {/* Modal Windows */}
          {showProjects && <ProjectsWindow onClose={handleCloseProjects} />}
          {showVideos && <Videos onClose={handleCloseVideos} />}
          {showContact && <Contact onClose={handleCloseContact} />}
          {showExperience && <Experience onClose={handleCloseExperience} />}
          {showEducation && <Education onClose={handleCloseEducation} />}
          {showHobbies && <Hobbies onClose={handleCloseHobbies} />}

          <Dock
            onOpenProjects={handleOpenProjects}
            onOpenExperience={handleOpenExperience}
            onOpenEducation={handleOpenEducation}
            onOpenHobbies={handleOpenHobbies}
            onOpenContact={handleOpenContact}
          />
          <SocialLinks />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;