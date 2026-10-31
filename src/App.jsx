import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        feedback
      );

      alert("Feedback submitted successfully!");

      setFeedback({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Unable to submit feedback. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <div className="form-header">
        
        <h1>Feedback Form</h1>

        <p className="subtitle">
          Your thoughts matter to us!
        </p>
        <p className="description">
          Please share your valuable feedback about the session.
        </p>
      </div>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="q1">Your Name</label>
          <input
            id="q1"
            type="text"
            name="q1"
            placeholder="Enter your name"
            value={feedback.q1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="q2">Department</label>
          <input
            id="q2"
            type="text"
            name="q2"
            placeholder="Enter your department"
            value={feedback.q2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="q3">Session Title</label>
          <input
            id="q3"
            type="text"
            name="q3"
            placeholder="Enter the session title"
            value={feedback.q3}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="q4">Your Feedback</label>
          <textarea
            id="q4"
            name="q4"
            placeholder="Tell us what you think..."
            value={feedback.q4}
            onChange={handleChange}
            onInput={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="q5">Suggestions</label>
          <textarea
            id="q5"
            name="q5"
            placeholder="Any suggestions for improvement?"
            value={feedback.q5}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          Submit
        </button>

        <p className="footer-text">
          <b>Thank you for sharing your thoughts! ♡</b>
        </p>
      </form>
    </div>
  );
}

export default App;