"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles.css";


function Home() {
  return (
    <main className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6 gradient-text"
      >
        Welcome to RecruiterHub
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl mb-8 text-gray-400"
      >
        Discover top talent, manage projects, and post exciting challenges all in one place.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          to="/browse-projects"
          title="Browse Projects"
          description="Explore and shortlist innovative student projects."
          icon="🔍"
        />
        <FeatureCard
          to="/contact-students"
          title="Contact Students"
          description="Connect directly with talented individuals."
          icon="✉️"
        />
        <FeatureCard
          to="/post-challenges"
          title="Post Challenges"
          description="Create exciting opportunities for students."
          icon="🏆"
        />
      </div>
    </main>
  )
}

function FeatureCard({ to, title, description, icon }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link to={to} className="card block p-6 h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-2xl font-semibold mb-2 gradient-text">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </Link>
    </motion.div>
  )
}

export default Home

