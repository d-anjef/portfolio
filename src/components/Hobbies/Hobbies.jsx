import React, { useState } from 'react';
import './Hobbies.css';

const Hobbies = ({ onClose }) => {
  const [hoveredHobby, setHoveredHobby] = useState(null);

  const hobbies = [
    {
      id: 1,
      title: 'Photography',
      description: 'Capturing moments with creativity and emotion.',
      icon: '📷',
      color: '#ff6b6b'
    },
    {
      id: 2,
      title: 'Video Editing',
      description: 'Telling stories through motion and cuts.',
      icon: '🎬',
      color: '#4ecdc4'
    },
    {
      id: 3,
      title: 'Traveling',
      description: 'Exploring new cultures and landscapes.',
      icon: '🌍',
      color: '#45b7d1'
    },
    {
      id: 4,
      title: 'Gaming',
      description: 'Immersing in digital worlds for fun and strategy.',
      icon: '🎮',
      color: '#f9ca24'
    },
    {
      id: 5,
      title: 'Music',
      description: 'Enjoying different genres and rhythms.',
      icon: '🎧',
      color: '#a78bfa'
    },
    {
      id: 6,
      title: 'Cooking',
      description: 'Creating delicious dishes and experimenting with flavors.',
      icon: '🍳',
      color: '#ff9ff3'
    },
    {
      id: 7,
      title: 'Reading',
      description: 'Diving into books to learn and relax.',
      icon: '📚',
      color: '#48dbfb'
    },
    {
      id: 8,
      title: 'Drawing',
      description: 'Expressing creativity through sketches and art.',
      icon: '✏️',
      color: '#ee5a6f'
    },
    {
      id: 9,
      title: 'Trekking',
      description: 'Venturing into the wild and climbing trails.',
      icon: '🗻',
      color: '#1dd1a1'
    },
    {
      id: 10,
      title: 'Hiking',
      description: 'Exploring nature trails and enjoying fresh air.',
      icon: '🥾',
      color: '#ffa502'
    },
    {
      id: 11,
      title: 'Coding',
      description: 'Building digital experiences and solving problems.',
      icon: '💻',
      color: '#6c5ce7'
    },
  ];

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
            <button className="window-btn yellow" title="Minimize" />
            <button className="window-btn green" title="Maximize" />
            <button className="window-btn red" onClick={onClose} title="Close" />
          </div>
        </div>

        <div className="hobbies-description">
          <p>
            Hobbies are more than just leisure activities – they're a reflection of passion, curiosity, and personality.
            Each of these interests allows me to express creativity, find joy, and keep learning in different ways.
          </p>
        </div>

        <div className="hobbies-content">
          {hobbies.map((hobby, index) => (
            <div
              key={hobby.id}
              className={`hobby-card ${hoveredHobby === hobby.id ? 'active' : ''}`}
              style={{
                '--hobby-color': hobby.color,
                '--delay': `${index * 0.08}s`
              }}
              onMouseEnter={() => setHoveredHobby(hobby.id)}
              onMouseLeave={() => setHoveredHobby(null)}
            >
              <div className="hobby-card-inner">
                <div className="hobby-icon">{hobby.icon}</div>
                <div className="hobby-info">
                  <h3 className="hobby-title">{hobby.title}</h3>
                  <p className="hobby-text">{hobby.description}</p>
                </div>
                <div className="hobby-arrow">→</div>
              </div>
              <div className="hobby-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hobbies;