"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsArrowRight, BsArrowLeft, BsEye } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "@components/DeleteConfirmation";

const CardList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/service?page=${page}&limit=10`);
      const data = await response.json();
      setServices(data.posts);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page]);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/service/${id}/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: currentStatus === "active" ? "inactive" : "active",
        }),
      });

      if (response.ok) {
        const updatedService = await response.json();

        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === id
              ? { ...service, status: updatedService.updatedStatus }
              : service
          )
        );

        toast.success(
          `Service status updated to ${updatedService.updatedStatus}`
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  const handleSelectAll = () => {
    setSelectedIds(services.map((service) => service._id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleDeleteSelected = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/service/${id}`, {
            method: "DELETE",
          })
        )
      );

      setServices((prevServices) =>
        prevServices.filter((service) => !selectedIds.includes(service._id))
      );

      setSelectedIds([]);
      setShowConfirmation(false);
      toast.success("Selected services deleted successfully.");
    } catch (error) {
      console.error("Error deleting services:", error);
      toast.error("Error deleting services.");
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <div className="w-full px-2 py-2 md:py-12">
        <div className="flex items-center justify-left mb-6 border p-1">
          <h2 className="text-2xl font-bold text-gray-800">Service Details</h2>
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
                onClick={handleDeleteSelected}
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
        {services.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-400 shadow-sm rounded-md">
                <thead className="bg-gray-100 text-md border-b font-bold border-gray-400">
                  <tr>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(
                              services.map((service) => service._id)
                            );
                          } else {
                            setSelectedIds([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      View
                    </th>
                    <th className="px-6 py-3 text-left text-black uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr
                      key={service._id}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(service._id)}
                          onChange={() =>
                            setSelectedIds((prevIds) =>
                              prevIds.includes(service._id)
                                ? prevIds.filter((id) => id !== service._id)
                                : [...prevIds, service._id]
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{service.title}</td>
                      <td className="px-6 py-4">
                        <img
                          src={service.feature_img}
                          alt={service.title}
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">${service.price}</td>
                      <td className="px-6 py-4">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={service.status === "active"}
                            onChange={() =>
                              handleToggleStatus(service._id, service.status)
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <span className="ml-2">
                          {service.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/services/${service._id}`}>
                          <BsEye className="text-blue-500 text-2xl" />
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex text-center">
                          <Link
                            href={`/dashboard/services/${service._id}/update`}
                          >
                            <BiEdit className="text-blue-500 text-2xl" />
                          </Link>
                          <span className="mx-2">|</span>
                          <BiTrash
                            className="text-red-500 cursor-pointer text-2xl"
                            onClick={() => {
                              setSelectedService(service._id);
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
          !loading && (
            <div className="flex justify-center items-center mt-12">
              <p className="text-gray-500">No services found.</p>
            </div>
          )
        )}
        <ToastContainer />

        {showConfirmation && (
          <ConfirmationModal
            onCancel={() => setShowConfirmation(false)}
            onConfirm={handleConfirmDelete}
            text="Are you sure you want to delete the selected services?"
          />
        )}
      </div>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          border-radius: 50%;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #2196f3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </section>
  );
};

export default CardList;
