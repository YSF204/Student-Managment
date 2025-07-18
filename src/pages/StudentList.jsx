import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import "../components/Main.css";
export default function StudentList({ searchTerm = "" }) {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch students");
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  // Function to handle deleting a student
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" })
      .then(() => {
        // Remove the deleted student from the state
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  // Filter students by search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>D/E</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => handleDelete(student.id)}>
                  <FaTrash />
                </button>
                <button onClick={() => navigate(`/edit/${student.id}`)}>
                  <MdModeEditOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <ul className="Studnet-Display">
        {filteredStudents.map((student) => (
          <li key={student.id}>
            <span style={{ color: "black" }}>
              {student.name} - Age: {student.age}, Grade: {student.grade}
            </span>
            <button onClick={() => handleDelete(student.id)}>Delete</button>{" "}
            <button onClick={() => navigate(`/edit/${student.id}`)}>
              Edit
            </button>
          </li>
        ))}
      </ul> */}
    </>
  );
}
