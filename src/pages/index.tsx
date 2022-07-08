import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/future/image";

const HomePage: NextPage = () => {
  return (
    <>
      <Head key="home">
        <title>Julius Marminge - SWE</title>
      </Head>
      <div className="flex-1 bg-base-200 rounded-box lg:hero">
        <div className="flex-col max-w-3xl hero-content lg:flex-row-reverse">
          <div className="avatar">
            <div className="w-48 aspect-square mask mask-squircle">
              <Image
                src="/images/profile.png"
                alt="profile pic"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold">Julius Marminge</h1>
            <h2 className="py-2 text-sm font-semibold">
              Software Engineering student @ BTH - Sweden
            </h2>
            <p className="py-2">Passionate about tech, especially new one.</p>
            <p className="text-sm italic text-warning">
              This site is under construction
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
