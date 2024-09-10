"use client";

import React from "react";
import styles from "../../Home.module.css";
export default function AboutUsPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className={`relative h-96 bg-blue-500`}>
      
        <div className={`absolute inset-0 bg-gray-100 opacity-50 ${styles.pattern2} `}></div>
        <div className="pt-24 absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold md:text-6xl">
            About Us
          </h1>
          <p className="mt-4 text-lg md:text-2xl">
            Professional cleaning services with a personal touch.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="mx-auto max-w-7xl py-12 px-4 md:py-24 md:px-8">
        <h2 className="text-center text-3xl font-bold md:text-5xl">
          Who We Are
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-gray-700 md:text-xl">
          We are a leading cleaning services provider in Australia, dedicated to transforming spaces with our expert cleaning solutions. From homes to offices, we ensure every corner shines with cleanliness and hygiene.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <img
              src="expert.png"
              alt="Expert Team"
              className="mx-auto h-56 w-56 rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-semibold">Expert Team</h3>
            <p className="mt-2 text-gray-600">
              Our team is composed of trained professionals who take pride in delivering top-notch cleaning services.
            </p>
          </div>
          <div className="text-center">
            <img
              src="eco.png"
              alt="Eco-Friendly"
              className="mx-auto h-56 w-56 rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-semibold">Eco-Friendly Solutions</h3>
            <p className="mt-2 text-gray-600">
              We use environmentally safe products that are tough on dirt but gentle on the planet.
            </p>
          </div>
          <div className="text-center">
            <img
              src="realiable.png"
              alt="Reliable Service"
              className="mx-auto h-56 w-56 rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-semibold">Reliable Service</h3>
            <p className="mt-2 text-gray-600">
              Our clients trust us for our consistent quality and dependable service, time after time.
            </p>
          </div>
        </div>
      </div>

    {/* Our Story Section */}
<div className="bg-gray-50 py-12 px-4 md:py-24 md:px-4">
  <div className="mx-auto max-w-7xl flex items-center justify-center">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
      <div className="order-2 lg:order-1 text-center lg:text-left">
        <h2 className="text-3xl font-bold md:text-5xl">Our Story</h2>
        <p className="mt-4 text-lg text-gray-700 md:text-xl">
          Founded in 2023, our mission has always been to provide exceptional cleaning services with integrity, professionalism, and respect. From humble beginnings, we’ve grown into a trusted partner for countless homes and businesses across Australia.
        </p>
        <p className="mt-4 text-lg text-gray-700 md:text-xl">
          We believe that a clean space is not just about aesthetics but also about creating a healthier, more productive environment. That’s why we go the extra mile to ensure our services exceed expectations every time.
        </p>
      </div>
      <div className="order-1 lg:order-2">
        <img
          src="story.png"
          alt="Our Story"
          className="rounded-lg object-cover h-4/6"
        />
      </div>
    </div>
  </div>
</div>


      {/* Our Values Section */}
      <div className="mx-auto max-w-7xl py-12 px-4 md:py-24 md:px-8">
        <h2 className="text-center text-3xl font-bold md:text-5xl">
          Our Core Values
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Customer First</h3>
            <p className="mt-2 text-gray-600">
              We prioritize our clients’ needs and strive to exceed their expectations.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Integrity</h3>
            <p className="mt-2 text-gray-600">
              We conduct our business with honesty and transparency at all times.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Excellence</h3>
            <p className="mt-2 text-gray-600">
              We are committed to delivering the highest quality services with attention to detail.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
