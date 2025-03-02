"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "../styles.css";


const initialProjects = [
  { id: 1, title: "AI Chatbot", student: "Alice Johnson", specialization: "AI" },
  { id: 2, title: "E-commerce Platform", student: "Bob Smith", specialization: "Web Development" },
  { id: 3, title: "Mobile Game", student: "Charlie Brown", specialization: "Mobile Development" },
  { id: 4, title: "Data Visualization Tool", student: "Diana Ross", specialization: "Data Science" },
]

function BrowseProjects() {
  const [projects, setProjects] = useState(initialProjects)
  const [shortlisted, setShortlisted] = useState([])
  const [filter, setFilter] = useState("")

  const handleShortlist = (project) => {
    if (!shortlisted.find((p) => p.id === project.id)) {
      setShortlisted([...shortlisted, project])
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(filter.toLowerCase()) ||
      project.student.toLowerCase().includes(filter.toLowerCase()) ||
      project.specialization.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 gradient-text">Browse Projects</h1>
      <input
        type="text"
        placeholder="Filter projects..."
        className="input w-full mb-6"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-200">All Projects</h2>
          <motion.div layout className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onShortlist={handleShortlist} />
            ))}
          </motion.div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Shortlisted Projects</h2>
          <motion.div layout className="space-y-4">
            {shortlisted.map((project) => (
              <ProjectCard key={project.id} project={project} shortlisted />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onShortlist, shortlisted }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-4">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-400">Student: {project.student}</p>
      <p className="text-gray-400 mb-4">Specialization: {project.specialization}</p>
      {!shortlisted && (
        <button onClick={() => onShortlist(project)} className="button-primary">
          Shortlist
        </button>
      )}
    </motion.div>
  )
}

export default BrowseProjects

