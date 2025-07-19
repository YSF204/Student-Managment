import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navBar.css";
import { CiSearch } from "react-icons/ci";

export default function NavBar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <nav>
      <Link to="/" className="title">
        Student Management
      </Link>
      <div
        className={`menu${menuOpen ? " open" : ""}`}
        onClick={handleMenuClick}
        aria-label="Toggle menu"
        tabIndex={0}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "show" : ""}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" onClick={() => setMenuOpen(false)}>
            Add Student
          </NavLink>
        </li>
        <li className="mobile-search-bar">
          <input
            type="text"
            className="search-bar"
            placeholder="Search students..."
            value={search}
            onChange={handleSearch}
          />
        </li>
      </ul>
      <input
        type="text"
        className="search-bar desktop-search-bar"
        placeholder="Search students..."
        value={search}
        onChange={handleSearch}
      />
    </nav>
  );
}
