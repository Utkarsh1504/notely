/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
import "../share-modal.css";

const UpdateNoteModal = ({
  isOpen,
  onClose,
  onUpdate,
  note
}) => {
  const [updatedNote, setUpdatedNote] = useState({
    title: note.title,
    content: note.content,
  });
  
  const handleEdit = (e) => {
    const { name, value } = e.target;
    setUpdatedNote((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(updatedNote);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="modal-content p-4 mx-auto bg-white rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Note</h2>
        <input
          type="text"
          name="title"
          className="w-full p-2 border rounded mb-4"
          value={updatedNote.title}
          onChange={handleEdit}
          placeholder="Enter updated title"
        />
        <textarea
          name="content"
          className="w-full p-2 border rounded mb-4"
          value={updatedNote.content}
          onChange={handleEdit}
          placeholder="Enter updated content"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default UpdateNoteModal;
