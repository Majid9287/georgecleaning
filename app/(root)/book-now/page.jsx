"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../Home.module.css";
const BookingPage = () => {
  const services = [
    { id: 1, name: "Antiviral Sanitisation" },
    { id: 2, name: "End of Tenancy Cleaning" },
    { id: 3, name: "One Off Deep Cleaning" },
    { id: 4, name: "Carpet/ Rug Cleaning" },
    { id: 5, name: "Upholstery Cleaning" },
    { id: 6, name: "Oven Cleaning" },
    { id: 7, name: "Window Cleaning" },
    { id: 8, name: "Office Cleaning" },
  ];
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    postcode: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    callingTime: "anytime",
    notes: "",
  });
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState({});
  const [step1Error, setStep1Error] = useState("");

  useEffect(() => {
    if (step === 2) {
      setStep1Error("");
    }
  }, [step]);

  useEffect(() => {
    if (step === 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
        phone: "",
        email: "",
        postcode: "",
        address: "",
        preferredDate: "",
      }));
    }
  }, [step]);

  const handleCheckboxChange = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleNextStep = () => {
    if (selectedServices.length === 0) {
      setStep1Error("Please select at least one service.");
    } else {
      setStep1Error("");
      setStep(2);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    const australianPostcodeRegex = /^\d{4}$/;
    const australianPhoneRegex = /^(\+61|0)[2-478](\s?\d{4}\s?\d{4}|\d{3}\s?\d{3}|\d{2}\s?\d{2})$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!australianPhoneRegex.test(formData.phone))
      newErrors.phone = "Invalid Australian phone number.";
    if (!australianPostcodeRegex.test(formData.postcode))
      newErrors.postcode = "Invalid Australian postcode.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.preferredDate)
      newErrors.preferredDate = "Preferred date is required.";
    if (new Date(formData.preferredDate) < new Date())
      newErrors.preferredDate = "Please select a current or future date.";

    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateInputs();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else if (!agreement) {
      alert("Please agree to the terms.");
    } else {
      setErrors({});
      try {
        const response = await fetch("/api/booking/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedServices,
            personalInfo: formData,
            agreement,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          alert("Booking submitted successfully!");
          // Optionally, you can navigate or reset the form
        } else {
          const error = await response.text();
          alert(`Failed to submit booking: ${error}`);
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("An error occurred while submitting the booking.");
      }
    }
  };

  return (
    <div className="min-h-screen mt-24 flex flex-col items-center bg-gray-100">
      <div className="w-full md:max-w-2xl p-5 py-12 bg-white rounded-lg shadow-md">
        <div className="mb-5">
          <div className="flex justify-between mb-6">
            <div
              className={`w-1/2 text-center  ${
                step === 1 ? "font-bold text-indigo-600" : "text-gray-500"
              }`}
             
            >
              Step 1: Choose Services
            </div>
            <div
              className={`w-1/2 text-center  ${
                step === 2 ? "font-bold text-indigo-600" : "text-gray-500"
              }`}
             
            >
              Step 2: Personal Information
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Choose Services</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {services.map(({ id, name }) => (
                  <label key={id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(name)}
                      onChange={() => handleCheckboxChange(name)}
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="block p-2 bg-gray-200 rounded">
                      {name}
                    </span>
                  </label>
                ))}
              </div>
              {step1Error && (
                <p className="text-red-500 text-sm">{step1Error}</p>
              )}
              <button
                onClick={handleNextStep}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Personal Information
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    pattern="^\(?(\d{4})\)?[-]?(\d{3})[-]?(\d{3})$"
                    placeholder="04XX XXX XXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Postcode*</label>
                  <input
                    type="text"
                    name="postcode"
                    pattern="\d{4}"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.postcode && (
                    <p className="text-red-500 text-sm">{errors.postcode}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Address*</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Preferred Date*</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Preferred time*</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Preferred Time of Call
                  </label>
                  <select
                    name="callingTime"
                    value={formData.callingTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  >
                    <option value="anytime">Anytime</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    checked={agreement}
                    onChange={() => setAgreement(!agreement)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-700">
                    I agree to the terms and conditions.
                  </span>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
