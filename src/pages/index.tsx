import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head key="home">
        <title>Julius Marminge - SWE</title>
      </Head>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="relative h-sm w-sm">
            <Image
              src="/images/profile.png"
              layout="fill"
              alt="profile picture"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
