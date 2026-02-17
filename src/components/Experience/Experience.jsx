import React, { useState } from 'react';
import './Experience.css';

const Experience = ({ onClose }) => {
  const [expandedJob, setExpandedJob] = useState(null);

  const experiences = [
    {
      id: 1,
      jobTitle: 'Managing Website and Social Media',
      company: 'Joven Fashion',
      duration: 'Jan 2026 - Present',
      status: 'Currently Working',
      description: 'Managing ecommerce website and creating engaging posts for social media platforms',
      responsibilities: [
        'Manage and maintain ecommerce website',
        'Create engaging social media content',
        'Monitor website performance',
        'Handle customer interactions'
      ],
      technologies: ['E-commerce', 'Social Media', 'Website Management', 'Content Creation'],
      icon: '💼'
    },
    {
      id: 2,
      jobTitle: 'Data Annotation Intern',
      company: 'Crowdai Projects',
      duration: 'June 2024 - Sep 2024',
      status: 'Internship',
      description: 'Entered and cleaned records from scanned forms and handwritten documents',
      responsibilities: [
        'Data entry and verification',
        'Document scanning and processing',
        'Record cleaning and validation',
        'Excel and Google Sheets management'
      ],
      technologies: ['Excel', 'Google Sheets', 'Data Entry', 'Nepali Language'],
      icon: '📊',
      location: 'Remote'
    },
    {
      id: 3,
      jobTitle: 'Social Media Manager',
      company: 'Matshya Narayan Recreational Center',
      duration: 'Jan 2022 - July 2024',
      status: 'Full-time',
      description: 'Managed social media presence across multiple platforms',
      responsibilities: [
        'Managed Facebook, Instagram, and TikTok accounts',
        'Created and scheduled posts',
        'Engaged with followers',
        'Developed social media strategy'
      ],
      technologies: ['Facebook', 'Instagram', 'TikTok', 'Content Strategy', 'Social Media Marketing'],
      icon: '📱'
    },
    {
      id: 4,
      jobTitle: 'Photographer & Videographer',
      company: 'Matshya Narayan Recreational Center',
      duration: 'Jan 2022 - July 2024',
      status: 'Full-time',
      description: 'Captured photos and created videos for the recreational center',
      responsibilities: [
        'Event photography and videography',
        'Video editing and production',
        'Photo curation and management',
        'Content creation for marketing'
      ],
      technologies: ['Photography', 'Videography', 'Video Editing', 'Content Creation'],
      icon: '📹'
    },
    {
      id: 5,
      jobTitle: 'Photographer',
      company: 'Kuhiro Dada Agro Rest House & Heavenly Village Resort',
      duration: 'Feb 2022 - April 2022',
      status: 'Part-time',
      description: 'Photographed guests and managed social media content',
      responsibilities: [
        'Guest photography',
        'Photo editing',
        'Facebook page management',
        'Content posting and scheduling'
      ],
      technologies: ['Photography', 'Photo Editing', 'Social Media', 'Facebook Management'],
      icon: '📸'
    }
  ];

  return (
    <div
      className="experience-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-title"
    >
      <div className="experience-window">
        <div className="experience-header">
          <div id="experience-title" className="experience-title">
            💼 Work Experience
          </div>
          <div className="window-controls">
            <button className="window-btn yellow" title="Minimize" />
            <button className="window-btn green" title="Maximize" />
            <button className="window-btn red" onClick={onClose} title="Close" />
          </div>
        </div>

        <div className="experience-description">
          <p>
            My professional journey showcasing diverse roles in web management, content creation, photography, 
            and data annotation. Each experience has contributed to my growth as a developer and creative professional.
          </p>
        </div>

        <div className="experience-content">
          <div className="timeline">
            {experiences.map((job, index) => (
              <div key={job.id} className="timeline-item" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="timeline-marker"></div>
                <div className="timeline-connector"></div>

                <div
                  className={`job-card ${expandedJob === job.id ? 'expanded' : ''}`}
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="job-header">
                    <div className="job-icon">{job.icon}</div>
                    <div className="job-info">
                      <h3 className="job-title">{job.jobTitle}</h3>
                      <p className="company-name">{job.company}</p>
                      <div className="job-meta">
                        <span className="duration">📅 {job.duration}</span>
                        <span className={`status ${job.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="job-description">{job.description}</p>

                  {expandedJob === job.id && (
                    <div className="job-details">
                      <div className="details-section">
                        <h4>Responsibilities</h4>
                        <ul>
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="details-section">
                        <h4>Technologies & Skills</h4>
                        <div className="tech-tags">
                          {job.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>

                      {job.location && (
                        <div className="details-section">
                          <h4>Location</h4>
                          <p>{job.location}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="expand-indicator">
                    {expandedJob === job.id ? '▼ Less' : '▶ More'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;