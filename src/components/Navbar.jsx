import React from 'react';
import '../styles/Navbar.css';
const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/Dashboard">Dashboard</a></li>
            </ul>
        </nav>
    );
};
export default Navbar; 
