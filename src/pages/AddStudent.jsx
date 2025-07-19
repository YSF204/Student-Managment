import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: parseInt(age), grade }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add student");
        return response.json();
      })
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="add-student-container">
      <form className="add-student-form" onSubmit={handleSubmit}>
        <h1>Add New Student</h1>
        <input
          className="add-student-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="add-student-input"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
          min={0}
        />
        <input
          className="add-student-input"
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Grade"
          required
        />
        <button className="add-student-btn" type="submit">
          Add Student
        </button>
      </form>
    </div>
  );
}
