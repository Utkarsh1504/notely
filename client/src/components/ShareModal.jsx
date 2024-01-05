/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
import "../share-modal.css";

const ShareModal = ({ isOpen, onRequestClose, onShare }) => {
  const [username, setUsername] = useState("");

  const handleShare = () => {
    onShare(username);
    setUsername("");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
    >
      <div className="modal-content p-4 max-w-xs mx-auto bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Share Note</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleShare}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Share
          </button>
          <button
            onClick={onRequestClose}
            className="text-white bg-red-500 hover:bg-red-600 rounded p-2"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
