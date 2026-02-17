import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useMemo, useRef } from 'react';

import Profile from '../Profile/Profile';
import ProjectsWindow from '../Projects/ProjectsWindow';
import SkillsModal from '../Skills/SkillsModal';
import Videos from '../Videos/Videos';
import Hobbies from '../Hobbies/Hobbies';
import Contact from '../Contact/Contact';
import Experience from '../Experience/Experience';
import Education from '../Education/Education';

import './Dock.css';

// --- React Bits Sub-Components ---

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, isMobile }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  // Disable magnification on mobile
  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, isMobile ? baseItemSize : magnification, baseItemSize]
  );

  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => !isMobile && isHovered.set(1)}
      onHoverEnd={() => !isMobile && isHovered.set(0)}
      onTap={() => {
        onClick?.();
        // Provide visual feedback on mobile
        if (isMobile) isHovered.set(1);
      }}
      onClick={!isMobile ? onClick : undefined}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-label="Dock item"
    >
      {Children.map(children, child => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return isHovered.on('change', latest => setIsVisible(latest === 1));
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -45 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          style={{ left: '50%', x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

// --- Main Dock Component ---

const Dock = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isVideosOpen, setIsVideosOpen] = useState(false);
  const [isHobbiesOpen, setIsHobbiesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust spring physics for mobile
  const spring = isMobile
    ? { mass: 0.1, stiffness: 100, damping: 15 }
    : { mass: 0.1, stiffness: 150, damping: 12 };

  const mouseX = useMotionValue(Infinity);

  // Adjust magnification and sizing for mobile
  const baseItemSize = isMobile ? 40 : 50;
  const magnification = isMobile ? 40 : 80; // No magnification on mobile
  const distance = isMobile ? 150 : 200;

  const items = [
    { label: 'Home', icon: '🏠', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Profile', icon: '👤', onClick: () => setIsProfileOpen(true) },
    { label: 'Experience', icon: '💼', onClick: () => setIsExperienceOpen(true) },
    { label: 'Education', icon: '🎓', onClick: () => setIsEducationOpen(true) },
    { label: 'Projects', icon: '📂', onClick: () => setIsProjectsOpen(true) },
    { label: 'Skills', icon: '⚙️', onClick: () => setIsSkillsOpen(true) },
    { label: 'Videos', icon: '🎥', onClick: () => setIsVideosOpen(true) },
    { label: 'Hobbies', icon: '🎨', onClick: () => setIsHobbiesOpen(true) },
    { label: 'Contact', icon: '✉️', onClick: () => setIsContactOpen(true) },
  ];

  return (
    <>
      <div className="dock-container-bottom">
        <motion.div
          className="dock-outer"
          onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
          onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
        >
          <div className="dock-panel" role="toolbar">
            {items.map((item, index) => (
              <DockItem
                key={index}
                onClick={item.onClick}
                mouseX={mouseX}
                spring={spring}
                distance={distance}
                magnification={magnification}
                baseItemSize={baseItemSize}
                isMobile={isMobile}
              >
                <DockIcon>{item.icon}</DockIcon>
                <DockLabel>{item.label}</DockLabel>
              </DockItem>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals Mapping */}
      {isProfileOpen && <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />}
      {isExperienceOpen && <Experience onClose={() => setIsExperienceOpen(false)} />}
      {isEducationOpen && <Education onClose={() => setIsEducationOpen(false)} />}
      {isProjectsOpen && <ProjectsWindow isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />}
      {isSkillsOpen && <SkillsModal isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />}
      {isVideosOpen && <Videos isOpen={isVideosOpen} onClose={() => setIsVideosOpen(false)} />}
      {isHobbiesOpen && <Hobbies onClose={() => setIsHobbiesOpen(false)} />}
      {isContactOpen && <Contact onClose={() => setIsContactOpen(false)} />}
    </>
  );
};

export default Dock;