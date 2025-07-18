import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/Edit.css";

export default function EditStudent() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setAge(data.age);
        setGrade(data.grade);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: parseInt(age), grade }),
    })
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Student</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        min={1}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "" || parseInt(val) >= 1) setAge(val);
        }}
        placeholder="Age"
        required
      />
      <input
        type="text"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        placeholder="Grade"
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}
