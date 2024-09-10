"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import ConfirmationModal from "@components/DeleteConfirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const roles = [
  { role: "all", color: "text-black-500" },
  { role: "admin", color: "text-blue-500" },
  { role: "user", color: "text-green-500" },

  // Add other roles as needed
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/user?roles=${selectedRole}&page=${page}&limit=10`,
        { cache:"no-store" }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedRole, page]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setPage(1); // Reset to first page when role changes
  };

 
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/user/${selectedUser}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("User deleted successfully.");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== selectedUser)
        );
      } else {
        toast.error("Error in deleting user.");
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setSelectedUser(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setShowConfirmation(false);
  };

 

  


  return (
    <section className="bg-gradient-to-r from-gray-100 to-blue-100 min-h-screen">
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
      <div className="w-full px-2 py-2 md:py-12">
        <div className="flex items-center justify-left mb-6 border p-1">
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        </div>

        <div className="flex justify-left items-center mb-8 bg-white p-4 shadow-lg rounded-lg">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="border p-2 rounded-md"
          >
            {roles.map((role) => (
              <option
                key={role.role}
                value={role.role === "all" ? "" : role.role}
              >
                {role.role}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
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
        ) : (
          <>
            {users.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full shadow-md bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-black uppercase  ">
                          Photo
                        </th>
                        <th className="px-6 py-3 text-left text-black uppercase  ">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-black uppercase  ">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-black uppercase  ">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-black uppercase  ">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={
                                    user.profile ||
                                    "https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y"
                                  }
                                  alt={`${user.name}'s profile`}
                                />
                              </div>
                            </div>
                          </td>
                          <td className=" px-6 py-4  ">
                            {user.name}
                          </td>
                          <td className=" px-6 py-4  ">
                            {user.email}
                          </td>
                          <td
                            className={` px-6 py-4   ${
                              roles.find((r) => r.role === user.role)?.color
                            }`}
                          >
                            {user.role}
                          </td>
                          <td className="px-6 py-4  ">
                            <div className="flex text-center">
                              <Link
                                href={`/dashboard/users/${user._id}/update`}
                              >
                                <BiEdit className="text-blue-500 text-2xl" />
                              </Link>
                              <span className="mx-2">|</span>
                              <BiTrash
                                className="text-red-500 cursor-pointer text-2xl"
                                onClick={() => {
                                    setSelectedUser(user._id)
                                  setShowConfirmation(true);
                                }}
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
              <p>No users found</p>
            )}
          </>
        )}
      </div>
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          text="Are you sure you want to delete this user?"
        />
      )}
    </section>
  );
};

export default UserManagement;
