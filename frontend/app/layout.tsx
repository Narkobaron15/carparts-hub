import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./misc/header";
import Footer from "./misc/footer";
import { ToastContainer } from "react-toastify";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car details",
  description: "",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;
