"use client";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ConfirmationModal = ({ onCancel, onConfirm, text, isLoading }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">{text}</h3>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="confirmationCheck"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="confirmationCheck" className="text-gray-700">
            I understand the consequences
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={`flex items-center justify-center text-white px-4 py-2 rounded-md ${
              isChecked
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
            onClick={onConfirm}
            disabled={!isChecked || isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
