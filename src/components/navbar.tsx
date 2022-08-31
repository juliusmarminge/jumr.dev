import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { HiMenuAlt2, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

import { NextLink } from "./next-link";

const tabs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
];

const TabLink: React.FC<{
  href: string;
  name: string;
  hide?: boolean;
}> = ({ href, name, hide }) => {
  const router = useRouter();
  const isActive = router.route === href;

  return (
    <NextLink
      href={href}
      className={clsx(
        "w-72 bg-base-100 p-4 opacity-100 lg:tab lg:tab-bordered lg:w-max lg:py-1 lg:px-2",
        {
          "tab-active lg:opacity-80": isActive,
          hidden: hide,
        },
      )}
    >
      {name}
    </NextLink>
  );
};

export const Navbar = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsDropDownOpen(false);
  }, [router]);
  return (
    <div className="navbar bg-base-100 pb-8">
      <div className="navbar-start">
        {/** Mobile Dropdown Menu */}
        <div>
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <HiMenuAlt2
              className={clsx("inline-block h-10 w-10 transition-transform", {
                "rotate-90": isDropDownOpen,
              })}
            />
          </button>

          <ul className="absolute z-10 flex flex-col lg:hidden">
            {tabs.map((tab) => (
              <TabLink key={tab.href} {...tab} hide={!isDropDownOpen} />
            ))}
          </ul>
        </div>
        {/** End Mobile Dropdown Menu */}

        {/** Desktop Tab Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal flex gap-4 p-0">
            {tabs.map((tab) => (
              <TabLink key={tab.href} {...tab} />
            ))}
          </ul>
        </div>
        {/** End Desktop Tab Menu */}
      </div>

      <div className="navbar-end gap-4">
        {/** Theme Toggle */}

        <label className="swap swap-rotate items-center">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />

          <HiOutlineSun className="swap-on h-10 w-10 stroke-current" />
          <HiOutlineMoon className="swap-off h-10 w-10 stroke-current" />
        </label>

        {/** End Theme Toggle */}
      </div>
    </div>
  );
};

const useDarkMode = () => {
  const [usingDarkMode, setUsingDarkMode] = React.useState(true);

  const darkTheme = "black";
  const lightTheme = "emerald";

  React.useEffect(() => {
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

    const colorSchemeChangeListener = (e: MediaQueryListEvent) => {
      setUsingDarkMode(!e.matches);
      const newTheme = e.matches ? darkTheme : lightTheme;
      window.document.documentElement.setAttribute("data-theme", newTheme);
    };

    mediaMatch.addEventListener("change", colorSchemeChangeListener);

    setUsingDarkMode(mediaMatch.matches);
    toggleDarkMode();

    return () => {
      mediaMatch.removeEventListener("change", colorSchemeChangeListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    setUsingDarkMode(!usingDarkMode);
    const newTheme = usingDarkMode ? darkTheme : lightTheme;
    window.document.documentElement.setAttribute("data-theme", newTheme);
  };

  return [usingDarkMode, toggleDarkMode] as const;
};
