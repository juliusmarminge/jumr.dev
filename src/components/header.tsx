import Link from 'next/link';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { SiDiscord, SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';

export const Header: React.FC<{ isBlog?: boolean }> = ({ isBlog = false }) => {
  return (
    <header
      className={clsx(
        'top-0 z-20 mx-auto flex max-w-7xl items-start justify-between p-5 pt-8 xl:items-center',
        { sticky: !isBlog },
      )}
    >
      <motion.div
        initial={isBlog ? {} : { opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="flex items-center"
      >
        <Link href="https://github.com/juliusmarminge">
          <SiGithub className="header-icon" title="Github" />
        </Link>
        <Link href="https://twitter.com/jullerino">
          <SiTwitter className="header-icon" title="Twitter" />
        </Link>
        <Link href="https://www.linkedin.com/in/julius-marminge-b9a12a241/">
          <SiLinkedin className="header-icon" title="LinkedIn" />
        </Link>
        <Link href="https://discord.com/users/136072283444871168">
          <SiDiscord className="header-icon" title="Discord" />
        </Link>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="flex cursor-pointer items-center"
      >
        <SlEnvolope className="header-icon" />
        <span className="hidden text-sm uppercase text-gray-400 md:inline-flex">
          Contact
        </span>
      </motion.div> */}
    </header>
  );
};
