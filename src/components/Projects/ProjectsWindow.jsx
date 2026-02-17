import React, { useState } from 'react';
import './ProjectsWindow.css';
import CardSwap, { Card } from './CardSwap';
import ProjectShowcaseModal from './ProjectsShowCaseModal';

const projectList = [
  { 
    title: 'Nike Dunks Ecommerce', 
    tags: ['React', 'E-commerce'], 
    color: '#FF8C00', 
    icon: '🛒',
    github: 'https://github.com/d-anjef/nike-dunks-ecommerce', 
    live: 'https://nike-dunks-ecommerce.vercel.app/login', 
    image: '/assets/projectpics/nike.png', 
    description: 'A premium footwear shopping experience with seamless cart management, user authentication, and modern UI design. Built with React for optimal performance.' 
  },
  { 
    title: 'Explore Nepal', 
    tags: ['React', 'Tourism'], 
    color: '#27AE60', 
    icon: '🏔️',
    github: 'https://github.com/d-anjef/Travel_Tourism_Web_app', 
    live: 'https://travel-tourism-one.vercel.app/', 
    image: '/assets/projectpics/explore.png', 
    description: 'An interactive travel and tourism platform showcasing Nepal\'s beauty. Features destination guides, booking capabilities, and immersive visual experiences.' 
  },
  { 
    title: 'Windows Portfolio', 
    tags: ['React', 'UI/UX'], 
    color: '#0078D4', 
    icon: '💻',
    github: 'https://github.com/d-anjef/portfolio', 
    live: 'https://www.anjef.com.np/', 
    image: '', 
    description: 'An innovative OS-style portfolio interface with window management, dock navigation, and glassmorphism design. Showcasing projects in a unique interactive environment.' 
  },
  { 
    title: 'Valentine Special', 
    tags: ['Next.js', 'Creative'], 
    color: '#FF4D6D', 
    icon: '💝',
    github: 'https://github.com/d-anjef/valentine', 
    live: 'https://mero-valentine-banxau.vercel.app/', 
    image: '', 
    description: 'An interactive and romantic web experience built with Next.js. Features animations, personalized messages, and creative interactions for special occasions.' 
  },
  { 
    title: 'Futsal Booking System', 
    tags: ['PHP', 'MySQL'], 
    color: '#5227FF', 
    icon: '⚽',
    github: 'https://github.com/d-anjef/futsal-booking-system', 
    live: '', 
    image: '/assets/projectpics/FBS.png', 
    description: 'A comprehensive court management and booking system for futsal venues. Includes scheduling, payment integration, and administrative dashboard built with PHP.' 
  },
  { 
    title: 'Tic Tac Toe Game', 
    tags: ['React', 'Game'], 
    color: '#FFD700', 
    icon: '🎮',
    github: 'https://github.com/d-anjef/tic-tac-toe', 
    live: '', 
    image: '/assets/projectpics/TictacToe.png', 
    description: 'Classic Tic Tac Toe game with smart AI opponent, score tracking, and smooth animations. Built using React hooks and game theory algorithms.' 
  },
  { 
    title: 'Digital Clock', 
    tags: ['JavaScript', 'CSS'], 
    color: '#00FFA3', 
    icon: '⏰',
    github: 'https://github.com/d-anjef/digital-clock', 
    live: '', 
    image: '/assets/projectpics/digital-clock.png', 
    description: 'A sleek real-time digital clock with customizable themes, timezone support, and alarm functionality. Pure JavaScript with modern CSS animations.' 
  },
  { 
    title: 'To Do List App', 
    tags: ['React', 'Productivity'], 
    color: '#FF4747', 
    icon: '✓',
    github: 'https://github.com/d-anjef/To-do-List', 
    live: '', 
    image: '/assets/projectpics/ToDoList.png', 
    description: 'Minimalist task management application with drag-and-drop functionality, local storage persistence, and priority tagging system built with React.' 
  },
  { 
    title: 'Cafe POS System ', 
    tags: ['React', 'Productivity'], 
    color: '#ffdd47', 
    icon: '#',
    github: '', 
    live: '', 
    image: '', 
    description: 'currently building Cafe POS system for real time ' 
  }
];

const ProjectsWindow = ({ onClose }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="window-overlay">
      <div className="projects-glass-container">
        {/* Window Header */}
        <div className="glass-header">
          <div className="header-controls">
            <span className="dot maximize"></span>
            <span className="dot minimize"></span>
            <span className="dot close" onClick={onClose}></span>
          </div>
          <div className="header-title">
            <span className="header-icon">📂</span>
            <span className="header-text">My Projects</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-content">
          <div className="content-header">
            <h1 className="projects-title">Featured Projects</h1>
            <p className="projects-subtitle">
              Below is a showcase of my projects. Each card represents a different project with unique features and technologies. Explore how I blend code, design, and creativity into everything I do.
            </p>
          </div>

          <div className="cards-wrapper">
            <div className="stack-container">
              <CardSwap 
                width={550} 
                height={420} 
                delay={4500} 
                cardDistance={70} 
                verticalDistance={80}
                pauseOnHover={true}
                onCardClick={(index) => setSelected(projectList[index])}
              >
              {projectList.map((project, index) => (
                <Card key={index}>
                  <div className="project-card">
                    {/* Card Background Pattern */}
                    <div className="card-bg-pattern" style={{ 
                      background: `linear-gradient(135deg, ${project.color}15 0%, transparent 100%)` 
                    }}></div>
                    
                    {/* Card Header */}
                    <div className="card-header">
                      <div className="card-icon" style={{ 
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}CC)` 
                      }}>
                        <span>{project.icon}</span>
                      </div>
                      <div className="card-badge" style={{ 
                        borderColor: project.color,
                        color: project.color 
                      }}>
                        #{index + 1}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="card-body">
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-description">{project.description}</p>
                      
                      <div className="card-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="card-tag" style={{ 
                            background: `${project.color}20`,
                            borderColor: `${project.color}40`,
                            color: project.color
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="card-footer">
                      <div className="card-status">
                        {project.live ? (
                          <span className="status-live">
                            <span className="status-dot"></span>
                            Live
                          </span>
                        ) : (
                          <span className="status-repo">
                            <span className="status-dot inactive"></span>
                            Repository
                          </span>
                        )}
                      </div>
                      <span className="card-click-hint">Click to explore →</span>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

          {/* Bottom Info */}
          <div className="content-footer">
            <p className="footer-text">
              <span className="footer-count">{projectList.length} Projects</span>
              <span className="footer-separator">•</span>
              <span className="footer-info">Swipe or wait for auto-rotation</span>
            </p>
          </div>
        </div>
      </div>

      {selected && (
        <ProjectShowcaseModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default ProjectsWindow;