/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/useToaster";
import CreateNote from "./CreateNote";
import NotesList from "./Noteslist";
import SearchList from "./SearchList";

const HomePage = () => {
  const toast = useToast();
  const username = localStorage.getItem("username");
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authenticated");
    if (isLoggedIn) {
      setAuthenticated(isLoggedIn);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");

    toast.success("logged out successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    // window.location.reload();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/search?q=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("search result is ready!");
      setSearchResults(response.data);
    } catch (error) {
      toast.error("searching failed");
      console.error("Error searching notes:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="flex items-center justify-between py-2 border-b mx-4">
        <div className="flex items-center gap-16">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>
          {isAuthenticated && (
            <div className="ml-4">
              <input
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded ml-2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <span className="mr-2">Hello, {username}!</span>
              <button
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-4"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {!isAuthenticated && (
        <div className="text-center mt-[150px]">
          <h1 className="text-6xl font-bold mb-4">Welcome to Notely</h1>
          <p className="text-xl mb-8">
            Your go-to platform for organizing and sharing notes.
          </p>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Sign Up
          </Link>
        </div>
      )}
      <div className="my-8">
        {isAuthenticated && (
          <>
            <CreateNote />
            {searchQuery.trim() !== "" ? (
              <SearchList searchResults={searchResults} />
            ) : (
              <NotesList />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
