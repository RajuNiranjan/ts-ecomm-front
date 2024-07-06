// parent layout for all pages
import "./globals.css";

import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalProvider from "@/provider/ModalProvider";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
import AuthModalProvider from "@/provider/AuthModalProvider";
import Navbar from "@/components/navbar/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Ts-Ecommerce",
  description: "Ts-Ecommerce",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
          <ReactQueryProvider>
            <ModalProvider />
            <AuthModalProvider />
            <ToastContainer position="top-center" theme="light" />
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
