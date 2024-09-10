import Link from "next/link";
import { FaFileContract } from "react-icons/fa";

import styles from "../../Home.module.css";
export default function TermsAndConditions() {
  return (
    <main className={`min-h-screen bg-gray-100 py-16 ${styles.pattern}`}>
      <section className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center pb-4 pt-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
            <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-3xl mx-auto">
              <FaFileContract className="text-6xl text-[#453ee3] mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Terms and Conditions
              </h1>
              <p className="text-lg text-gray-600 mb-12">
                Please read these terms and conditions carefully before using
                our services. By accessing or using the website, you agree to
                comply with and be bound by these terms.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-6">
              By accessing this website, you accept these terms and conditions
              in full. If you disagree with any part of these terms and
              conditions, you must not use our website or services.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Privacy Policy
            </h2>
            <p className="text-gray-600 mb-6">
              Your privacy is important to us. Please review our Privacy Policy,
              which explains how we collect, use, and protect your personal
              information.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Service Availability
            </h2>
            <p className="text-gray-600 mb-6">
              We strive to ensure that our services are available at all times,
              but there may be instances where services are temporarily
              unavailable due to maintenance or unforeseen circumstances.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-6">
              We are not liable for any damages that may occur from the use or
              inability to use our services. Your use of the website is at your
              own risk.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Governing Law
            </h2>
            <p className="text-gray-600 mb-6">
              These terms are governed by and construed in accordance with the
              laws of Pakistan, and you submit to the exclusive jurisdiction of
              the courts in that region.
            </p>
            <div className="text-center mt-8">
              <Link href="/">
                <button className="px-8 py-3 bg-[#453ee3] text-white font-semibold rounded-full shadow-lg hover:bg-[#fcc707] hover:text-black transition duration-300">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
