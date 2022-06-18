import type { NextPage } from "next";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head key="home">
        <title>Julius Marminge - SWE</title>
      </Head>
      <div className="card roundex-box bg-base-200 p-8">
        <h1>Hello!</h1>
      </div>
    </>
  );
};

export default HomePage;
