/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";

const NotesList = ({ searchResults }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 ml-4">
        {searchResults && searchResults.length > 0
          ? "Search Results"
          : "Your Notes"}
      </h2>
      <div className="flex flex-wrap justify-evenly w-full">
        {notes.length !== 0 ? (
          notes.map((note) => <NoteCard key={note._id} note={note} />)
        ) : (
          <p className="text-2xl font text-gray-400">
            You haven't created any notes yet!
          </p>
        )}
      </div>
    </>
  );
};

export default NotesList;
