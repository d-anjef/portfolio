import React, { useState, useCallback } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './Hobbies.css';

const Hobbies = ({ onClose }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const hobbies = [
    {
      id: 1,
      title: 'Photography',
      subtitle: 'Visual Storytelling',
      description: 'Capturing moments with creativity and emotion.',
      detailedInfo: 'Professional photography with focus on landscape and portrait work. Experience with various camera equipment and post-processing techniques.',
      icon: '📷',
      color: '#ff6b6b',
      category: 'Creative',
      proficiency: 'Advanced',
      skills: ['Composition', 'Lighting', 'Editing', 'Color Grading'],
      experience: '4+ years'
    },
    {
      id: 2,
      title: 'Video Editing',
      subtitle: 'Motion & Storytelling',
      description: 'Telling stories through motion and cuts.',
      detailedInfo: 'Expert in video editing with proficiency in multiple software. Creating cinematic content with advanced effects and color grading.',
      icon: '🎬',
      color: '#4ecdc4',
      category: 'Creative',
      proficiency: 'Expert',
      skills: ['Editing', 'VFX', 'Color Grading', 'Sound Design'],
      experience: '4+ years'
    },
    {
      id: 3,
      title: 'Traveling',
      subtitle: 'Exploration & Culture',
      description: 'Exploring new cultures and landscapes.',
      detailedInfo: 'Passionate traveler visiting 30+ countries. Love documenting travel experiences and connecting with different cultures.',
      icon: '🌍',
      color: '#45b7d1',
      category: 'Adventure',
      proficiency: 'Experienced',
      skills: ['Planning', 'Photography', 'Adaptation', 'Cultural Understanding'],
      experience: '3+ years'
    },
    {
      id: 4,
      title: 'Gaming',
      subtitle: 'Strategy & Fun',
      description: 'Immersing in digital worlds for fun and strategy.',
      detailedInfo: 'Competitive gamer with expertise in strategy and action games. Enjoy both single-player and multiplayer experiences.',
      icon: '🎮',
      color: '#f9ca24',
      category: 'Entertainment',
      proficiency: 'Advanced',
      skills: ['Strategy', 'Reflexes', 'Problem Solving', 'Teamwork'],
      experience: '12+ years'
    },
    {
      id: 5,
      title: 'Music',
      subtitle: 'Audio & Sound',
      description: 'Enjoying different genres and rhythms.',
      detailedInfo: 'Music enthusiast with knowledge of music production and sound engineering. Appreciate diverse genres from classical to electronic.',
      icon: '🎧',
      color: '#a78bfa',
      category: 'Creative',
      proficiency: 'Intermediate',
      skills: ['Production', 'Sound Design', 'Music Theory', 'Mixing'],
      experience: '4+ years'
    },
    {
      id: 6,
      title: 'Cooking',
      subtitle: 'Culinary Arts',
      description: 'Creating delicious dishes and experimenting with flavors.',
      detailedInfo: 'Home chef passionate about international cuisines. Enjoy experimenting with new recipes and cooking techniques.',
      icon: '🍳',
      color: '#ff9ff3',
      category: 'Lifestyle',
      proficiency: 'Intermediate',
      skills: ['Food Prep', 'Flavor Combinations', 'Plating', 'Nutrition'],
      experience: '7+ years'
    },
    {
      id: 7,
      title: 'Story Writing',
      subtitle: 'Knowledge & Imagination',
      description: 'Writing Story to Show and relax.',
      detailedInfo: 'Usally write my imagination story in my notebooks.',
      icon: '📚',
      color: '#48dbfb',
      category: 'Learning',
      proficiency: 'Advanced',
      skills: ['Speed Reading', 'Analysis', 'Knowledge Retention', 'Critical Thinking'],
      experience: '15+ years'
    },
    {
      id: 8,
      title: 'Drawing',
      subtitle: 'Digital & Traditional Art',
      description: 'Expressing creativity through sketches and art.',
      detailedInfo: 'Digital and traditional artist with focus on character design and illustration. Proficient in multiple art styles.',
      icon: '✏️',
      color: '#ee5a6f',
      category: 'Creative',
      proficiency: 'Advanced',
      skills: ['Character Design', 'Anatomy', 'Digital Painting', 'Illustration'],
      experience: '8+ years'
    },
    {
      id: 9,
      title: 'Trekking',
      subtitle: 'Mountain Adventures',
      description: 'Venturing into the wild and climbing trails.',
      detailedInfo: 'Adventure enthusiast with experience in mountain trekking. Completed several challenging trails and summits.',
      icon: '🗻',
      color: '#1dd1a1',
      category: 'Adventure',
      proficiency: 'Advanced',
      skills: ['Navigation', 'Physical Fitness', 'Safety', 'Endurance'],
      experience: '3+ years'
    },
    {
      id: 10,
      title: 'Hiking',
      subtitle: 'Nature Exploration',
      description: 'Exploring nature trails and enjoying fresh air.',
      detailedInfo: 'Nature lover who regularly explores local trails and parks. Focus on sustainable and responsible outdoor practices.',
      icon: '🥾',
      color: '#ffa502',
      category: 'Adventure',
      proficiency: 'Advanced',
      skills: ['Trail Navigation', 'Wildlife Knowledge', 'Environmental Awareness', 'Photography'],
      experience: '5+ years'
    },
    {
      id: 11,
      title: 'Coding',
      subtitle: 'Software Development',
      description: 'Building digital experiences and solving problems.',
      detailedInfo: 'Full-stack developer with expertise in modern web technologies. Passionate about creating elegant solutions to complex problems.',
      icon: '💻',
      color: '#6c5ce7',
      category: 'Technical',
      proficiency: 'Amature',
      skills: ['Frontend', 'Backend', 'Problem Solving', 'System Design'],
      experience: '3+ years'
    }
  ];

  const categories = ['All', ...new Set(hobbies.map(h => h.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredHobbies = selectedCategory === 'All' 
    ? hobbies 
    : hobbies.filter(h => h.category === selectedCategory);

  const handleCardClick = useCallback((id) => {
    setExpandedCard(expandedCard === id ? null : id);
  }, [expandedCard]);

  const handleKeyDown = useCallback((e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(id);
    }
  }, [handleCardClick]);

  return (
    <div
      className="hobbies-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hobbies-title"
    >
      <div className="hobbies-window">
        <div className="hobbies-header">
          <div id="hobbies-title" className="hobbies-title">
            🎨 My Hobbies
          </div>
          <div className="window-controls">
            <button className="window-btn yellow" title="Minimize" aria-label="Minimize" />
            <button className="window-btn green" title="Maximize" aria-label="Maximize" />
            <button 
              className="window-btn red" 
              onClick={onClose} 
              title="Close"
              aria-label="Close dialog"
            />
          </div>
        </div>

        <div className="hobbies-description">
          <p>
            Hobbies are more than just leisure activities – they're a reflection of passion, curiosity, and personality.
            Each of these interests allows me to express creativity, find joy, and keep learning in different ways.
          </p>
        </div>

        {/* Category Filter */}
        <div className="hobbies-filter" role="tablist">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <ScrollStack
          className="hobbies-scroll-stack"
          itemDistance={80}
          itemScale={0.025}
          itemStackDistance={25}
          stackPosition="5%"
          scaleEndPosition="2%"
          baseScale={0.92}
          rotationAmount={0}
          blurAmount={0}
        >
          {filteredHobbies.map((hobby) => (
            <ScrollStackItem key={hobby.id} itemClassName={`hobby-card ${expandedCard === hobby.id ? 'expanded' : ''}`}>
              <div 
                className="hobby-card-wrapper"
                style={{
                  '--hobby-color': hobby.color
                }}
                onMouseEnter={() => setHoveredCard(hobby.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(hobby.id)}
                onKeyDown={(e) => handleKeyDown(e, hobby.id)}
                role="button"
                tabIndex="0"
                aria-expanded={expandedCard === hobby.id}
              >
                {/* Particle Effects */}
                <div className="particle-container">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="particle" style={{ '--particle-index': i }} />
                  ))}
                </div>

                {/* Gradient Overlay */}
                <div className="gradient-overlay" />

                {/* Main Content */}
                <div className="hobby-card-inner">
                  {/* Icon with background */}
                  <div className="hobby-icon-container">
                    <div className="hobby-icon-bg" />
                    <div className="hobby-icon">{hobby.icon}</div>
                  </div>

                  {/* Text Content */}
                  <div className="hobby-info">
                    <div className="hobby-header-row">
                      <div>
                        <h3 className="hobby-title">{hobby.title}</h3>
                        <p className="hobby-subtitle">{hobby.subtitle}</p>
                      </div>
                      <span className="category-badge">{hobby.category}</span>
                    </div>
                    <p className="hobby-text">{hobby.description}</p>

                    {/* Proficiency & Experience */}
                    <div className="hobby-meta">
                      <span className="proficiency-badge" style={{ borderColor: hobby.color }}>
                        {hobby.proficiency}
                      </span>
                      <span className="experience-text">{hobby.experience}</span>
                    </div>

                    {/* Skills Tags - Hidden by default, shown on expand */}
                    {expandedCard === hobby.id && (
                      <div className="hobby-skills">
                        {hobby.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag" style={{ backgroundColor: hobby.color + '20', borderColor: hobby.color }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Detailed Info - Hidden by default */}
                    {expandedCard === hobby.id && (
                      <div className="hobby-detailed-info">
                        {hobby.detailedInfo}
                      </div>
                    )}
                  </div>

                  {/* Expand Indicator */}
                  <div className="expand-indicator">
                    <span className="expand-icon">
                      {expandedCard === hobby.id ? '−' : '+'}
                    </span>
                  </div>
                </div>

                {/* Accent Bar */}
                <div className="hobby-accent" style={{ backgroundColor: hobby.color }} />

                {/* Pulse Effect */}
                <div className="pulse-ring" style={{ borderColor: hobby.color }} />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* Scroll Progress Indicator */}
        <div className="scroll-progress" />
      </div>
    </div>
  );
};

export default Hobbies;