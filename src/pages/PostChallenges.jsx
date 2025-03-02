"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "../styles/PostChallengesStyles.css";
import "../styles.css";



function PostChallenges() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [challenges, setChallenges] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChallenge = {
      id: Date.now(),
      title,
      description,
      specialization,
    };
    setChallenges([...challenges, newChallenge]);
    setTitle('');
    setDescription('');
    setSpecialization('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 gradient-text">Post Challenges or Sponsorships</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Create New Challenge</h2>
          <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Challenge Title"
              className="w-full p-2 mb-4 border rounded-lg bg-gray-900 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Challenge Description"
              className="w-full p-2 mb-4 border rounded-lg bg-gray-900 text-white"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Specialization"
              className="w-full p-2 mb-4 border rounded-lg bg-gray-900 text-white"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              Post Challenge
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Posted Challenges</h2>
          <motion.div layout className="space-y-4">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({ challenge }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-2 text-white">{challenge.title}</h3>
      <p className="text-gray-400 mb-2">{challenge.description}</p>
      <p className="text-gray-400">Specialization: {challenge.specialization}</p>
    </motion.div>
  );
}

export default PostChallenges;
