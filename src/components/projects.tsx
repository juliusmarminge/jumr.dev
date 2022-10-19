import { motion } from "framer-motion";

const ProjectCard = () => {
  return (
    <div className="flex h-[85vh] flex-shrink-0 snap-center flex-col items-center justify-center space-y-5 p-20 md:p-40">
      <motion.img
        initial={{ opacity: 0, y: -300 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        height={500}
        width={500}
        src="https://github.com/t3-oss/create-t3-app/blob/next/www/public/images/og-image.png?raw=true"
        alt="dummy project img"
      />

      <div className="max-w-6xl space-y-10 px-0 md:px-10">
        <h4 className="text-center text-4xl font-semibold">Create T3 App</h4>
        <p className="text-center text-lg md:text-left">
          Create T3 App is an opinionated Next.js template that helps you get
          started with your next project.
        </p>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="section-container"
    >
      <h3 className="section-title">Projects</h3>

      <div className="absolute  top-1/3 left-0 h-[500px] w-full -skew-y-12 bg-accent-500/10" />

      <div className="relative z-20 flex w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-accent-500/80">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </motion.div>
  );
};
