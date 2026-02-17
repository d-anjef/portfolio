import React, { useState } from 'react';
import './Education.css';

const Education = ({ onClose }) => {
  const [expandedEducation, setExpandedEducation] = useState(null);

  const educationData = [
    {
      id: 1,
      degree: 'Bachelor in Computer Application',
      institution: 'Vedas College / Tribhuvan University',
      duration: '2022 - 2027',
      fieldOfStudy: 'Computer Science',
      description: 'Pursuing comprehensive studies in computer applications with focus on software development and web technologies',
      icon: '🎓',
      status: 'Currently Studying',
      courses: [
        'Web Development',
        'Database Management',
        'Programming Languages',
        'Software Engineering'
      ],
      highlights: [
        'Focus on full-stack development',
        'Practical coding experience',
        'Industry-relevant curriculum'
      ]
    },
    {
      id: 2,
      degree: '+2 (Higher Secondary)',
      institution: 'Kathmandu College of Central State (KCCS)',
      duration: '2020 - 2022',
      fieldOfStudy: 'Computer Science',
      description: 'Advanced secondary education with specialization in computer science',
      icon: '📚',
      status: 'Completed',
      highlights: [
        'Strong foundation in programming',
        'Introduced to web technologies',
        'Hands-on lab experience'
      ]
    },
    {
      id: 3,
      degree: 'School',
      institution: 'New Horizon Academy',
      duration: 'Passed: 2020',
      fieldOfStudy: 'General Education',
      description: 'Primary and secondary education providing foundational knowledge',
      icon: '🏫',
      status: 'Completed',
      highlights: [
        'Well-rounded education',
        'Strong academic foundation',
        'Co-curricular activities'
      ]
    }
  ];

  return (
    <div
      className="education-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="education-title"
    >
      <div className="education-window">
        <div className="education-header">
          <div id="education-title" className="education-title">
            🎓 Education
          </div>
          <div className="window-controls">
            <button className="window-btn yellow" title="Minimize" />
            <button className="window-btn green" title="Maximize" />
            <button className="window-btn red" onClick={onClose} title="Close" />
          </div>
        </div>

        <div className="education-description">
          <p>
            My educational journey showcasing formal qualifications and academic achievements. 
            Each stage of education has built upon the previous one, creating a strong foundation in computer science and technology.
          </p>
        </div>

        <div className="education-content">
          <div className="education-list">
            {educationData.map((edu, index) => (
              <div
                key={edu.id}
                className={`education-card ${expandedEducation === edu.id ? 'expanded' : ''}`}
                style={{ '--delay': `${index * 0.1}s` }}
                onClick={() => setExpandedEducation(expandedEducation === edu.id ? null : edu.id)}
              >
                <div className="education-main">
                  <div className="education-icon">{edu.icon}</div>

                  <div className="education-info">
                    <h3 className="degree-name">{edu.degree}</h3>
                    <p className="institution-name">{edu.institution}</p>
                    <p className="field-study">{edu.fieldOfStudy}</p>
                    <div className="education-meta">
                      <span className="duration">📅 {edu.duration}</span>
                      <span className={`status ${edu.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="education-description-text">{edu.description}</p>

                {expandedEducation === edu.id && (
                  <div className="education-details">
                    <div className="details-box">
                      <h4>Highlights</h4>
                      <ul>
                        {edu.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    {edu.courses && (
                      <div className="details-box">
                        <h4>Key Courses</h4>
                        <div className="course-tags">
                          {edu.courses.map((course, idx) => (
                            <span key={idx} className="course-tag">{course}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="expand-indicator">
                  {expandedEducation === edu.id ? '▼ Less Details' : '▶ More Details'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;