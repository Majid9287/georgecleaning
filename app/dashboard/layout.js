import Providers from "../providers"
import { Inter } from "next/font/google";
import { getSession } from "@lib/nextauth/auth";
import "../globals.css";
import AdminSideBard from "@components/layout/AdminSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
      <main className="containter mx-auto">
      <AdminSideBard > {children}</AdminSideBard> </main>
      </Providers> </body>
    </html>
  );
}
