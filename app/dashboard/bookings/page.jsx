"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import ConfirmationModal from "@components/DeleteConfirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const statuses = [
  { status: "processing", color: "text-yellow-500" },
  { status: "booked", color: "text-green-500" },
  { status: "cancelled", color: "text-red-500" },
  { status: "pending confirmation", color: "text-blue-500" },
  { status: "completed", color: "text-purple-500" },
  { status: "rescheduled", color: "text-orange-500" },
  { status: "failed", color: "text-gray-500" },
];

const CardList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmation1, setShowConfirmation1] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("pending confirmation");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/booking?status=${selectedStatus}&page=${page}&limit=10`,
        { next: { revalidate: 10 } }
      );
      const data = await response.json();
      setBookings(data.bookings);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedStatus, page]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setPage(1); // Reset to first page when status changes
  };

  const handleDelete = (id) => {
    setSelectedBooking(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/booking/${selectedBooking}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== selectedBooking)
        );
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    } finally {
      setSelectedBooking(null);
      setShowConfirmation(false);
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedBooking(null);
    setShowConfirmation(false);
    setShowConfirmation1(false);
    setSelectedIds([]);
  };
  const handleDeleteAll = () => {
    setShowConfirmation1(true);
  };
  const handleDeleteSelected = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch("/api/booking/delete_all", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => !selectedIds.includes(booking._id))
        );
        setSelectedIds([]);
      } else {
        console.error("Failed to delete selected bookings");
      }
    } catch (error) {
      console.error("Error deleting selected bookings:", error);
    } finally {
      setDeleteLoading(false);
      setShowConfirmation1(false);
    }
  };

  const handleSelectAll = () => {
    setSelectedIds(bookings.map((booking) => booking._id));
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
          <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
        </div>

        <div className="flex justify-left items-center mb-8 bg-white p-4 shadow-lg rounded-lg">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border p-2 rounded-md"
          >
            {statuses.map((status) => (
              <option key={status.status} value={status.status}>
                {status.status}
              </option>
            ))}
          </select>
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

        {bookings.length > 0 ? (
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
                        checked={selectedIds.length === bookings.length}
                      />
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Booking Date
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Service
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Booking Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Details
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-gray-300">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(booking._id)}
                          onChange={() => handleCheckboxChange(booking._id)}
                        />
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {booking.personalInfo.name}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {booking.services.map((service, idx) => (
                          <li key={idx}>{service}</li>
                        ))}
                      </td>
                      <td
                        className={`px-6 py-4 border-b border-gray-300 ${
                          statuses.find((s) => s.status === booking.status)
                            ?.color
                        }`}
                      >
                        {booking.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="text-sm font-medium text-gray-900">
                          <Link href={`/dashboard/bookings/${booking._id}`}>
                            <BsArrowRight className="text-blue-500  text-2xl" />
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="flex text-center">
                          <Link
                            href={`/dashboard/bookings/${booking._id}/update`}
                          >
                            <BiEdit className="text-blue-500  text-2xl" />
                          </Link>
                          <span className="mx-2">|</span>
                          <BiTrash
                            className="text-red-500 text-2xl"
                            onClick={() => handleDelete(booking._id)}
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
            <div className="flex justify-center items-center mt-12">
              <p className="text-gray-500">
                No bookings found for this status.
              </p>
            </div>
          )
        )}
      </div>
      {showConfirmation1 && (
        <ConfirmationModal
          isLoading={deleteLoading}
          onConfirm={handleDeleteSelected}
          onCancel={handleCancelDelete}
          text="Are you sure you want to delete this selected Bookings"
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          isLoading={deleteLoading}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          text="Are you sure you want to delete this Booking"
        />
      )}
    </section>
  );
};

export default CardList;
