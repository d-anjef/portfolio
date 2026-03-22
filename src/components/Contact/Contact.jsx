import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const ContactWindow = ({ onClose }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Name is required";
    } else if (formData.user_name.trim().length < 2) {
      newErrors.user_name = "Name must be at least 2 characters";
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Send Email
  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.sendForm(
        "service_5v7pq0m",
        "template_q80y747",
        form.current,
        "i12AXwY1UiLm8XwIB"
      );

      setSubmitStatus("success");
      setFormData({ user_name: "", user_email: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 4000);
    } catch (error) {
      setSubmitStatus("error");
      console.error(error);
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      id: 1,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anjef-dangol-916804369/",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      color: "#0077B5",
      description: "Connect with me on LinkedIn"
    },
    {
      id: 2,
      name: "GitHub",
      url: "https://github.com/anjef1010",
      icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
      color: "#333",
      description: "Check out my projects on GitHub"
    },
    {
      id: 3,
      name: "Email",
      url: "mailto:danjefff1001@gmail.com?subject=Let's Connect",
      icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
      color: "#EA4335",
      description: "Send me an email directly"
    },
  ];

  return (
    <div className="contact-window-overlay">
      <div className="contact-window fade-in">
        <div className="contact-header">
          <div className="contact-title">Contact</div>
          <div className="window-controls">
            <button className="window-btn yellow" title="Minimize" />
            <button className="window-btn green" title="Maximize" />
            <button className="window-btn red" onClick={onClose} title="Close" />
          </div>
        </div>

        <div className="contact-content">
          <div className="content-section">
            <h2 className="contact-heading">Contact Me</h2>
            <p className="contact-description">
              I'm <strong>Anjef Dangol</strong>, a dedicated React developer specializing in building 
              dynamic and user-centric web applications. Whether you have a project proposal, 
              collaboration opportunity, or any inquiries, I welcome the chance to connect and 
              explore how we can create impactful solutions together.
            </p>

            {/* Interactive Contact Cards */}
            <div className="contact-cards-container">
              {contactLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`contact-card ${activeCard === link.id ? "active" : ""}`}
                  style={{ "--card-color": link.color, "--delay": `${index * 0.1}s` }}
                  onMouseEnter={() => setActiveCard(link.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  title={link.description}
                >
                  <div className="card-icon-wrapper">
                    <img src={link.icon} alt={link.name} className="card-icon" />
                  </div>
                  <div className="card-content">
                    <h3 className="card-name">{link.name}</h3>
                    <p className="card-description">{link.description}</p>
                  </div>
                  <div className="card-arrow">→</div>
                </a>
              ))}
            </div>

            {/* Download Resume */}
            <a href="/assets/AnjefCV.pdf" download className="download-resume">
              📄 Download Resume
            </a>
          </div>

          {/* Contact Form Section */}
          <div className="form-section">
            <h3 className="form-heading">Send me a Message</h3>
            
            {submitStatus && (
              <div className={`status-message ${submitStatus}`}>
                {submitStatus === "success" ? (
                  <>✓ Message sent successfully!</>
                ) : (
                  <>✕ Failed to send message. Please try again.</>
                )}
              </div>
            )}

            <form ref={form} className="contact-form" onSubmit={sendEmail} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.user_name ? "input-error" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.user_name && (
                  <span className="error-message">{errors.user_name}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.user_email ? "input-error" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.user_email && (
                  <span className="error-message">{errors.user_email}</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message (minimum 10 characters)"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-textarea ${errors.message ? "input-error" : ""}`}
                  disabled={isSubmitting}
                  rows="4"
                ></textarea>
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;