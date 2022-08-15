import { type NextPage } from "next";
import Link from "next/link";

const PageNotFound: NextPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="max-w-md">
        <h1 className="py-4 text-5xl font-bold text-primary">404</h1>
        <p className="py-2 font-semibold">
          Ooops... that page can&apos;t be found.
        </p>
        <p className="mb-4 py-2">
          Well, that&apos;s a bummer... but I trust you there are plenty of
          other cool stuff available!
        </p>
        <Link href="/">
          <div className="btn btn-primary w-40 text-xs">Go back to home</div>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
