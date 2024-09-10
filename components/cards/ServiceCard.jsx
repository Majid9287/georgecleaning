// components/ServiceCard.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
const ServiceCard = ({ service }) => {
  const router = useRouter();
  const nav =(e)=>{
    router.push(`services/${e}`)
  }
  return (
    <div  className="relative bg-white  text-black rounded-lg shadow-lg overflow-hidden h-80">
      {/* Background Image */}
      <Image
        src={service.feature_img}
        alt={service.title}
        width={600}
        height={400}
        className="w-full h-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-between">
        <div className="pt-6">
          {/* Price */}
          <p className="text-lg font-bold text-[#fcc707] absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-md">
            ${service.price}
          </p>
          {/* Title */}
          <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
          {/* Description */}
          <p className="mt-2 text-sm text-gray-200">{service.description}</p>
        </div>

        {/* Details & Buttons */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-4">{service.details}</p>
          <div className="flex justify-between">
            <Link href={`services/${service.slug}`}>
              <button className="px-4 py-2 bg-[#453ee3] text-white font-semibold rounded-full shadow-lg hover:bg-[#fcc707] hover:text-[#453ee3] transition duration-300">
                View Details
              </button>
            </Link>
            <Link href={"/book-now"}>
              <button className="px-4 py-2 bg-[#fcc707] text-[#453ee3] font-semibold rounded-full shadow-lg hover:bg-[#453ee3] hover:text-white transition duration-300">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
