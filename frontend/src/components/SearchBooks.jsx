import React, { useState } from "react";
import "../styles/SearchBooks.css";
import { searchBook } from "../api";

function SearchBooks() {
  const [searchType, setSearchType] = useState("bookId"); // Default: Search by ID
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("Search by ID or Title");

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setMessage("Please enter a search value.");
      return;
    }
    // let bookId = searchValue;
    searchBook(searchType, searchValue)
      .then((res) => {
        setBooks(res.data ? [res.data] : []);
        console.log(res);
        setMessage(res.data ? "" : "Book not found.");
      })
      .catch(() => setMessage("error accessing data"));
  };

  return (
    <div className="search-books-container">
      <h2>🔍 Search Books</h2>

      {/* Search Type Selection */}
      <div className="search-options">
        <label>
          <input
            type="radio"
            name="searchType"
            value="bookId"
            checked={searchType === "bookId"}
            onChange={() => {
              setSearchType("bookId");
              setSearchValue("");
            }}
          />
          <span style={{ marginRight: "10px" }}>Search by ID</span>
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="title"
            checked={searchType === "title"}
            onChange={() => {
              setSearchType("title");
              setSearchValue("");
            }}
          />
          <span>Search by Title</span>
        </label>
      </div>

      {/* Search Input Field */}
      <input
        type="text"
        placeholder={`Enter ${searchType === "bookId" ? "ID" : "Title"}`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {/* Search Results */}
      {message && <p>{message}</p>}
      {books.length > 0 && (
        <ul className="books-list">
          {books.map((book) => (
            <li key={book.bookId}>
              {book.title} - {book.author} ({book.genre})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBooks;
