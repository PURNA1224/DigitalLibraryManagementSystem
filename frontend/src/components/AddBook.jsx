import React, { useState } from "react";
import "../styles/AddBook.css";
import { addBook } from "../api";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    availability_status: "Available",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log(form);
    addBook(form)
      .then(() => setMessage("Book added successfully!"))
      .catch(() => setMessage("Error adding book"));
  };

  return (
    <div className="add-book-container">
      <h2>📕 Add Book</h2>
      <input
        name="title"
        placeholder="Title"
        onChange={handleInputChange}
        required
      />
      <input
        name="author"
        placeholder="Author"
        onChange={handleInputChange}
        required
      />
      <input name="genre" placeholder="Genre" onChange={handleInputChange} />
      <select
        name="availability_status"
        onChange={handleInputChange}
        style={{ width: "95%" }}
      >
        <option value="Available">Available</option>
        <option value="Checked Out">Checked Out</option>
      </select>
      <button onClick={handleSubmit}>Add Book</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBook;
