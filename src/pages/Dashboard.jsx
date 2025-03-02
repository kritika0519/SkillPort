import { useState, useEffect } from "react";
import axios from "axios";
import { FaCode, FaStar, FaGithub, FaComment } from "react-icons/fa";
import "../styles/Dashboard.css";

const GITHUB_USERNAME = "khushi-51"; // Replace with actual GitHub username

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [reviews, setReviews] = useState([]); // Store reviews

  useEffect(() => {
    axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user:", error));

    axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then(response => setRepos(response.data))
      .catch(error => console.error("Error fetching repos:", error));
  }, []);

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleReviewClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleReviewSubmit = () => {
    const validRating = Math.min(5, Math.max(1, parseInt(review.rating) || 1));

    const newReview = {
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      rating: validRating,
      comment: review.comment,
    };

    setReviews([...reviews, newReview]); // Store review
    console.log("Review Submitted:", newReview);

    setShowModal(false);
    setReview({ rating: "", comment: "" });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <br />

      {/* Profile Section */}
      {user && (
        <div className="profile-section">
          <img src={user.avatar_url} alt="Avatar" className="profile-img" />
          <div className="profile-info">
            <h2>{user.name || user.login}</h2>
            <p className="bio">{user.bio}</p>
            <p>
              Followers: <strong>{user.followers}</strong> | Repos: <strong>{user.public_repos}</strong>
            </p>
            <a href={user.html_url} className="github-link">
              <FaGithub /> View GitHub
            </a>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search Projects"
        className="search-input"
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <br />

      {/* Project Cards */}
      <div className="projects-grid">
        {filteredRepos.map((repo) => (
          <div key={repo.id} className="project-card">
            <h3>{repo.name}</h3>
            <p className="description">{repo.description || "No description available"}</p>
            <p className="language">{repo.language || "Unknown"}</p>

            <div className="buttons">
              <a href={repo.html_url} className="code-btn">
                <FaCode /> Code
              </a>
              {repo.homepage && (
                <a href={repo.homepage} className="live-btn">Live Demo</a>
              )}
              <button className="review-btn" onClick={() => handleReviewClick(repo)}>
                <FaComment /> Review
              </button>
            </div>

            <div className="stars">
              <FaStar className="star-icon" /> {repo.stargazers_count}
            </div>

            {/* Display Reviews for Each Project */}
            <div className="reviews-section">
              {reviews
                .filter((review) => review.projectId === repo.id)
                .map((r, index) => (
                  <div key={index} className="review">
                    <p><strong>Rating:</strong> ⭐{r.rating}/5</p>
                    <p><strong>Comment:</strong> {r.comment}</p>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showModal && selectedProject && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Review {selectedProject.name}</h2>
            <label>Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
            />
            <label>Comment:</label>
            <textarea
              value={review.comment}
              onChange={(e) => setReview({ ...review, comment: e.target.value })}
            ></textarea>
            <div className="modal-buttons">
              <button className="submit-btn" onClick={handleReviewSubmit}>Submit</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
