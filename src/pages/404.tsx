import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "../components/Hero";

const PageNotFound: NextPage = () => {
  return (
    <div className="flex flex-col flex-1 justify-center">
      <div className="max-w-md">
        <h1 className="py-4 text-5xl font-bold text-primary">404</h1>
        <p className="py-2 font-semibold">Ooops... that page can't be found.</p>
        <p className="py-2 mb-4">
          Well, that's a bummer... but I trust you there are plenty of other
          cool stuff available!
        </p>
        <Link href="/">
          <div className="btn btn-primary w-40 text-xs">Go back to home</div>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
