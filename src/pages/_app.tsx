import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";

import { Navbar } from "../components/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="mx-auto flex min-h-screen w-[95%] flex-col justify-between lg:w-4/5">
      <Navbar />
      <div className="flex flex-1 flex-col">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default trpc.withTRPC(MyApp);
