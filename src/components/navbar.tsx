import React from "react";
import { NextLink } from "./next-link";
import { useRouter } from "next/router";
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStars } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import clsx from "clsx";

const tabs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
];

const TabLink: React.FC<{
  href: string;
  name: string;
}> = ({ href, name }) => {
  const router = useRouter();
  const isActive = router.route === href;

  return (
    <NextLink
      href={href}
      className={clsx("py-1, px-2 lg:tab lg:tab-bordered", {
        "opacity-80 tab-active": isActive,
      })}
    >
      {name}
    </NextLink>
  );
};

export const Navbar = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {/** Mobile Dropdown Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="p-2 btn btn-ghost lg:hidden">
            <BiMenu className="w-8 aspect-square" />
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {tabs.map((tab) => (
              <TabLink key={tab.href} {...tab} />
            ))}
          </ul>
        </div>
        {/** End Mobile Dropdown Menu */}

        {/** Desktop Tab Menu */}
        <div className="hidden lg:flex">
          <ul className="flex gap-4 p-0 menu menu-horizontal">
            {tabs.map((tab) => (
              <TabLink key={tab.href} {...tab} />
            ))}
          </ul>
        </div>
        {/** End Desktop Tab Menu */}
      </div>

      <div className="gap-4 navbar-end">
        {/** Theme Toggle */}

        <label className="items-center swap swap-rotate">
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />

          <TiWeatherSunny className="w-10 h-10 stroke-current swap-off" />
          <BsMoonStars className="w-10 h-10 stroke-current swap-on" />
        </label>

        {/** End Theme Toggle */}
      </div>
    </div>
  );
};

const useDarkMode = () => {
  const [usingDarkMode, setUsingDarkMode] = React.useState(true);

  const darkTheme = "night";
  const lightTheme = "emerald";

  React.useEffect(() => {
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

    const colorSchemeChangeListener = (e: MediaQueryListEvent) => {
      setUsingDarkMode(e.matches);
      const newTheme = e.matches ? darkTheme : lightTheme;
      window.document.documentElement.setAttribute("data-theme", newTheme);
    };

    mediaMatch.addEventListener("change", colorSchemeChangeListener);

    setUsingDarkMode(mediaMatch.matches);

    return () => {
      mediaMatch.removeEventListener("change", colorSchemeChangeListener);
    };
  }, []);

  const toggleDarkMode = () => {
    setUsingDarkMode(!usingDarkMode);
    const newTheme = usingDarkMode ? lightTheme : darkTheme;
    window.document.documentElement.setAttribute("data-theme", newTheme);
  };

  return [usingDarkMode, toggleDarkMode] as const;
};
