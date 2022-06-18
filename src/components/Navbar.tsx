import React, { type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  CurrencyDollarIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";

const tabs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Projects",
    href: "/projects",
  },
];

const TabLink: React.FC<{
  href: string;
  tabName: string;
}> = ({ href, tabName }) => {
  const router = useRouter();
  const isActive = router.route === href;
  return (
    <Link href={href}>
      <a className={`tab tab-bordered ${isActive && "tab-active"}`}>
        {tabName}
      </a>
    </Link>
  );
};

export const Navbar = () => {
  const [isDarkMode, setDarkMode] = React.useState(true);
  const setTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked);
    if (e.target.checked) {
      window.document.documentElement.setAttribute("data-theme", "dark");
      localStorage.removeItem("prefersLightTheme");
    } else {
      window.document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("prefersLightTheme", "true");
    }
  };

  React.useEffect(() => {
    // get the current theme from localStorage on mount
    const prefersLight = localStorage.getItem("prefersLightTheme");
    if (prefersLight !== null) {
      setDarkMode(false);
      window.document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-between">
      {/* LEFT SECTION WITH NAVIGATION-TABS */}
      <div className="tabs w-max justify-center gap-5 my-4">
        {tabs.map((tab) => (
          <TabLink key={tab.name} href={tab.href} tabName={tab.name} />
        ))}
      </div>

      {/* RIGHT SECTION WITH LIGHT/DARK TOGGLE */}
      <div className={"flex justify-end items-center gap-4"}>
        <label className="swap swap-rotate items-center">
          <input type="checkbox" checked={isDarkMode} onChange={setTheme} />

          <SunIcon className="swap-off stroke-current w-8 h-8" />
          <MoonIcon className="swap-on stroke-current w-8 h-8" />
        </label>
      </div>
    </div>
  );
};
