import React, { useEffect } from "react";
import { NextLink } from "./next-link";
import { useRouter } from "next/router";
import { HiOutlineSun, HiOutlineMoon, HiMenuAlt2 } from "react-icons/hi";
import clsx from "clsx";

const tabs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Projectsdfvsdfsdvsdvsdfsf", href: "/projects" },
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
        "p-4 bg-base-100 opacity-100 lg:tab lg:tab-bordered lg:py-1 lg:px-2",
        {
          "opacity-80 tab-active": isActive,
          hidden: hide,
        }
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

          <HiOutlineSun className="w-10 h-10 stroke-current swap-off" />
          <HiOutlineMoon className="w-10 h-10 stroke-current swap-on" />
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
