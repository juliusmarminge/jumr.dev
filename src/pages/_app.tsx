import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-[95%] lg:w-4/5 max-w-[2000px] mx-auto min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex flex-col flex-1">
        <Component {...pageProps} />
      </div>
      <div className="divider"></div>
      <Footer />
    </div>
  );
}

export default MyApp;
