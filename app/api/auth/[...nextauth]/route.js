// app/api/auth/[...nextauth]/route.js
import { connectToDB } from "@lib/mongodb/mongoose";
import { authOptions } from '@lib/nextauth/auth';
import NextAuth from "next-auth";

// Connect to the database
connectToDB();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


