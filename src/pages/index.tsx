import type { NextPage } from "next";
import Image from "next/image";
import profilePic from "../../public/profile.png";

const HomePage: NextPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="relative h-sm w-sm">
          <Image
            src={profilePic}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
