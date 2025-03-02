import React from 'react';
import '../styles/ProjectCard.css';
const ProjectCard = ({ title, description }) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};
export default ProjectCard;