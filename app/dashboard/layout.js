import { Inter } from "next/font/google";
import "../globals.css";
import AdminSideBard from "@components/layout/AdminSideBar";
import Fottor from "@components/layout/Fottor";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="containter mx-auto">
      <AdminSideBard > {children}</AdminSideBard> </main>
        </body>
    </html>
  );
}
