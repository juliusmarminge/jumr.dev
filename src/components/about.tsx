import { motion } from "framer-motion";

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="section-container"
    >
      <h3 className="section-title">About</h3>

      <motion.img
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        src="/alt.png"
        className="md:md-0 -mb-20 h-56 w-56 flex-shrink-0 rounded-full object-cover md:h-64 md:w-64 md:rounded-lg xl:h-[500px] xl:w-[500px]"
      ></motion.img>

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">Get to know me!</h4>
        <p className="text-base">
          I&apos;m a software engineer from Sweden. I&apos;m passionate about
          building
        </p>
      </div>
    </motion.div>
  );
};
