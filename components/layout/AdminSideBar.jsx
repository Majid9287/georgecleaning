"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser, FaTruck, FaEnvelope, FaBloggerB } from "react-icons/fa";
import { PiDotFill } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

import { BsCalendarCheck, BsListCheck } from "react-icons/bs";
const AdminLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  console.log("path", pathname.startsWith("/dashboard/services/"))
  const [AccountDropdown, setAccountDropdown] = useState(false);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(true);
  const [isAdmin, setisAdmin] = useState(true);
  const [introDropdownOpen, setintroDropdownOpen] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false); // State to control side navbar visibility

  useEffect(() => {
    // Close the menu when the route changes
    setShowSideNav(false);
  }, [router.asPath]);
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleintroDropdown = () => {
    setintroDropdownOpen(!introDropdownOpen);
  };

  const handelAccountDropdown = () => {
    setAccountDropdown(!AccountDropdown);
  };

  return (
    <div className="flex">
      <nav
        className={`${
          showSideNav ? "md:flex" : "hidden" // Use the showSideNav state to control visibility
        } custom-scrollbar w-full md:w-64 bg-gray-800 md:flex text-white overflow-y-scroll`}
        style={{ height: "100vh" }}
      >
        <style>
          {`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          border-radius: 50px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937; /* Track background color */
        }
       
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937; /* Scrollbar thumb color */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          border-radius: 50px;
          background: #555; /* Scrollbar thumb color on hover */
        }
      `}
        </style>
        <ul className="flex flex-col flex-1">
          <li className={`px-4 py-6 `}>
            <div className="flex p-2 justify-between">
              <div className="flex">
                <img
                  src="/logowhite.png" // Example logo
                  alt="Company Logo"
                  className="h-16 w-auto"
                />
              </div>
              <div
                className="md:hidden"
                onClick={(e) => {
                  toggleSideNav(); // Function to show/hide the dropdown
                }}
              >
                <IoIosCloseCircle className="font-bold text-2xl mt-1" />
              </div>
            </div>
          </li>
          <div className="mt-4">
            <li className={`px-4 py-1`}>
              <Link href="/dashboard/bookings">
                <div
                  className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                    pathname.startsWith("/dashboard/bookings")? "bg-amber-500"
                      : ""
                  }`}
                >
                  <div className="flex">
                    <BsCalendarCheck className="mr-2 mt-1" />{" "}
                    <h1 className="font-bold">Booking</h1>
                  </div>
                </div>
              </Link>
            </li>
          </div>
          <div>
            <li className={`px-4 py-1`}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleintroDropdown(); // Function to show/hide the dropdown
                }}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  pathname.startsWith("/dashboard/services")  ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <BsListCheck className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">Services</h1>
                </div>
                <div>
                  {!introDropdownOpen && (
                    <IoMdArrowDropright className="mr-2 mt-1" />
                  )}
                  {introDropdownOpen && (
                    <IoMdArrowDropdown className="mr-2 mt-1" />
                  )}
                </div>
              </div>
            </li>

            {introDropdownOpen && (
              <>
                <Link href="/dashboard/services/create">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 mx-4 rounded-md hover:bg-amber-400 ${
                         pathname === "/dashboard/services/create" ? "bg-amber-300" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">Create New</h1>
                    </div>
                  </li>
                </Link>

                <Link href="/dashboard/services">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 mx-4 mt-2 rounded-md hover:bg-amber-400 ${
                        pathname === "/dashboard/services"? "bg-amber-300" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">List</h1>
                    </div>
                  </li>
                </Link>
              </>
            )}
          </div>
          <div>
            <li className={`px-4 py-1`}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <FaUser className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">User</h1>
                </div>
              </div>
            </li>
          </div>
          <Link href="/adminDashboard/message/list">
            <li className={`px-4 py-1`}>
              <div
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  router.pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <FaEnvelope className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">Message</h1>
                </div>
              </div>
            </li>
          </Link>

          <Link href="/adminDashboard/user/users" className="hidden">
            <li
              className={`p-4 hover:bg-amber-400 ${
                router.pathname === "/adminDashboard/user/users"
                  ? "bg-amber-500"
                  : ""
              }`}
            >
              <div className="flex">
                <FaUser className="mr-2 mt-1" />{" "}
                <h1 className="font-bold">Users</h1>
              </div>
            </li>
          </Link>

          <Link href="/adminDashboard/message/message" className="hidden">
            <li
              className={`p-4 hover:bg-amber-400 ${
                router.pathname === "/adminDashboard/message//message"
                  ? "bg-amber-500"
                  : ""
              }`}
            >
              <div className="flex">
                <FaEnvelope className="mr-2 mt-1" />{" "}
                <h1 className="font-bold">Message</h1>
              </div>
            </li>
          </Link>
        </ul>
      </nav>

      <main className="flex-1 overflow-y-scroll" style={{ height: "100vh" }}>
        {/* Header */}
        <nav
          className={`${
            showSideNav ? "hidden" : "flex" // Use the showSideNav state to control visibility
          } h-16 px-2 bg-gray-800 text-white md:flex items-center justify-between md:justify-end`}
        >
          <span className=" flex md:hidden font-bold text-lg cursor-pointer">
            <TiThMenu className="font-bold" onClick={toggleSideNav} />
          </span>

          <div className=" flex  space-x-5  ">
            <span
              className=" md:flex  hover:text-gray-400"
              onMouseEnter={() => {
                handelAccountDropdown(true);
              }}
              onMouseLeave={() => {
                handelAccountDropdown(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {AccountDropdown && (
                <div
                  className={`absolute right-1 mt-4 px-6 py-2 bg-white rounded-lg shadow-lg`}
                  style={{ zIndex: 50 }}
                >
                  <ul className="py-2">
                    {isUserLoggedIn ? (
                      // If user is logged in, show "Profile" and "Orders" (or "Admin Dashboard" if admin)
                      <>
                        <Link href="/profile">
                          <li className=" px-4 py-2 hover:bg-gray-100">
                            My Account
                          </li>
                        </Link>
                        {isAdmin && (
                          <Link href="/">
                            <li className="px-4 py-2 hover:bg-gray-100">
                              View as user
                            </li>
                          </Link>
                        )}
                        <Link href="/">
                          <li className="px-4 py-2 hover:bg-gray-100">
                            Logout
                          </li>
                        </Link>
                      </>
                    ) : (
                      // If user is not logged in, show "Sign In" and "Register"
                      <>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/signin">Sign In</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/signup">Register</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </span>
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
