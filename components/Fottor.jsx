"use client";
import React from "react";
import Image from "next/image";
const FooterFour = () => { 
  return (
    <section className="relative overflow-hidden py-10 bg-[#453ee3] border-t-2">
         <div className="absolute top-0 left-0 w-0 h-0 border-r-[150px] md:border-r-[100px] border-r-transparent border-t-[50px] md:border-t-[100px] border-t-[#fcc707]"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[150px] md:border-l-[100px] border-l-transparent border-b-[50px] md:border-b-[100px] border-b-[#fcc707]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 ">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Image
                  src="/logowhite.png"
                  alt="theaimstech"
                  className="w-36"
                  width={500}
                  height={10}
                />
              </div>
              <div>
                <p className="mb-4  text-base   text-white">
                Sparkling Clean Homes,
                Happy Customers
                </p>
                <p className="text-sm text-white">
                  &copy; Copyright 2024. All Rights Reserved by George cleaning group.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-lg font-bold uppercase text-white">
               Services
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Features
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Affiliate Program
                  </a>
                </li>
                <li>
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-lg font-bold uppercase text-white">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Account
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Help
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Customer Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-lg font-bold uppercase text-white">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className=" text-base   text-white hover:text-gray-700"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FooterFour;