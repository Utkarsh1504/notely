/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useToast } from "../hooks/useToaster";
import { FaShare, FaTrash, FaEdit } from "react-icons/fa";
import ShareModal from "./ShareModal";
import UpdateNoteModal from "./UpdateModal";

const NoteCard = ({ note }) => {
  const toast = useToast();
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const colors = [
    "#FFD700",
    "#90EE90",
    "#ADD8E6",
    "#FFA07A",
    "#98FB98",
    "#FFC0CB",
    "#00CED1",
    "#FF6347",
    "#BA55D3",
    "#87CEFA",
    "#F08080",
    "#20B2AA",
    "#40E0D0",
    "#FF4500",
    "#8A2BE2",
    "#5F9EA0",
    "#FFB6C1",
    "#87CEEB",
    "#FFD700",
  ];

  const handleShare = async (username) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `/api/notes/${note._id}/share`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("note shared successfully");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error("note sharing failed");
    }
  };

  const handleUpdate = async (updatedNote) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/notes/${note._id}`,
        { title: updatedNote.title, content: updatedNote.content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updation", res.data);
      // window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 500);
      toast.success("note updated successfully");
    } catch (err) {
      toast.error("updation failed");
      console.log(err);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Deleting note:", res.data);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      toast.success("note deleted successfully");
    } catch (err) {
      toast.error("deletion failed");
      console.log(err);
    }
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const cardStyle = {
    backgroundColor: getRandomColor(),
  };

  return (
    <>
      <ShareModal
        isOpen={isShareModalOpen}
        onRequestClose={() => setShareModalOpen(false)}
        onShare={handleShare}
      />
      <UpdateNoteModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onUpdate={handleUpdate}
        note={note}
      />
      <div
        className="max-w-md mx-auto border p-4 my-4 rounded-md"
        style={cardStyle}
      >
        <h3
          className="text-lg font-semibold"
          onClick={() => console.log("get-by-id")}
        >
          {note.title}
        </h3>
        <p className="my-2">{note.content}</p>
        <div className="flex justify-between items-center mt-4 gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-full"
            onClick={() => setShareModalOpen(true)}
          >
            <FaShare className="text-2xl" />
          </button>
          <button
            className="bg-red-400  hover:bg-red-600 text-white px-3 py-2 rounded-full"
            onClick={() => handleDelete(note._id)}
          >
            <FaTrash className="text-2xl" />
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full"
            onClick={() => setUpdateModalOpen(true)}
          >
            <FaEdit className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
