// app/services/[id]/page.jsx
import React from "react";
import Image from "next/image";
import styles from "@styles/Styles.module.css";
import Link from "next/link";

import { notFound } from "next/navigation";

async function getService(slug) {
  const res = await fetch(`http://localhost:3000/api/service/${slug}`);
  const service = await res.json();

  if (!service) notFound();
  return service;
}

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/service", {
    next: { revalidate: 60 },
  });
  const services = await res.json();

  return services.posts?.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const service = await getService(params.slug);

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      images: [service.feature_img],
    },}
}

export default async function ServicePage({ params }) {
  const service = await getService(params.slug);
  return (
    <div className="font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-gray-800 dark:bg-gray-700">
        <Image
          src={service.feature_img}
          alt={service.title}
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute pt-24 inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <div className="mt-4">
            <Link
              href="/book-now"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            >
              Book Now
            </Link>
          </div>
          <div className="mt-2 text-lg">
            Call us: <span className="font-semibold">+1-234-567-890</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-gray-700 dark:text-gray-300">
          <div
            className={`prose prose-lg max-w-none ${styles.list}`}
            dangerouslySetInnerHTML={{ __html: service.content }}
          ></div>
        </div>
      </div>
    </div>
  );
}
