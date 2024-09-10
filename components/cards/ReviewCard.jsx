"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
SwiperCore.use([Navigation]);
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const maxContentHeight = 65; // Maximum height in pixels before showing "Read More"
  const cardMinHeight = 250;
  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxContentHeight);
    }
  }, [review.review]);

  return (
    <div className="relative group">
  <div
    className="overflow-hidden border rounded-lg  bg-white p-6 flex flex-col justify-between"
    style={{ minHeight: `${cardMinHeight}px` }} // Set min-height for consistency
  >
    <div className="flex items-center mb-4">
      <FaRegUserCircle className="w-12 h-12 rounded-full object-cover text-[#fcc707] mr-4"/>
      <div>
        <h3 className="text-xl text-[#655fe4] font-semibold">
          {review.name}
        </h3>
        <p className="text-sm text-gray-600">{review.title}</p>
      </div>
    </div>

    {/* Card Content */}
    <div
      ref={contentRef}
      className="text-gray-700 mb-4"
      style={{
        maxHeight: isExpanded ? "none" : `${maxContentHeight}px`,
        overflow: isExpanded ? "visible" : "hidden",
      }}
    >
      {review.review}
    </div>

    {/* Read More/Less */}
    {isOverflowing && (
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#655fe4] text-sm underline"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    )}

    {/* Rating */}
    <div className="flex mt-4">
      {Array(review.rating)
        .fill("")
        .map((_, i) => (
          <FaStar key={i} className="text-[#fcc707] text-lg" />
        ))}
    </div>
  </div>
</div>

  );
}

export default function Reviews({ reviews }) {
  return (
    <Swiper
      observer={true}
      observeParents={true}
      slidesPerView={1.2}
      spaceBetween={10}
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
      }}
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index}>
          <ReviewCard review={review} />
        </SwiperSlide>
      ))}
      {/* Navigation Buttons */}
      <div className="swiper-button-next hidden md:flex items-center justify-center w-10 h-10  text-indigo-700 rounded-lg hover:bg-indigo-700 hover:text-yellow-400 transition-colors duration-300"></div>
      <div className="swiper-button-prev hidden md:flex items-center justify-center w-10 h-10  text-indigo-700 rounded-lg hover:bg-indigo-700 hover:text-yellow-400 transition-colors duration-300"></div>
    </Swiper>
  );
}
