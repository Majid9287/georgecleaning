"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const StudentsPage = () => {
  const router = useRouter();

  return (
        <div className="h-full bg-gradient-to-r from-blue-100 to-purple-100 relative min-h-screen">
      <section className="flex justify-center items-center text-center min-h-screen bg-gray-100 relative">
        <h1 className="text-6xl text-amber-500 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
          Welcome to admin panel
        </h1>
      </section>
     </div>
    
  );
};
export default StudentsPage;

