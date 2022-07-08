import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const HomePage: NextPage = () => {
  return (
    <>
      <Head key="home">
        <title>Julius Marminge - SWE</title>
      </Head>
      <div className="hero bg-base-200 flex-1 rounded-box">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-3xl">
          <div className="avatar">
            <div className="w-56 mask mask-squircle">
              <Image
                src="/images/profile.png"
                className="max-w-sm rounded-lg shadow-2xl"
                layout="fill"
              />
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-bold">Julius Marminge</h1>
            <h2 className="py-2 font-semibold">
              Software Engineering student @ BTH
            </h2>
            <p className="py-6">Passionate about tech</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
