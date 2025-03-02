"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "../styles.css";


const initialStudents = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", project: "AI Chatbot" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", project: "E-commerce Platform" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", project: "Mobile Game" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", project: "Data Visualization Tool" },
]

function ContactStudents() {
  const [students] = useState(initialStudents)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [message, setMessage] = useState("")

  const handleSelectStudent = (student) => {
    setSelectedStudent(student)
    setMessage("")
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (selectedStudent && message) {
      alert(`Message sent to ${selectedStudent.name}: ${message}`)
      setMessage("")
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 gradient-text">Contact Students</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Student List</h2>
          <div className="space-y-4">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onSelect={handleSelectStudent}
                isSelected={selectedStudent?.id === student.id}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Send Message</h2>
          {selectedStudent ? (
            <form onSubmit={handleSendMessage} className="card p-4">
              <p className="mb-2 text-gray-300">To: {selectedStudent.name}</p>
              <textarea
                className="input w-full mb-4"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                required
              ></textarea>
              <button type="submit" className="button-primary">
                Send Message
              </button>
            </form>
          ) : (
            <p className="text-gray-400">Select a student to send a message.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StudentCard({ student, onSelect, isSelected }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`card p-4 cursor-pointer ${isSelected ? "ring-2 ring-accent-100" : ""}`}
      onClick={() => onSelect(student)}
    >
      <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
      <p className="text-gray-400">Project: {student.project}</p>
    </motion.div>
  )
}

export default ContactStudents

