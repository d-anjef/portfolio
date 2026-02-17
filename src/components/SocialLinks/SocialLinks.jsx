import React from 'react';
import './SocialLinks.css';

const SocialLinks = () => {
  const socialLinks = [
    { id: 'linkedin', icon: 'IN', label: 'LinkedIn', url: 'https://www.linkedin.com/in/anjef-dangol-916804369/' },
    { id: 'facebook', icon: 'FB', label: 'Facebook', url: 'https://www.facebook.com/anjef.dangol.1010' },
    { id: 'instagram', icon: 'IG', label: 'Instagram', url: 'https://www.instagram.com/_anjef/' },
    { id: 'github', icon: 'GH', label: 'GitHub', url: 'https://github.com/d-anjef' }
  ];

  const handleSocialClick = (url) => {
    if (url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="social-links">
      <div className="social-label"></div>
      <div className="social-icons">
        {socialLinks.map((social) => (
          <button
            key={social.id}
            className="social-icon"
            onClick={() => handleSocialClick(social.url)}
            title={social.label}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;