import React, { useState } from "react";
import ViewBooks from "./components/ViewBooks";
import AddBook from "./components/AddBook";
import SearchBooks from "./components/SearchBooks";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <>
      <div className="header">
        <h1>📚 Digital Library Management</h1>
        <div className="nav-buttons">
          <button
            id="viewButton"
            onClick={() => {
              document.getElementById("searchButton").style.backgroundColor =
                "white";
              document.getElementById("searchButton").style.color = "#1e40af";
              document.getElementById("addButton").style.backgroundColor =
                "white";
              document.getElementById("addButton").style.color = "#1e40af";
              document.getElementById("viewButton").style.backgroundColor =
                "#03113f4b";
              document.getElementById("viewButton").style.color = "white";
              setActiveTab("view");
            }}
          >
            View
          </button>
          <button
            id="addButton"
            onClick={() => {
              document.getElementById("searchButton").style.backgroundColor =
                "white";
              document.getElementById("searchButton").style.color = "#1e40af";
              document.getElementById("viewButton").style.backgroundColor =
                "white";
              document.getElementById("viewButton").style.color = "#1e40af";
              document.getElementById("addButton").style.backgroundColor =
                "#03113f4b";
              document.getElementById("addButton").style.color = "white";
              setActiveTab("add");
            }}
          >
            Add
          </button>
          <button
            id="searchButton"
            onClick={() => {
              document.getElementById("addButton").style.backgroundColor =
                "white";
              document.getElementById("addButton").style.color = "#1e40af";
              document.getElementById("viewButton").style.backgroundColor =
                "white";
              document.getElementById("viewButton").style.color = "#1e40af";
              document.getElementById("searchButton").style.backgroundColor =
                "#03113f4b";
              document.getElementById("searchButton").style.color = "white";
              setActiveTab("search");
            }}
          >
            Search
          </button>
        </div>
      </div>
      {activeTab && (
        <div className="content-container">
          {activeTab === "view" && <ViewBooks />}
          {activeTab === "add" && <AddBook />}
          {activeTab === "search" && <SearchBooks />}
        </div>
      )}
    </>
  );
}

export default App;
