"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Navbar({ isUserLoggedIn, isAdmin, isLogout, token }) {
  const [scrollpos, setScrollpos] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoggedIn(isUserLoggedIn);
  }, [isUserLoggedIn, token, router.query]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollpos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav
        className={`fixed w-full z-30 top-0 md:px-14 text-black  ${
          scrollpos > 10
            ? "bg-gray-200 drop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200"
            : ""
        } `}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 w-full">
          <div className="flex items-center pl-4">
            <Link
              href="/"
              className="no-underline font-bold  toggleColour  hover:no-underline"
            >
              <Image
                src="/logo.png"
                alt="theaimstech"
                className="w-36"
                width={500}
                height={10}
              />
            </Link>
          </div>
          <div className="lg:hidden pr-4 text-black">
            <button
              className="  flex   items-center p-1  hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              id="nav-toggle"
              onClick={handleNavToggle}
            >
              {isNavOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="fill-current h-8 w-8"
                >
                  <title>Close</title>
                  <path
                    fillRule="evenodd"
                    d="M14.349 14.849a.5.5 0 0 1-.707 0L10 10.707l-3.646 3.646a.5.5 0 0 1-.707-.707L9.293 10l-3.646-3.646a.5.5 0 0 1 .707-.707L10 9.293l3.646-3.646a.5.5 0 0 1 .707.707L10.707 10l3.646 3.646a.5.5 0 0 1 0 .707z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="fill-current h-6 w-6"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              )}
            </button>
          </div>
          <di
            className={`w-full  lg:w-auto lg:flex-grow lg:flex lg:items-center ${
              isNavOpen
                ? " block flex text-center lg:text-left bg-amber-500    h-screen pt-12 lg:static lg:h-auto lg:pt-0"
                : "hidden"
            }  lg:bg-transparent   lg:p-0 mt-2 lg:mt-0 z-20 transition-opacity duration-300 ease-in-out`}
            id="nav-content"
          >
            <ul className="list-reset flex-1 items-center justify-end lg:flex">
              <li className="mr-3 py-3">
                <Link
                  href="/"
                  onClick={handleNavToggle}
                  className={`no-underline font-bold py-2 px-4 inline-block  ${
                    router.pathname === "/" ? "text-black" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <hr className="mx-4"></hr>
              <li className="mr-3 py-3">
                <Link
                  href="/portfolio"
                  onClick={handleNavToggle}
                  className={`no-underline font-bold py-2 px-4 inline-block   ${
                    router.pathname === "/portfolio" ? "text-black" : ""
                  }`}
                >
                  Portfolio
                </Link>
              </li>
              <hr className="mx-4"></hr>
              <li className="mr-3 py-3">
                <Link
                  href="/contact"
                  onClick={handleNavToggle}
                  className={`no-underline font-bold py-2 px-4 inline-block ${
                    router.pathname === "/contact" ? "text-black" : ""
                  }`}
                >
                  Contact Us
                </Link>
              </li>
              <hr className="mx-4"></hr>
              <li className="mr-3 py-5">
                <Link
                  href="/course"
                  onClick={handleNavToggle}
                  className={`no-underline font-bold py-2 px-4  ${
                    router.pathname === "/course" ? "text-black" : ""
                  }`}
                >
                  Courses
                </Link>
              </li>
              <hr className="mx-4"></hr>
              {loggedIn ? (
                <>
                  <div
                    className={` ${isNavOpen ? " hidden " : "block"} lg:block`}
                  >
                    <li
                      className="pl-10 relative  "
                      onMouseLeave={handleDropdownToggle}
                    >
                      <button
                        className=" flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                        onMouseEnter={handleDropdownToggle}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          style={{ color: "#FFC107" }}
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 2c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-2c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v2z" />
                        </svg>
                      </button>
                      {isDropdownOpen && (
                        <ul
                          onMouseLeave={handleDropdownToggle}
                          className="absolute right-0  py-2 w-48 bg-white rounded-md shadow-xl z-50"
                        >
                          <li>
                            <Link
                              href="/profile"
                              className="block  px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                            >
                              Profile
                            </Link>
                          </li>
                          {isAdmin ? (
                            <li>
                              <Link
                                href="/admin"
                                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                              >
                                Admin Dashboard
                              </Link>
                            </li>
                          ) : (
                            <li>
                              <Link
                                href="/enrollcourse"
                                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                              >
                                Enrolled Course
                              </Link>
                            </li>
                          )}
                          <li>
                            <button
                              onClick={isLogout}
                              className="block px-4 py-2 text-black hover:bg-indigo-500 hover:text-white w-full text-left"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>
                  </div>
                  <div
                    className={` ${
                      isNavOpen ? " block  " : "hidden"
                    } lg:hidden`}
                  >
                    <hr className="mx-4" />
                    <li className="mr-3 py-3">
                      <Link
                        href="/profile"
                        onClick={handleNavToggle}
                        className="no-underline font-bold py-2 px-4 inline-block "
                      >
                        Profile
                      </Link>
                    </li>
                    <hr className="mx-4" />
                    {isAdmin ? (
                      <li className="py-3">
                        <Link
                          href="/admin"
                          onClick={handleNavToggle}
                          className="no-underline font-bold py-2 px-4 inline-block "
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    ) : (
                      <li className="py-3">
                        <Link
                          href="/enrollcourse"
                          onClick={handleNavToggle}
                          className="no-underline font-bold py-2 px-4 inline-block "
                        >
                          Enrolled Course
                        </Link>
                      </li>
                    )}
                    <hr className="mx-4" />
                    <li className="pb-12 pt-5">
                      {" "}
                      <button
                        onClick={isLogout}
                        className="no-underline text-black font-bold py-2 px-4 inline-block bg-white  rounded-full hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </div>
                </>
              ) : (
                <li className="mr-3 my-2  ">
                  <Link
                    href="/signin"
                    onClick={handleNavToggle}
                    className=" text-black  no-underline font-bold py-2 px-4 inline-block bg-white  rounded-full hover:bg-gray-200"
                  >
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </di>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
