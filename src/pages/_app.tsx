import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen mx-auto w-[95%] lg:w-4/5">
      <Navbar />
      <div className="flex flex-col flex-1">
        <Component {...pageProps} />
      </div>
      <div className="divider"></div>
      <Footer />
    </div>
  );
};

export default trpc.withTRPC(MyApp);
