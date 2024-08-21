"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaPrint, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import LoadingSkeleton from "@components/LoadingSkeleton";
export default function BookingDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/booking/${id}`).then((response) => {
        setBooking(response.data);
      });
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!booking) {
    return <LoadingSkeleton/>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      {/* Top Bar with Icons */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 shadow-lg rounded-lg">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => router.push('/dashboard/bookings')}
        >
          <FaArrowLeft size={28} />
        </button>
        <div className="flex space-x-6">
          <button onClick={handlePrint} className="text-green-500 hover:text-green-700">
            <FaPrint size={28} />
          </button>
          <button className="text-yellow-500 hover:text-yellow-700">
            <FaEdit size={28} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrashAlt size={28} />
          </button>
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{booking.personalInfo.name}</h1>
            <p className="text-gray-700">{booking.personalInfo.email}</p>
            <p className="text-gray-700">{booking.personalInfo.phone}</p>
            <p className="text-gray-700">{booking.personalInfo.address}</p>
          </div>
          <img
            src="/logo.png" 
            alt="Company Logo"
            className="h-16 w-auto"
          />
        </div>

        <div className="border-l-4 border-blue-500 pl-4 py-4">
          <h2 className="text-xl font-bold text-gray-800">Services</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            {booking.services.map((service, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-lg">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="my-8 border-l-4 border-purple-500 pl-4 py-4">
          <h2 className="text-xl font-bold text-gray-800">Additional Information</h2>
          <p>
            <span className="font-semibold text-gray-800">Status:</span>{' '}
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Preferred Date:</span>{' '}
            {new Date(booking.personalInfo.preferredDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Preferred Time:</span>{' '}
            {booking.personalInfo.preferredTime}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Notes:</span> {booking.personalInfo.notes}
          </p>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <img
            src="/qrcode.png" // Placeholder for QR code
            alt="Scan Code"
            className="h-24 w-auto"
          />
          <p className="text-gray-600">
            Created At: {new Date(booking.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
