
import Image from "next/image";
import Link from "next/link";
import Cycle from "/components/Cycle";
import ReviewCard from "/components/cards/ReviewCard";
import styles from "../Home.module.css";
import { FaLock, FaSoap, FaStar } from "react-icons/fa";
import ServiceCard from "@components/cards/ServiceCard";
import { FaShield } from "react-icons/fa6";
import {
  FaTools,
  FaMagnifyingGlass,
  FaSmile,
  FaBroom,
  FaThumbsUp,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { GiVacuumCleaner, GiModernCity } from "react-icons/gi";
import {
  MdOutlineVerified,
  MdOutlinePriceCheck,
  MdOutlineSupportAgent,
} from "react-icons/md";

export default async function Home() {
  const reviews = [
    {
      name: "Jane Doe",
      title: "Outstanding Service",
      review:
        "The team was incredibly professional and thorough. My home has never looked better! The team was incredibly professional and thorough. My home has never looked better!The team was incredibly professional and thorough. My home has never looked better!",
      rating: 5,
      img: "/user1.jpg",
    },

    {
      name: "John Smith",
      title: "Highly Recommended",
      review:
        "Affordable pricing and top-notch service. I would definitely recommend them to my friends.",
      rating: 5,
      img: "/user2.jpg",
    },
    {
      name: "Emily Clark",
      title: "Impressive Work",
      review:
        "Their attention to detail is impressive. They left no stone unturned.",
      rating: 4,
      img: "/user3.jpg",
    },
  ];
  const items = [
    {
      title: "Item 1",
      description: "Description 1",
      img: "/office.png",
    },
    { title: "Item 2", description: "Description 2", img: "/carpet.png" },
    {
      title: "Item 3",
      description: "Description 3",
      img: "/hous.png",
    },
    {
      title: "Item 4",
      description: "Description 4",
      img: "/kitchen.png",
    },
    {
      title: "Item 5",
      description: "Description 5",
      img: "/window.png",
    },
  ];
  const points = [
    {
      icon: <GiModernCity className="text-2xl text-[#fcc707] mr-2" />,
      description: "Vetted and background-checked in house staff",
    },
    {
      icon: <GiVacuumCleaner className="text-2xl text-[#fcc707] mr-2" />,
      description: "High-Tech and Most Advanced Equipment",
    },
    {
      icon: <FaShieldAlt className="text-2xl text-[#fcc707] mr-2" />,
      description: "Quality Control and Safety",
    },
    {
      icon: <MdOutlinePriceCheck className="text-2xl text-[#fcc707] mr-2" />,
      description: "Affordable and Upfront Pricing",
    },
    {
      icon: <MdOutlineSupportAgent className="text-2xl text-[#fcc707] mr-2" />,
      description: "Timely and Convenient Services",
    },
    {
      icon: <MdOutlineVerified className="text-2xl text-[#fcc707] mr-2" />,
      description: "Experienced, Trained and Certified",
    },
    {
      icon: <FaCheckCircle className="text-2xl text-[#fcc707] mr-2" />,
      description: "Post Service Guarantee",
    },
  ];
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service`, {
    next: { revalidate: 7200 },
  });
  const data = await res.json();
  const services = data.posts;
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-[#fcc707]  pt-44 relative">
        <div className="absolute top-0 left-0 w-0 h-0 border-r-[150px] md:border-r-[200px] border-r-transparent border-t-[150px] md:border-t-[200px] border-t-[#453ee3]"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[150px] md:border-l-[200px] border-l-transparent border-b-[150px] md:border-b-[200px] border-b-[#453ee3]"></div>

        <div className=" flex items-center">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 text-center md:text-left pt-8">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0)] text-black leading-tight">
                  Sparkling Clean Homes, <br /> Happy Customers
                </h1>
                <p className="text-lg md:text-2xl text-black mt-6">
                  Professional cleaning services for your home and office.{" "}
                  <br />
                  Reliable, efficient, and affordable.
                </p>

                <Link href="#services">
                  <button className="mt-4 px-8 py-3 bg-white text-[#453ee3] font-semibold rounded-full shadow-lg hover:bg-[#fcc707] hover:text-white transition duration-300">
                    {" "}
                    See Our Best Offer
                  </button>{" "}
                </Link>
                <Link href="/book-now">
                  <button className="mt-4 px-8 py-3 bg-white text-[#453ee3] font-semibold rounded-full shadow-lg hover:bg-[#fcc707] hover:text-white transition duration-300">
                    {" "}
                    Get a Quote
                  </button>{" "}
                </Link>
                
              </div>
              <div className="w-full md:w-1/2 flex  mt-8 md:mt-0">
                <Image
                  src="/herosec.png"
                  alt="Cleaning Service"
                  className="z-10"
                  width={500}
                  height={10}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="md:absolute w-full px-1 z-10  md:-mt-5 ">
        <div className="container mx-auto md:px-6 flex justify-center text-center text-black">
          <div className="w-full md:px-6 my-1">
            <div className="p-2 py-8 md:py-2 bg-gray-100 rounded-lg md:rounded-none md:shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-1">
                <div className="w-full  ">
                  <div className="flex items-center p-6  bg-[#453ee3] rounded-lg shadow-lg">
                    <div className="p-3 rounded-full bg-[#fcc707] mr-4">
                      {" "}
                      <FaBroom className="text-4xl text-[#453ee3] " />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#fcc707] font-semibold mb-2">
                        Thorough Cleaning
                      </h3>
                      <p className="text-white">
                        Our team ensures every corner is spotless.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="flex items-center p-6 bg-[#453ee3] rounded-lg shadow-lg">
                    <div className="p-3 rounded-full bg-[#fcc707] mr-4">
                      <FaCheckCircle className="text-4xl text-[#453ee3] " />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#fcc707] font-semibold mb-2">
                        Certified Staff
                      </h3>
                      <p className="text-white">
                        All our staff are trained and certified.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full  ">
                  <div className="flex items-center p-6 bg-[#453ee3] rounded-lg shadow-lg">
                    <div className="p-3 rounded-full bg-[#fcc707] mr-4">
                      <FaThumbsUp className="text-4xl text-[#453ee3]" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#fcc707] font-semibold mb-2">
                        Customer Satisfaction
                      </h3>
                      <p className="text-white">
                        We prioritize our customers&#39; happiness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className={styles.patternSection}>
          <div className={styles.pattern}>
            {" "}
            <Cycle items={items} className="" />
          </div>
        </div>
      </section>
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 ">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Recommended Services
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            Services highly recommended by our valuable customers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services &&
              services.length > 0 &&
              services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className=" relative w-full md:w-1/2 mb-8 md:mb-0">
            {/* Top Left Decoration */}
            <div
              className={`absolute top-0 left-6 w-16 h-16 md:w-24 md:h-24 bg-[#fcc707] z-0 transform -translate-x-4 -translate-y-4 md:-translate-x-8 md:-translate-y-8 rounded-full `}
            ></div>
            {/* Bottom Right Decoration */}
            <div className="absolute bottom-0 right-6 w-16 h-16 md:w-24 md:h-24 bg-[#453ee3] z-0 transform translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 rounded-full"></div>

            <Image
              src="/choose.png" // Replace with your image path
              alt="Why Choose Us"
              width={600}
              height={400}
              className={`z-50 ${styles.pattern1}`}
            />
          </div>

          <div className="w-full md:w-1/2 md:pl-12 ">
            <h2 className="text-4xl font-bold text-gray-800 md:text-left  mb-4 p-2">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 md:text-left mb-1 p-4">
              We offer unmatched service quality, reliability, and customer
              satisfaction. Here’s why you should choose us for your cleaning
              needs:
            </p>
            <div className="space-y-4 p-2">
              {points.map((point, index) => (
                <div key={index} className="flex items-start">
                  <div>{point.icon}</div>
                  <div>
                    <p className="text-gray-600">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-lg mx-auto justify-center pt-16">
        <div className="flex justify-center pb-2">
          <span className="border rounded-full border-black  flex justify-center p-2  text-green-500">
            <FaCheckCircle className="text-[#453ee3] text-2xl" />
          </span>
        </div>
        <h1 className="text-3xl font-bold text-center  text-black">
          Experience Our <span className="text-[#453ee3]">Cleaning Magic</span>
        </h1>
        <div className="flex justify-center  text-[#453ee3]">
          <div className="flex justify-center">
            <div className=" border-[#453ee3] ">....................</div>
          </div>
        </div>
        <div className="space-y-6 px-2 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#fcc707] before:to-transparent">
          <div className="relative">
            <div className="flex items-center md:space-x-4 mb-3 ">
              <div className="">
                <div className=" flex items-center  justify-center bg-[#453ee3] w-10 h-10 rounded-full shadow md:order-1">
                  <FaLock className="text-lg text-[#fcc707] " />
                </div>
              </div>

              <div className="text-slate-500 ml-4 md:ml-14">
                <span className="text-slate-900 font-bold">
                  Step 1: Secure Consultation
                </span>{" "}
              </div>
            </div>
            <div className="md:flex">
              <div className="    text-slate-500  ml-14  md:w-3/4">
                <p>
                  We begin by carefully evaluating your space and discussing
                  your privacy concerns. Our goal is to create a customized
                  cleaning plan that meets your specific needs while ensuring
                  the utmost security and discretion.
                </p>
              </div>
              <div className="flex-shrink-0 ml-auto  md:w-1/4 px-12">
                <img
                  src="/one.png"
                  alt="Secure Consultation"
                  className=" h-40 w-40 md:h-full md:w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center md:space-x-4 mb-3">
              <div className=" ">
                <div className=" flex items-center justify-center bg-[#453ee3] w-10 h-10 rounded-full shadow md:order-1">
                  <FaShield className="text-lg text-[#fcc707] " />
                </div>
              </div>

              <div className="text-slate-500 ml-4 md:ml-14">
                <span className="text-slate-900 font-bold">
                  Step 2: Safe Preparation
                </span>{" "}
              </div>
            </div>
            <div className="md:flex">
              <div className="text-slate-500  ml-14  md:w-3/4">
                <p>
                  Our team prepares for the cleaning by gathering the necessary
                  equipment, supplies, and cleaning solutions. We prioritize
                  security measures to protect your belongings and maintain
                  confidentiality.
                </p>
              </div>
              <div className="flex-shrink-0 ml-auto md:w-1/4 px-12">
                <img
                  src="/two.png"
                  alt="Safe Preparation"
                  className=" h-40 w-40 md:h-full md:w-full object-contain"
                />
              </div>{" "}
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center md:space-x-4 mb-3">
              <div className=" ">
                <div className=" flex items-center justify-center bg-[#453ee3] w-10 h-10 rounded-full shadow md:order-1">
                  <FaSoap className="text-lg text-[#fcc707] " />
                </div>
              </div>

              <div className="text-slate-500 ml-4 md:ml-14">
                <span className="text-slate-900 font-bold">
                  Step 3: Deep Cleanse
                </span>{" "}
              </div>
            </div>
            <div className="md:flex">
              <div className="text-slate-500  ml-14  md:w-3/4">
                <p>
                  We meticulously clean every nook and cranny of your space
                  using safe and effective cleaning products. Our focus on
                  hygiene ensures a healthy environment for you and your family.
                </p>
              </div>
              <div className="flex-shrink-0 ml-auto md:w-1/4 px-12">
                <img
                  src="/three.png"
                  alt="Deep Cleanse"
                  className=" h-40 w-40 md:h-full md:w-full object-contain"
                />
              </div>{" "}
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center md:space-x-4 mb-3">
              <div className=" ">
                <div className=" flex items-center justify-center bg-[#453ee3] w-10 h-10 rounded-full shadow md:order-1">
                  <FaCheckCircle className="text-lg text-[#fcc707] " />
                </div>
              </div>

              <div className="text-slate-500 ml-4 md:ml-14">
                <span className="text-slate-900 font-bold">
                  Step 4: Rigorous Verification
                </span>{" "}
              </div>
            </div>
            <div className="md:flex">
              <div className="text-slate-500  ml-14  md:w-3/4">
                <p>
                  We conduct a thorough inspection to guarantee our high
                  cleaning standards. We also perform a security check to verify
                  that all valuables and personal items are safe and accounted
                  for.
                </p>
              </div>
              <div className="flex-shrink-0 ml-auto md:w-1/4 px-12">
                <img
                  src="/four.png"
                  alt="Rigorous Verification"
                  className="h-40 w-40 md:h-full md:w-full object-contain"
                />
              </div>{" "}
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center md:space-x-4 mb-3">
              <div className=" ">
                <div className=" flex items-center justify-center bg-[#453ee3] w-10 h-10 rounded-full shadow md:order-1">
                  <FaStar className="text-lg text-[#fcc707] " />
                </div>
              </div>

              <div className="text-slate-500 ml-4 md:ml-14">
                <span className="text-slate-900 font-bold">
                  Step 5: Final Refresh
                </span>{" "}
              </div>
            </div>
            <div className="md:flex">
              <div className="text-slate-500  ml-14  md:w-3/4">
                <p>
                  We add the finishing touches to create a fresh and inviting
                  space. Upon completion, we ensure your home or office is left
                  in pristine condition and securely locked before departing
                </p>
              </div>
              <div className="flex-shrink-0 ml-auto md:w-1/4 px-12">
                <img
                  src="/five.png"
                  alt="Final Refresh"
                  className="h-40 w-40 md:h-full md:w-full object-contain"
                />
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gray-900 py-16 sm:py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#453ee3] opacity-75"></div>
          <div className={styles.pattern2}>
            <div className="relative h-full w-full"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Book Our Service & Get a Quote
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover unparalleled service quality. Click below to request your
            quote and let us help you make your vision a reality!
          </p>
          <div className="mt-8">
            <Link href={"/book-now"}>
              <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform transition hover:scale-105">
                Get a Quote
              </button>{" "}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            What Our Customers Are Saying
          </h2>
          <ReviewCard reviews={reviews} />
        </div>
      </section>
    </main>
  );
}
