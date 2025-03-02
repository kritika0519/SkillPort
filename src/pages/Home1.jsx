import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to My Portfolio</h1>
        <p>Building modern, scalable, and high-performance applications.</p>
        <Link to="/projects" className="cta-button">
          View My Projects
        </Link>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Me</h2>
        <p>
          I'm a passionate **Full-Stack Developer** with expertise in modern web
          technologies like **React, Node.js, and MongoDB**. I love working on
          innovative projects and solving complex problems.
        </p>
        <Link to="/profile" className="secondary-button">
          More About Me
        </Link>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2>Featured Projects</h2>
        <div className="project-list">
          <div className="project-card">
            <h3>Project One</h3>
            <p>A cutting-edge web application built with React and Node.js.</p>
            <Link to="/projects" className="project-button">
              Learn More
            </Link>
          </div>

          <div className="project-card">
            <h3>Project Two</h3>
            <p>An AI-powered chatbot integrated with OpenAI API.</p>
            <Link to="/projects" className="project-button">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
