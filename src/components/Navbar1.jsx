"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar1.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          Recruiter<span>Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <NavLink to="/browse-projects">Browse Projects</NavLink>
          <NavLink to="/contact-students">Contact Students</NavLink>
          <NavLink to="/post-challenges">Post Challenges</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
   

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mobile-menu"
        >
          <NavLink to="/browse-projects" onClick={() => setIsOpen(false)}>Browse Projects</NavLink>
          <NavLink to="/contact-students" onClick={() => setIsOpen(false)}>Contact Students</NavLink>
          <NavLink to="/post-challenges" onClick={() => setIsOpen(false)}>Post Challenges</NavLink>
        </motion.div>
      )}
    </header>
  );
}

function NavLink({ to, children, onClick }) {
  return (
    <Link to={to} className="nav-item" onClick={onClick}>
      {children}
    </Link>
  );
}

export default Navbar;
