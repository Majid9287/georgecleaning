"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import {
  IoMdArrowDropdown,
  IoMdClose,
  IoMdArrowDropright,
} from "react-icons/io";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdPhone, MdEmail } from "react-icons/md";
const NavbarFour = () => {
  const { isLoggedIn, setisLoggedIn } = useState(false);
  const { isAdmin, setisAdmin } = useState(false);

  const staticMenuItems = [
    {
      name: "Home",
      href: "/",
    },

    {
      name: "Services",
      href: "#",
      sublinks: [
        {
          name: "Risk Calculator",
          href: "/calculator",
        },
        { name: "Market Overview Widget", href: "/market/market-overview" },
        { name: "Economic Calendar Widget", href: "/market/economic-calendar" },
        { name: "Ticker Widget", href: "/market/ticker" },
        { name: "Symbol Overview Widget", href: "/market/symbol-overview" },
        { name: "Forex Cross Rates Widget", href: "/market/forex-cross-rates" },
      ],
    },
    {
      name: "Price Estimate",
      href: "#",
    },
    {
      name: "Community",
      href: "/chat",
    },

    {
      name: "Contact",
      href: "/contact",
    },
  ];
  const [menuItems, setMenuItems] = useState(staticMenuItems);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [AccountDropdown, setAccountDropdown] = useState(false);
  const router = useRouter();
  const [scrollpos, setScrollpos] = useState(0);
  const handlePhoneClick = () => {
    const phoneNumber = '+1234567890'; // Replace with your actual phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    const emailAddress = 'example@email.com'; // Replace with your actual email address
    window.location.href = `mailto:${emailAddress}`;
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollpos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {};
  const handelAccountDropdown = () => {
    setAccountDropdown(!AccountDropdown);
  };
  const [introductionSublinksFetched, setIntroductionSublinksFetched] =
    useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleMenuItemClick = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };
  const handleSubMenuToggle = (itemName, isOpen) => {
    setOpenSubmenus((prevOpenSubmenus) => ({
      ...prevOpenSubmenus,
      [itemName]: isOpen,
    }));
  };
  return (
    <nav
      className={`fixed w-full z-30 top-0 md:px-14 text-black  ${
        scrollpos > 10
          ? "bg-gray-100 drop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200"
          : ""
      } `}
    >
      <div  className={`md:mx-auto  flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-2  ${
          scrollpos > 10 ? "hidden" : " rounded-xl px-2 mx-2"
        } `}>
        {/* Social Icons */}
        <div className="flex space-x-4">
          <Link href="https://www.facebook.com/"
            className="text-blue-500 bg-white rounded-full p-1">
              <FaFacebook className="h-6 w-6" />
           
          </Link>
          <Link href="https://www.twitter.com/"
             className="text-blue-500 bg-white rounded-full p-1">
              <FaTwitter className="h-6 w-6" />
           
          </Link>
          <Link href="https://www.instagram.com/"
             className="text-blue-500 bg-white rounded-full p-1">
              <FaInstagram className="h-6 w-6" />
           
          </Link>
        </div>

        {/* Contact Information */}
        <div className="flex space-x-4">
          <div className="flex items-center " onClick={handlePhoneClick}>
            <MdPhone className="h-6 w-6 text-blue-500 bg-white rounded-full p-1" />
            <p className="ml-2 cursor-pointer">+123 456 7890</p>
          </div>
          <div className=" items-center hidden md:flex" onClick={handleEmailClick}>
            <MdEmail className="h-6 w-6  text-blue-500 bg-white rounded-full p-1" />
            <p className="ml-2 cursor-pointer">example@email.com</p>
          </div>
        </div>
      </div>

      <div
        className={`md:mx-auto  flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-2  ${
          scrollpos > 10 ? "" : "bg-white mt-1 rounded-xl px-2 mx-2"
        } `}
      >
        <div className="inline-flex items-center space-x-2">
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
        <div className="hidden lg:block ml-12">
          <ul className="ml-12 inline-flex space-x-8 ">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div className="inline-flex items-center">
                  <div
                    className={` text-lg font-semibold  `}
                    onMouseEnter={() => handleSubMenuToggle(item.name, true)}
                    onMouseLeave={() => handleSubMenuToggle(item.name, false)}
                  >
                    <Link
                      href={item.name === "Introduction" ? "#" : item.href}
                      className={`inline-flex items-center `}
                    >
                      {item.name}

                      {item.sublinks && item.sublinks.length > 0 && (
                        <span>
                          <IoMdArrowDropdown className="ml-2 h-4 w-4 text-[#453ee3]" />
                        </span>
                      )}
                    </Link>
                    {item.sublinks && item.sublinks.length > 0 && (
                      <ul
                        className={`${
                          openSubmenus && openSubmenus[item.name]
                            ? "block"
                            : "hidden"
                        }
                        
                        } bg-[#453ee3] text-white absolute  z-10  border border-gray-200 divide-y divide-gray-100 rounded-md`}
                      >
                        {item.sublinks.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={
                                item.name === "Introduction"
                                  ? `/introduction/[slug]`
                                  : sublink.href
                              }
                              as={
                                item.name === "Introduction"
                                  ? `/introduction/${sublink.name}`
                                  : sublink.href
                              }
                              className={`block px-8 py-4 text-sm hover:shadow-xl hover:bg-[#4a41f0]  `}
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-2  hidden lg:block">
          {isLoggedIn ? (
            <span
              className="pt-1 inline-block "
              onMouseEnter={() => {
                handelAccountDropdown(true);
              }}
              onMouseLeave={() => {
                handelAccountDropdown(false);
              }}
            >
              <img
                className="h-10 w-10 rounded-full"
                src="images/user.png"
                alt="Dan_Abromov"
              />
              {AccountDropdown && (
                <div
                  className={`absolute right-1  px-6 py-2  rounded-lg shadow-white  shadow-lg  `}
                  style={{ zIndex: 50 }}
                >
                  <ul className="py-2">
                    <>
                      <Link href="/profile">
                        <li className={`px-4 py-2 hover:bg-gray-100   `}>
                          Profile
                        </li>
                      </Link>
                      {isAdmin && (
                        <Link href="/adminDashboard">
                          <li className={`px-4 py-2 hover:bg-gray-100   `}>
                            Admin Dashboard
                          </li>
                        </Link>
                      )}
                      <div onClick={handleLogout}>
                        <li className={`px-4 py-2 hover:bg-gray-100   `}>
                          Logout
                        </li>
                      </div>
                    </>
                  </ul>
                </div>
              )}
            </span>
          ) : (
            <span className="flex">
              <Link href="/signin" className="mx-2">
                {" "}
                <button
                  type="button"
                  className={`w-full rounded-md px-3 py-2  bg-[#453ee3] text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black   `}
                >
                  Login
                </button>
              </Link>
            </span>
          )}
        </div>

        <div className="ml-2 lg:hidden">
          <TiThMenu
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer text-black"
          />
        </div>
        {isMenuOpen && (
          <div
            className="lg:hidden text-white"
            onMouseLeave={() => {
              setIsMenuOpen(false);
            }}
          >
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right  lg:hidden transform p-2 transition-all ease-out">
              <div
                className={`divide-y-2 divide-gray-50 rounded-lg border ring-1 ring-white border-white shadow-2xl ring-opacity-5 bg-[#453ee3] text-white   `}
              >
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between pb-8">
                    <div className="inline-flex items-center space-x-2">
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
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <IoMdClose
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={item.href}
                        className={`-m-3 flex items-center rounded-md p-3 text-lg font-semibold    `}
                        onClick={() => handleMenuItemClick(index)}
                      >
                        <span className="ml-3  ">{item.name}</span>
                        {item.sublinks && item.sublinks.length > 0 && (
                          <span className="ml-auto">
                            {openSubmenu === index ? (
                              <IoMdArrowDropright className="h-4 w-4" />
                            ) : (
                              <IoMdArrowDropdown className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </Link>
                      {item.sublinks &&
                        item.sublinks.length > 0 &&
                        openSubmenu === index && (
                          <ul className="pl-4">
                            {item.sublinks.map((sublink, subindex) => (
                              <li key={subindex}>
                                <Link
                                  href={sublink.href}
                                  className={`block px-4 py-2 text-sm    `}
                                >
                                  {sublink.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  ))}
                  {isLoggedIn ? (
                    <ul className="py-2">
                      <>
                        <Link href="/profile">
                          <li
                            className={`flex items-center rounded-md p-3 text-lg font-semibold    `}
                          >
                            Profile
                          </li>
                        </Link>
                        {isAdmin && (
                          <Link href="/adminDashboard">
                            <li
                              className={`flex items-center rounded-md p-3 text-lg font-semibold    `}
                            >
                              Admin Dashboard
                            </li>
                          </Link>
                        )}
                        <div onClick={handleLogout}>
                          <li
                            className={`w-full rounded-md px-3 py-2  text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black   `}
                          >
                            Logout
                          </li>
                        </div>
                      </>
                    </ul>
                  ) : (
                    <>
                      <hr className="w-full my-2"></hr>
                      <span className="flex justify-between mt-4">
                        <Link href="/signin" className="mx-2">
                          {" "}
                          <button
                            type="button"
                            className={`w-full rounded-md px-3 py-2  text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black   `}
                          >
                            Login
                          </button>
                        </Link>
                        <Link href="/signup">
                          {" "}
                          <button
                            type="button"
                            className={`w-full rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black   `}
                          >
                            Register
                          </button>
                        </Link>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavbarFour;
