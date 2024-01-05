// CreateNote.js
import { useState } from "react";
import { useToast } from "../hooks/useToaster";
import axios from "axios";

const CreateNote = () => {
  const toast = useToast();
  const [noteData, setNoteData] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNoteData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/notes", noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Creating note:", res.data);
      setNoteData({ title: "", content: "" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("note created successfully");
    } catch (err) {
      toast.error("note creation failed");
      console.log(err);
    }
  };

  return (
    <div className="mb-4 ml-4">
      <h2 className="text-2xl font-semibold mb-4">Create a New Note</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={noteData.content}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full h-32"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateNote}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
