import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import NavBar from "./components/navBar";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <NavBar onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<StudentList searchTerm={searchTerm} />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}
