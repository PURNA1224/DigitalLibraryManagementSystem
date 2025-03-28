import React, { useState, useEffect } from "react";
import "../styles/ViewBooks.css";
import { fetchBooks, deleteBook, updateBook } from "../api";

function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState({
    bookId: null, // Include ID for updates
    title: "",
    author: "",
    genre: "",
    availability_status: "Available",
  });

  useEffect(() => {
    fetchBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (bookId) => {
    deleteBook(bookId)
      .then(() => {
        setBooks(books.filter((book) => book.bookId !== bookId));
      })
      .catch(() => alert("Error deleting book"));
  };

  const handleEdit = (book) => {
    setEditBook(book.bookId);
    setForm({
      bookId: book.bookId,
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "",
      availability_status: book.availability_status || "Available",
    });
  };

  const handleUpdate = () => {
    console.log(form);
    updateBook(form)
      .then(() => {
        setBooks(books.map((b) => (b.bookId === form.bookId ? form : b)));
        setEditBook(null); // Exit edit mode after update
      })
      .catch(() => alert("Error updating book"));
  };

  return (
    <div className="view-books-container">
      <h2>📖 View Books</h2>

      {/* Books List */}
      <ul className="books-list">
        {books.map((book) => (
          <li key={book.bookId}>
            <span>
              {book.title} - {book.author} ({book.genre})
            </span>
            <div className="action-buttons">
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book.bookId)}>Delete</button>
            </div>
            {/* Edit Form - Shows only when editing */}
            {editBook == book.bookId && (
              <div className="edit-form">
                <h3>✏️ Edit Book</h3>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Title"
                />
                <input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author"
                />
                <input
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  placeholder="Genre"
                />
                <select
                  value={form.availability_status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      availability_status: e.target.value,
                    })
                  }
                  style={{ width: "94%" }}
                >
                  <option value="Available">Available</option>
                  <option value="Checked Out">Checked Out</option>
                </select>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditBook(null)}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewBooks;
