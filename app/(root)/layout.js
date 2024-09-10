import Providers from "../providers"
import { Inter } from "next/font/google";
import { getSession } from "@lib/nextauth/auth";
    
import "../globals.css";
import NavBar from "/components/layout/NavBar";
import Fottor from "/components/layout/Fottor";
const inter = Inter({ subsets: ["latin"] });
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "George Cleaning Group - Professional Cleaning Services in Australia",
  description:
    "George Cleaning Group offers top-quality cleaning services across Australia. We specialize in residential, commercial, industrial, carpet, and window cleaning. Book your service today!",
  keywords:
    "cleaning services, Australia, George Cleaning Group, residential cleaning, commercial cleaning, industrial cleaning, carpet cleaning, window cleaning",
  author: "George Cleaning Group",
  view: "width=device-width, initial-scale=1",
  robots: "index, follow",
  charset: "UTF-8",
};

export default async function RootLayout({ children }) {
  
  const session = await getSession();
  console.log("Session data in home layout:", session);
  return (
    <html lang="en">
      <head>
        <meta name="view" content={metadata.view} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta charSet={metadata.charset} />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>
        <Providers session={session}>
          <main className="">
            <NavBar />
            {children}
          </main>
          <Fottor />
        </Providers>
      </body>
    </html>
  );
}
