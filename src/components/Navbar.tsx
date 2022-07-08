import React, { type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

const DARK_THEME = "night";
const LIGHT_THEME = "emerald";

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
      <a className={`tab tab-bordered ${isActive && "tab-active px-2"}`}>
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
      window.document.documentElement.setAttribute("data-theme", DARK_THEME);
      localStorage.removeItem("prefersLightTheme");
    } else {
      window.document.documentElement.setAttribute("data-theme", LIGHT_THEME);
      localStorage.setItem("prefersLightTheme", "true");
    }
  };

  React.useEffect(() => {
    // get the current theme from localStorage on mount
    const prefersLight = localStorage.getItem("prefersLightTheme");
    if (prefersLight !== null) {
      setDarkMode(false);
      window.document.documentElement.setAttribute("data-theme", LIGHT_THEME);
    }
  }, []);

  return (
    <div className="flex items-center justify-between w-full">
      {/* LEFT SECTION WITH NAVIGATION-TABS */}
      <div className="justify-center gap-2 my-4 tabs w-max">
        {tabs.map((tab) => (
          <TabLink key={tab.name} href={tab.href} tabName={tab.name} />
        ))}
      </div>

      {/* RIGHT SECTION WITH LIGHT/DARK TOGGLE */}
      <div className={"flex justify-end items-center gap-4"}>
        <label className="items-center swap swap-rotate">
          <input type="checkbox" checked={isDarkMode} onChange={setTheme} />

          <SunIcon className="w-8 h-8 stroke-current swap-off" />
          <MoonIcon className="w-8 h-8 stroke-current swap-on" />
        </label>
      </div>
    </div>
  );
};
