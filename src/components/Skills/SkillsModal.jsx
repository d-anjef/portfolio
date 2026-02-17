import React, { useRef, useState } from "react";
import gsap from "gsap";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaPhp,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaFigma,
  FaWordpress,
  FaCamera,
  FaVideo,
  FaFilm,
  FaDatabase,
  FaJava,
  FaCodeBranch,
  FaPython,
} from "react-icons/fa";
import "./SkillsModal.css";

// Your complete skills array organized by category
const allSkills = [
  // Frontend
  { title: "HTML", icon: FaHtml5, category: "Frontend" },
  { title: "CSS", icon: FaCss3Alt, category: "Frontend" },
  { title: "Tailwind CSS", icon: FaCss3Alt, category: "Frontend" },
  { title: "JavaScript", icon: FaJs, category: "Frontend" },
  { title: "React.jsx", icon: FaReact, category: "Frontend" },
  { title: "Framer Motion", icon: FaVideo, category: "Frontend" },

  // Backend & Databases
  { title: "Node.js", icon: FaNode, category: "Backend" },
  { title: "Express.js", icon: FaNode, category: "Backend" },
  { title: "MongoDB", icon: FaDatabase, category: "Backend" },
  { title: "PHP", icon: FaPhp, category: "Backend" },
  { title: "MySQL", icon: FaDatabase, category: "Backend" },
  { title: "Java", icon: FaJava, category: "Backend" },

  // Programming Languages
  { title: "C", icon: FaCodeBranch, category: "Programming" },
  { title: "C++", icon: FaCodeBranch, category: "Programming" },

  // Version Control
  { title: "Git", icon: FaGitAlt, category: "Tools" },
  { title: "GitHub", icon: FaGithub, category: "Tools" },
  { title: "GitLab", icon: FaGitlab, category: "Tools" },

  // Design Tools
  { title: "Figma", icon: FaFigma, category: "Design" },
  { title: "Adobe XD", icon: FaFigma, category: "Design" },
  { title: "WordPress", icon: FaWordpress, category: "Design" },

  // Video & Photo
  { title: "Premiere Pro", icon: FaFilm, category: "Media" },
  { title: "After Effects", icon: FaFilm, category: "Media" },
  { title: "Photography", icon: FaCamera, category: "Media" },
  { title: "Videography", icon: FaVideo, category: "Media" },
];

const SkillsModal = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const cardsRef = useRef([]);

  // Get unique categories
  const categories = ["All", ...new Set(allSkills.map(skill => skill.category))];
  
  // Filter skills based on selected category
  const filteredSkills = selectedCategory === "All" 
    ? allSkills 
    : allSkills.filter(skill => skill.category === selectedCategory);

  // Hover effect for individual cards - only on hover
  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      y: isHovering ? -8 : 0,
      scale: isHovering ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div className="skills-modal-overlay">
      <div className="skills-modal-container">
        <div className="skills-modal-header">
          <span className="skills-title">🧠 My Professional Skills</span>
          <div className="window-controls">
            <button className="window-btn yellow" title="Minimize" />
            <button className="window-btn green" title="Maximize" />
            <button className="window-btn red" onClick={onClose} title="Close" />
          </div>
        </div>

        <p className="skills-description">
          Explore my diverse skill set spanning frontend development, backend technologies, programming languages, design tools, and creative media production.
        </p>

        {/* Category Filter */}
        <div className="skills-category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-card-grid">
          {filteredSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={`${skill.title}-${index}`}
                ref={(el) => (cardsRef.current[index] = el)}
                className="skill-card"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                <div className="skill-icon">
                  <IconComponent />
                </div>
                <h3>{skill.title}</h3>
                <span className="skill-category-tag">{skill.category}</span>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="no-skills-message">
            No skills found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsModal;