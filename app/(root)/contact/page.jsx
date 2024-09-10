"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../Home.module.css";

import { FaSpinner } from "react-icons/fa";
export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid Email";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/contact/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" ">
        <div className={`relative  h-96 bg-[#453ee3]`}>
          <div
            className={`absolute inset-0 bg-gray-100 opacity-50 ${styles.pattern2} `}
          ></div>

          <div className="pt-24 absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl font-bold md:text-6xl">Get in Touch</h1>
            <p className="mt-4 text-lg md:text-2xl">
              Have questions or need help with our cleaning services? Fill out
              the form below, and our team will get back to you shortly.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl py-12 md:py-24 px-4">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                  Send Us a Message
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  We’re here to help with any of your cleaning needs.
                </p>
                <form className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="tel"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-600">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      id="message"
                      placeholder="Leave us a message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
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
                </form>
              </div>
            </div>
            <img
              alt="Contact us"
              className="hidden max-h-full w-full rounded-lg object-cover lg:block"
              src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
            />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
      <hr className="mt-6" />
    </div>
  );
}
