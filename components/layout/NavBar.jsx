"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
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
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
  
const NavbarFour = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [servicesSublinksFetched, setServicesSublinksFetched] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { name: "Home", href: "/" },
    { name: "Services", href: "#", sublinks: [{ name: "View all", href: "/services" }] },
    { name: "Book Online", href: "/book-now" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [AccountDropdown, setAccountDropdown] = useState(false);
  const [scrollpos, setScrollpos] = useState(0);
  const router = useRouter();
  const { data: session, status } = useSession()
  const pathname = usePathname();
  useEffect(() => {
      setIsMenuOpen(false);
    
  }, [pathname]);

  useEffect(() => {
    if (session && session.user) {
      setIsLoggedIn(true);
      setIsAdmin(session.user.role === "admin");
    }
  }, [session]);
const handelAccountDropdown=(e)=>{
  setAccountDropdown(e);
}
  useEffect(() => {
    const fetchServicesSublinks = async () => {
      try {
        const response = await fetch("/api/service/title", { next:{revalidate:10} });
        const data = await response.json();
        if (data && data.services && data.services.length > 0) {
          setMenuItems((prevMenuItems) => {
            const updatedMenuItems = [...prevMenuItems];
            const servicesIndex = updatedMenuItems.findIndex((item) => item.name === "Services");
            if (servicesIndex !== -1) {
              const existingSublinks = updatedMenuItems[servicesIndex].sublinks || [];
              const newData = data.services.map((service) => ({
                name: service.title,
                href: `/services/${service.slug}`,
              })).filter(
                (newSublink) =>
                  !existingSublinks.some(
                    (existingSublink) =>
                      existingSublink.name === newSublink.name
                  )
              );
              updatedMenuItems[servicesIndex].sublinks = [...existingSublinks, ...newData];
            }
            return updatedMenuItems;
          });
        }
        setServicesSublinksFetched(true);
      } catch (error) {
        console.error("Error fetching services sublinks:", error);
      }
    };
    fetchServicesSublinks();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollpos(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    signOut({ callbackUrl: '/' })
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMenuItemClick = (index) => {
    setOpenSubmenus(openSubmenus === index ? null : index);
  };

  const handleSubMenuToggle = (itemName, isOpen) => {
    setOpenSubmenus((prevOpenSubmenus) => ({
      ...prevOpenSubmenus,
      [itemName]: isOpen,
    }));
  };
 

  return (
    <nav className={`fixed w-full z-30 top-0 md:px-14 text-black ${scrollpos > 10 ? "bg-gray-100 drop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200" : ""}`}>
      {/* Top bar with social icons and contact information */}
      <div className={`md:mx-auto flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-2 ${scrollpos > 10 ? "hidden" : " rounded-xl px-2 mx-2"}`}>
        <div className="flex space-x-4">
          <Link href="https://www.facebook.com/" className="text-blue-500 bg-white rounded-full p-1">
            <FaFacebook className="h-6 w-6" />
          </Link>
          <Link href="https://www.twitter.com/" className="text-blue-500 bg-white rounded-full p-1">
            <FaTwitter className="h-6 w-6" />
          </Link>
          <Link href="https://www.instagram.com/" className="text-blue-500 bg-white rounded-full p-1">
            <FaInstagram className="h-6 w-6" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center" onClick={() => window.location.href = 'tel:+1234567890'}>
            <Link href="" className="text-blue-500 bg-white rounded-full p-1">
              <MdPhone className="h-6 w-6" />
            </Link>
            <p className="ml-2 cursor-pointer">+123 456 7890</p>
          </div>
          <div className="items-center hidden md:flex" onClick={() => window.location.href = 'mailto:example@email.com'}>
            <Link href="" className="text-blue-500 bg-white rounded-full p-1">
              <MdEmail className="h-6 w-6" />
            </Link>
            <p className="ml-2 cursor-pointer">example@email.com</p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`md:mx-auto flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-2 ${scrollpos > 10 ? "" : "bg-white mt-1 rounded-xl px-2 mx-2"}`}>
        <Link href="/" className="inline-flex items-center space-x-2 no-underline font-bold hover:no-underline">
          <Image src="/logo.png" alt="theaimstech" className="w-36" width={500} height={10} />
        </Link>
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
                      href={item.name === "Services" ? "#" : item.href}
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

        {/* User Account Info */}
        <div className="ml-2 mr-12 hidden lg:block">
          {isLoggedIn ? (
            <span
              className="pt-1 inline-block"
              onMouseEnter={() => handelAccountDropdown(true)}
              onMouseLeave={() => handelAccountDropdown(false)}
            >
              <Image
                className="h-10 w-10 rounded-full"
                width={500}
                height={500}
                src={session?.user?.image || "/images/user.png"}
                alt={session?.user?.name}
              />
              {AccountDropdown && (
                <div className="absolute right-1 px-6 py-2 rounded-lg bg-blue-500 shadow-white shadow-lg" style={{ zIndex: 50 }}>
                  <ul className="py-2">
                   
                    {isAdmin ? (
                      <Link href="/dashboard">
                        <li className="px-4 py-2 hover:bg-gray-100">Admin Dashboard</li>
                      </Link>
                    ) : (
                      <Link href="/bookings">
                        <li className="px-4 py-2 hover:bg-gray-100">Bookings</li>
                      </Link>
                    )}
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </span>
          ) : (
            <Link href="/sign-in" className="inline-block ml-4 mr-12 px-4 py-2 text-center border border-gray-300 rounded-md hover:bg-gray-300">
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="ml-auto block lg:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <IoMdClose className="block h-6 w-6" /> : <TiThMenu className="block h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                    href={item.name === "Services" ? "#" : item.href}
                    className={`-m-3 flex items-center rounded-md p-3 text-lg font-semibold    `}
                    onClick={() => handleMenuItemClick(index)}
                  >
                    <span className="ml-3  ">{item.name}</span>
                    {item.sublinks && item.sublinks.length > 0 && (
                      <span className="ml-auto">
                        {openSubmenus === index ? (
                          <IoMdArrowDropright className="h-4 w-4" />
                        ) : (
                          <IoMdArrowDropdown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </Link>
                  {item.sublinks &&
                    item.sublinks.length > 0 &&
                    openSubmenus === index && (
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
                    
                    {isAdmin && (
                      <Link href="/dashboard">
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
                    <Link href="/sign-in" className="mx-2">
                      {" "}
                      <button
                        type="button"
                        className={`w-full rounded-md px-3 py-2  text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black   `}
                      >
                        Login
                      </button>
                    </Link>
                    <Link href="/sign-up">
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
    </nav>
  );
};

export default NavbarFour;
