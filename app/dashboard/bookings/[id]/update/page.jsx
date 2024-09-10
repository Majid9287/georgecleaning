"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSave, FaEnvelope, FaTimes, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import LoadingSkeleton from "@components/LoadingSkeleton";
import { toast, ToastContainer } from "react-toastify";
import AddServiceModal from "@components/AddServiceModal";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from 'react-icons/fa';
const statuses = [
  { status: "processing", color: "text-yellow-500" },
  { status: "booked", color: "text-green-500" },
  { status: "cancelled", color: "text-red-500" },
  { status: "pending confirmation", color: "text-blue-500" },
  { status: "completed", color: "text-purple-500" },
  { status: "rescheduled", color: "text-orange-500" },
  { status: "failed", color: "text-gray-500" },
];

export default function BookingUpdate() {
  const router = useRouter();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [originalFormData, setOriginalFormData] = useState({});
  const [formData, setFormData] = useState({
    status: "",
    name: "",
    phone: "",
    email: "",
    postcode: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    callingTime: "",
    notes: "",
    services: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [newServiceName, setNewServiceName] = useState(""); // State for the new service name

  useEffect(() => {
    if (id) {
      axios.get(`/api/booking/${id}`).then((response) => {
        const bookingData = response.data;
        setBooking(bookingData);
        const initialFormData = {
          status: bookingData.status,
          name: bookingData.personalInfo.name,
          phone: bookingData.personalInfo.phone,
          email: bookingData.personalInfo.email,
          postcode: bookingData.personalInfo.postcode,
          address: bookingData.personalInfo.address,
          preferredDate: bookingData.personalInfo.preferredDate.split("T")[0], // Format date for input
          preferredTime: bookingData.personalInfo.preferredTime,
          callingTime: bookingData.personalInfo.callingTime,
          notes: bookingData.personalInfo.notes,
          services: bookingData.services,
        };
        setOriginalFormData(initialFormData);
        setFormData(initialFormData);
      });
    }
  }, [id]);

  const hasChanges = () => {
    return JSON.stringify(originalFormData) !== JSON.stringify(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (index, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = value;
    setFormData({ ...formData, services: updatedServices });
  };

  const handleAddService = (newService) => {
    setFormData({ ...formData, services: [...formData.services, newService] });
  };

  const handleRemoveService = (index) => {
    if (confirm("Are you sure you want to remove this service?")) {
      const updatedServices = formData.services.filter((_, i) => i !== index);
      setFormData({ ...formData, services: updatedServices });
    }
  };

  const handleSave = async (sendEmail = false) => {
    const requiredFields = ["status", "name", "phone", "email", "address", "preferredDate", "preferredTime"];
  
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(`Please fill out the ${field} field.`);
        return; // Exit the function if a required field is empty
      }
    }
     // Validate that the services array is not empty
  if (!formData.services || formData.services.length === 0) {
    toast.error("Please add at least one service.");
    return; // Exit the function if no services are selected
  }

    try {
      await axios.put(`/api/booking/${id}/update`, formData);

      if (sendEmail) {
        await axios.post(`/api/send-email`, {
          email: formData.email,
          subject: `Booking Status Updated: ${formData.status}`,
          body: `
            Dear ${formData.name},
            Your booking status has been updated to "${formData.status}".
            Booking Details:
            Name: ${formData.name}
            Phone: ${formData.phone}
            Address: ${formData.address}
            Services: ${formData.services.join(", ")}
            Notes: ${formData.notes}
            Preferred Date: ${new Date(
              formData.preferredDate
            ).toLocaleDateString()}
            Preferred Time: ${formData.preferredTime}
            Status: ${formData.status}
          `,
        });
        toast.success("Booking updated and email sent successfully!");
      } else {
        toast.success("Booking updated successfully!");
      }

    } catch (error) {
      toast.error("Failed to update booking. Please try again.");
    }
  };

  if (!booking) {
    return <LoadingSkeleton />;
  }

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
      <div className="md:flex justify-between items-center mb-8 bg-white p-4 shadow-lg rounded-lg">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => router.push("/dashboard/bookings")}
        >
         <FaArrowLeft size={28} />
        </button>
        <div className="md:flex justify-between space-y-2 md:space-y-0 md:space-x-2">
          <button
            onClick={() => handleSave(false)}
            className={`flex items-center justify-center px-4 py-2 ${
              hasChanges()
                ? "bg-green-500 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white text-lg font-bold rounded`}
            disabled={!hasChanges()}
          >
            <FaSave className="mr-2" /> Save
          </button>
          <button
            onClick={() => handleSave(true)}
            className={`flex items-center justify-center px-4 py-2 ${
              hasChanges()
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white text-lg font-bold rounded`}
            disabled={!hasChanges()}
          >
            <FaEnvelope className="mr-2" /> Save & Send Email
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-lg font-bold rounded"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl mx-auto">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-8">
          Status-Info
        </h3>

        {/* Booking Status */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Booking Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {statuses.map((item, index) => (
              <option key={index} value={item.status} className={item.color}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-xl mx-auto mt-2">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-8">
          Services-Info
        </h3>
        <div className="space-y-6">
          {formData.services.map((service, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <button
                onClick={() => handleRemoveService(index)}
                className="bg-red-500 hover:bg-red-700 text-white p-2 rounded"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsModalOpen(true)} // Open the modal on button click
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Service
          </button>
        </div>
      </div>

      {/* Modal for adding service */}
      {isModalOpen && (
        <AddServiceModal
          onClose={() => setIsModalOpen(false)}
          onAddService={(newService) => {
            handleAddService(newService);
            setIsModalOpen(false);
          }}
        />
      )}

      
<div className="bg-white p-8 rounded-lg shadow-xl mx-auto mt-2">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-8">
          Personal-Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Postcode
            </label>
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preferred Time
            </label>
            <input
              type="text"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>



          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
