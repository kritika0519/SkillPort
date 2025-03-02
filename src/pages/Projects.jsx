import React from 'react';
import ProjectCard from '../components/ProjectCard';
import '../styles/Projects.css';

const Projects = () => {
    return (
        <section>
            <h2>Projects</h2>
            <ProjectCard title="Project 1" description="Description of Project 1" />
            <ProjectCard title="Project 2" description="Description of Project 2" />
        </section>
    );
};

export default Projects;
