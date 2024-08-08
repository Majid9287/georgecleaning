import Image from "next/image";
import Link from "next/link";
import Cycle from "@components/Cycle";
import styles from "../Home.module.css";
import { FaBroom, FaCheckCircle, FaThumbsUp } from "react-icons/fa";
export default function Home() {
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

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-[#fcc707]  pt-24 relative">
        <div className="absolute top-0 left-0 w-0 h-0 border-r-[150px] md:border-r-[200px] border-r-transparent border-t-[150px] md:border-t-[200px] border-t-[#453ee3]"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[200px] border-l-transparent border-b-[200px] border-b-[#453ee3]"></div>

        <div className=" flex items-center">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
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
    </main>
  );
}
