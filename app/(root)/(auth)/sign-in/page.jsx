"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

import styles from "../../../Home.module.css";
const SignIn = () => {
  return (
    <div className={`flex items-center justify-center min-h-screen ${styles.pattern1}`}>
      <div className="bg-white rounded-3xl mt-12 mx-2 shadow-2xl p-8 md:p-16 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center w-full py-3 text-lg font-semibold text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaGoogle className="mr-3" />
          Sign in with Google
        </button>
        <div className="mt-8 text-center">
          <p className="text-gray-600">Don't have an account? <a href="/sign-up" className="text-indigo-600 font-bold hover:underline">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
