"use client";
import React, { useState, useEffect } from "react";
import styles from "../../Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const BookingPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/"); // Redirect to homepage or any other page
  };

  const [services, setServices] = useState([]);
  const [step, setStep] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setiSSubmit] = useState(false);
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
    if (services.length === 0) {
      setisLoading(true);
      const fetchServices = async () => {
        try {
          const response = await fetch("/api/service/title", {
            cache: "force-cache",
          });
          const data = await response.json();
          setServices(data.services);
        } catch (error) {
          console.error("Failed to fetch services:", error);
        } finally {
          setisLoading(false);
        }
      };
      fetchServices();
    }
  }, [services]);

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

  const handleCheckboxChange = (serviceId, serviceTitle) => {
    setSelectedServices((prev) =>
      prev.some((s) => s.id === serviceId)
        ? prev.filter((s) => s.id !== serviceId)
        : [...prev, { id: serviceId, title: serviceTitle }]
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
    const australianPhoneRegex =
      /^(\+61|0)[2-478](\s?\d{4}\s?\d{4}|\d{3}\s?\d{3}|\d{2}\s?\d{2})$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!australianPhoneRegex.test(formData.phone))
      newErrors.phone = "Invalid Australian phone number.";
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
      toast.error("Please fill in all required fields correctly.");
    } else if (!agreement) {
      toast.error("Please agree to the terms.");
    } else {
      setErrors({});
      setLoading(true);
      try {
        const response = await fetch("/api/booking/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedServices: selectedServices.map((service) => service.title), // Send only titles
            personalInfo: formData,
            agreement,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success("Booking submitted successfully!");
          setFormData({
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
          setSelectedServices([]);
          setAgreement(false);
          setiSSubmit(true);
        } else {
          const error = await response.text();
          toast.error(`Failed to submit booking: ${error}`);
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        toast.error("An error occurred while submitting the booking.");
      } finally {
        setLoading(false);
      }
    }
  };
  if (isSubmit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-indigo-600 text-white p-8">
        <div className="bg-white mt-32 text-gray-800 rounded-lg shadow-lg p-10 md:p-16 lg:p-20 w-full md:w-3/4 lg:w-1/2 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Thank You for Your Submission!
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            We have received your details. Our team will contact you shortly to
            confirm your booking. We appreciate your trust in our services!
          </p>
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-24 flex flex-col px-1 items-center bg-gray-100 ${styles.pattern}`}
    >
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
      <div className="w-full md:max-w-2xl p-5 my-24  bg-white rounded-lg shadow-md">
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
              {isLoading && (
                <>
                  {" "}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
                    <Skeleton
                      height={50}
                      className="w-full px-2"
                      style={{ marginBottom: "20px" }}
                    />
                    <Skeleton
                      height={50}
                      className="w-full px-2"
                      style={{ marginBottom: "20px" }}
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {services &&
                  services.length > 0 &&
                  services.map(({ _id, title }) => (
                    <label key={_id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedServices.some((s) => s.id === _id)}
                        onChange={() => handleCheckboxChange(_id, title)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span className="block p-2 bg-gray-200 rounded">
                        {title}
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
                    className={`flex items-center justify-center text-white px-4 py-2 rounded-md bg-blue-800`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
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
