import React from "react";
import { FaGithub, FaLinkedin, FaTools, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import "../styles/Profile.css";

const Profile = () => {
  const handleGenerateResume = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8070/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: "12345" }), // Example user_id
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      // Trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert("Failed to generate resume. Check console for details.");
      console.error("Error generating resume:", error);
    }
  };

  return (
    <section className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src="https://avatars.githubusercontent.com/u/00000000"
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-info">
          <h2>John Doe</h2>
          <p className="bio">
            Passionate Full-Stack Developer & Open-Source Contributor.  
            Experienced in building scalable applications and mentoring students in software development.
          </p>
          <p className="bio-elaborated">
            With a strong background in JavaScript, Python, and cloud technologies,  
            I love solving complex problems and contributing to innovative projects.  
            Actively mentoring students and collaborating on cutting-edge technologies.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="tech-stack">
        <h3><FaTools className="icon" /> Tech Stack</h3>
        <p>JavaScript | React | Node.js | Express | MongoDB | Python | Docker | AWS | Git & GitHub</p>
      </div>

      {/* Education & Experience */}
      <div className="education-experience">
        <div className="education">
          <h3><FaGraduationCap className="icon" /> Education</h3>
          <p>Bachelor’s in Computer Science, XYZ University (2019-2023)</p>
        </div>
        <div className="experience">
          <h3><FaBriefcase className="icon" /> Experience</h3>
          <p>Software Engineer at ABC Tech | Open-Source Contributor</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="social-links">
        <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="social-btn github">
          <FaGithub /> GitHub
        </a>
        <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
          <FaLinkedin /> LinkedIn
        </a>
      </div>

      {/* Generate Resume Button */}
      <div className="resume-section">
        <button className="resume-btn" onClick={handleGenerateResume}>
          Generate Resume
        </button>
      </div>
    </section>
  );
};

export default Profile;
