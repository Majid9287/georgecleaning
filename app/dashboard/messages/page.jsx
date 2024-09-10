"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import ConfirmationModal from "@components/DeleteConfirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmation1, setShowConfirmation1] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/contact?page=${page}&limit=10`, {
        cache: "no-store",
      });
      const data = await response.json();
      setContacts(data.contacts);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page]);

  const handleDelete = (id) => {
    setSelectedContact(id);
    setShowConfirmation(true);
  };
  const handleDeleteAll = () => {
    setShowConfirmation1(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/contact/${selectedContact}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("message deleted successfully.");
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== selectedContact)
        );
      } else {
        toast.error("Error in deleting message.");
        console.error("Failed to delete contact");
      }
    } catch (error) {
      toast.error("Error in deleting message.");
      console.error("Error deleting contact:", error);
    } finally {
      setSelectedContact(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedContact(null);
    setSelectedIds([]);
    setShowConfirmation1(false);
    setShowConfirmation(false);
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await fetch("/api/contact/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        setShowConfirmation1(false);
        toast.success("Selected messages deleted successfully.");
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => !selectedIds.includes(contact._id))
        );
        setSelectedIds([]);
      } else {
        setShowConfirmation1(false);
        toast.error("Error in deleting messages.");
        console.error("Failed to delete selected contacts");
      }
    } catch (error) {
      setShowConfirmation1(false);
      toast.error("Error in deleting messages.");
      console.error("Error deleting selected contacts:", error);
    }
  };

  const handleSelectAll = () => {
    setSelectedIds(contacts.map((contact) => contact._id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((item) => item !== id)
        : [...prevIds, id]
    );
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full px-2 py-2 md:py-12 ">
        <div className="flex items-center justify-left mb-6 border p-1">
          <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>
        </div>

        <div className="flex justify-left items-center mb-8 bg-white p-4 shadow-lg rounded-lg">
          <button
            onClick={handleSelectAll}
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Select All
          </button>
          {selectedIds.length > 0 && (
            <>
              <button
                onClick={handleDeselectAll}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Deselect All
              </button>
              <button
                onClick={handleDeleteAll}
                className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
              >
                Delete Selected
              </button>
            </>
          )}
        </div>

        {loading && (
          <div className="flex justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}

        {contacts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full shadow-lg bg-white border border-gray-400 rounded-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          e.target.checked
                            ? handleSelectAll()
                            : handleDeselectAll()
                        }
                        checked={selectedIds.length === contacts.length}
                      />
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">Name</th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Email
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Phone
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Message
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">Date</th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(contact._id)}
                          onChange={() => handleCheckboxChange(contact._id)}
                        />
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-center">
                        {contact.firstName} {contact.lastName}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-center">
                        {contact.email}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-center">
                        {contact.phoneNumber}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-center">
                        {contact.message}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-center">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-center">
                        <div className="flex justify-center space-x-2">
                          <BiTrash
                            className="text-red-500 text-xl cursor-pointer"
                            onClick={() => handleDelete(contact._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`flex items-center px-4 py-2 ${
                  page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                } rounded-md`}
              >
                <BsArrowLeft />
                <span className="ml-2">Previous</span>
              </button>
              <span className="mx-4">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`flex items-center px-4 py-2 ${
                  page === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
                } rounded-md`}
              >
                <span className="mr-2">Next</span>
                <BsArrowRight />
              </button>
            </div>
          </>
        ) : (
          !loading && (
            <div className="text-center mt-4">
              <p>No contacts available</p>
            </div>
          )
        )}
        {showConfirmation1 && (
          <ConfirmationModal
            onConfirm={handleDeleteSelected}
            onCancel={handleCancelDelete}
            text="Are you sure you want to delete this Messages"
          />
        )}
        {showConfirmation && (
          <ConfirmationModal
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            text="Are you sure you want to delete this Message"
          />
        )}
      </div>
    </section>
  );
};

export default ContactList;
