import React from "react";
import Image from "next/image";
import styles from "../../Home.module.css";
import { FaCheckCircle, FaStar, FaTools } from "react-icons/fa";
import ServiceCard from "@components/cards/ServiceCard";

export default async function Services() {
  const res = await fetch("http://localhost:3000/api/service", { next:{revalidate:10} });
  const data = await res.json();
  const services = data.posts.filter(service => service.status === "active");
  return (
    <main className="min-h-screen bg-gray-100 ">
      <section className=" bg-[#453ee3] text-white  ">
        <div className={`${styles.pattern2} pt-24 pb-12`}>
          <div className="container mx-auto px-2 pt-20 md:px-6 text-center">
            <div className="bg-[#fcc707] ">
              <div className="bg-[#453ee3] shadow-2xl p-1 rounded-3xl mb-4 ">
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-lg mb-8">
                  Explore our range of professional cleaning services designed
                  to meet your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.pattern} py-12`}>
        <div className="container mx-auto px-2  md:px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services &&
              services.length > 0 &&
              services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100 px-2 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/choose.png"
              alt="Why Choose Us"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We offer unmatched service quality, reliability, and customer
              satisfaction. Here’s why you should choose us for your cleaning
              needs:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaCheckCircle className="text-2xl text-[#fcc707] mr-2" />
                <p className="text-gray-600">
                  Vetted and background-checked staff
                </p>
              </li>
              <li className="flex items-start">
                <FaTools className="text-2xl text-[#fcc707] mr-2" />
                <p className="text-gray-600">
                  High-Tech and Most Advanced Equipment
                </p>
              </li>
              <li className="flex items-start">
                <FaStar className="text-2xl text-[#fcc707] mr-2" />
                <p className="text-gray-600">
                  Customer Satisfaction Guaranteed
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
