import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 ${isOpen ? "" : "hidden"}`}>
    <div className="bg-white w-80 p-6 rounded-md shadow-lg">
      <p className="text-lg font-semibold mb-4 text-gray-800">Are you sure you want to delete?</p>
      <div className="flex justify-end">
        <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-s-md mr-2 focus:outline-none focus:bg-red-600" onClick={onConfirm}>
          Confirm
        </button>
        <button className="px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-e-md focus:outline-none focus:bg-gray-400" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default DeleteConfirmationModal;
