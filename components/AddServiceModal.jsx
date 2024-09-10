import React, { useState } from "react";

export default function AddServiceModal({ onClose, onAddService }) {
  const [serviceName, setServiceName] = useState("");

  const handleAdd = () => {
    if (serviceName.trim()) {
      onAddService(serviceName);
    }
    onClose(); // Close the modal regardless
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Add New Service</h3>
        <input
          type="text"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter service name"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Service
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
