import type { NextPage } from "next";
import Head from "next/head";
import { Hero } from "../components/Hero";

const HomePage: NextPage = () => {
  return (
    <>
      <Head key="home">
        <title>Julius Marminge - SWE</title>
      </Head>
      <Hero />
    </>
  );
};

export default HomePage;
