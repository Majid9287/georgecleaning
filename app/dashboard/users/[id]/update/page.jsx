"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "@components/LoadingSkeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaArrowLeft } from "react-icons/fa";
// Define roles and their associated colors
const roles = [
  { role: "admin", color: "text-blue-500" },
  { role: "user", color: "text-green-500" },
  // Add other roles as needed
];

const UpdateUser = ({ params }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data);
        setRole(data.role);
        
      } catch (err) {
        toast.error("Error in updating user role.");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading1(true);
    try {
      const response = await fetch(`/api/user/${params.id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      if (!response.ok) throw new Error("Failed to update role");
      toast.success("User Role Updated successfully.");
    } catch (err) {
      toast.error("Error in updating user role.");
      setError(err.message);
    } finally {
      setLoading1(false);
    }
  };

  if (loading)
    return (
     
        <LoadingSkeleton />
     
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!user) return <p className="text-center text-gray-600">No user found</p>;

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
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
      <div className="flex justify-between items-center mb-8 bg-white p-4 shadow-lg rounded-lg">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => router.back()}
        >
          <FaArrowLeft size={28} />
        </button>
      </div>
      <section className=" mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Update User Role
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Name:</label>
            <p className="mt-1 text-gray-900">{user.name}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Role:</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {roles.map((role) => (
                <option key={role.role} value={role.role}>
                  {role.role}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
            disabled={loading1}
              type="submit"
              className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >  {loading1 ? (
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg> 
            ) : (
              "Update Role")}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateUser;
