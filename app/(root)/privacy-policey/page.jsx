"use client";

import React from "react";
import styles from "../../Home.module.css";
export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white ">
      
      <div className={`relative h-96 bg-[#453ee3]`}>
      
      <div className={`absolute inset-0 bg-gray-100 opacity-50 ${styles.pattern2} `}></div>
      <div className="pt-24 absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl font-bold md:text-6xl">
        Privacy Policy
        </h1>
        <p className="mt-4 text-lg md:text-2xl">
        Your privacy is important to us. This privacy policy explains how we
        collect, use, and protect your information.
        </p>
      </div>
    </div>
      <div className="mt-12 max-w-4xl mx-auto space-y-12 text-left py-16 px-4 sm:px-6 lg:px-8 pt-24">
        {/* Information Collection */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800">Information Collection</h2>
          <p className="mt-4 text-lg text-gray-600">
            We collect personal information you provide directly to us, such as
            when you request a quote, book a service, or contact us. The
            information we collect may include your name, email address, phone
            number, and any other details you choose to provide.
          </p>
        </section>

        {/* Information Usage */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800">Information Usage</h2>
          <p className="mt-4 text-lg text-gray-600">
            We use the information we collect to provide our cleaning services,
            communicate with you, and improve our offerings. We may also use
            your information for marketing purposes, with your consent.
          </p>
        </section>

        {/* Information Sharing */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800">Information Sharing</h2>
          <p className="mt-4 text-lg text-gray-600">
            We do not share your personal information with third parties except
            as necessary to provide our services, comply with the law, or
            protect our rights. We may share your information with trusted
            service providers who assist us in operating our business.
          </p>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800">Data Security</h2>
          <p className="mt-4 text-lg text-gray-600">
            We take data security seriously and implement appropriate measures
            to protect your personal information from unauthorized access,
            disclosure, alteration, or destruction.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800">Your Rights</h2>
          <p className="mt-4 text-lg text-gray-600">
            You have the right to access, correct, or delete your personal
            information. If you wish to exercise these rights, please contact
            us using the information provided below.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800">Contact Information</h2>
          <p className="mt-4 text-lg text-gray-600">
            If you have any questions or concerns about this Privacy Policy, please
            contact us at:
          </p>
          <p className="mt-2 text-lg text-gray-600">
            <strong>Email:</strong> support@cleaningservices.au
          </p>
          <p className="mt-2 text-lg text-gray-600">
            <strong>Phone:</strong> +61 123 456 789
          </p>
        </section>
      </div>
    </div>
  );
}
