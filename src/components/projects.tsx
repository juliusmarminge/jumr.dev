import { motion } from "framer-motion";

interface ProjectProps {
  img: string;
  title: string;
  description: string[];
  previewLink: string;
  githubLink: string;
}

const ProjectCard: React.FC<ProjectProps> = (props) => {
  return (
    <div className="flex h-[85vh] flex-shrink-0 snap-center flex-col items-center justify-center space-y-5 p-20 md:p-40">
      <motion.img
        initial={{ opacity: 0, y: -300 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        height={500}
        width={500}
        src={props.img}
        alt={props.title}
      />

      <div className="max-w-6xl px-0 md:px-10">
        <h4 className="py-4 text-center text-4xl font-semibold">
          {props.title}
        </h4>
        {props.description.map((desc, idx) => (
          <p
            key={`desc-${idx}`}
            className="py-2 text-center text-lg md:text-left"
          >
            {desc}
          </p>
        ))}
      </div>
    </div>
  );
};

export const Projects = () => {
  const projects: ProjectProps[] = [
    {
      img: "https://user-images.githubusercontent.com/51714798/185813523-7882d03d-1449-4a07-8771-c45af37025a8.png",
      title: "Create T3 Turbo",
      description: [
        "Create T3 Turbo is a clean and simple starter repo using the T3 Stack along with Expo React Native. " +
          "It uses the T3 Stack, but has separated all the pieces out to make use of Turborepo caching, " +
          "and to enable the tRPC API and Prisma Client to be reused for multiple applications.",
        "It comes with two applications; a Next.js for the web, and a Expo React Native for mobile, " +
          "but can be easily extended to include more to suit your needs.",
      ],
      previewLink: "https://create-t3-turbo.vercel.app/",
      githubLink: "https://github.com/t3-oss/create-t3-turbo",
    },
    {
      img: "https://raw.githubusercontent.com/juliusmarminge/jumr.dev/main/public/images/stocks.png",
      title: "Stocks",
      description: [
        "A simple visualizer of different pathfinding algorithms.",
        "This project was created to help me understand how pathfinding algorithms work, and to help me learn React. " +
          "It was initially wrote using class components and `create-react-app`, " +
          "but I have since rewritten it using functional components and Vite. " +
          "I've been meaning to add more algorithms, but it's not a priority I have at the moment.",
      ],
      previewLink: "https://stocks.jumr.dev/",
      githubLink: "https://github.com/juliusmarminge/stocks",
    },
    {
      img: "https://user-images.githubusercontent.com/51714798/175106114-f26d6d3f-a1a9-4077-8558-ab94797a9668.gif",
      title: "Pathfinding Visualizer",
      description: [
        "A simple visualizer of different pathfinding algorithms.",
        "This project was created to help me understand how pathfinding algorithms work, and to help me learn React. " +
          "It was initially wrote using class components and `create-react-app`, " +
          "but I have since rewritten it using functional components and Vite. " +
          "I've been meaning to add more algorithms, but it's not a priority I have at the moment.",
      ],
      previewLink: "https://pfv.jumr.dev/",
      githubLink: "https://github.com/juliusmarminge/pathfinding-visualizer",
    },
    {
      img: "https://user-images.githubusercontent.com/51714798/175004224-87370b3c-5bf0-4c6e-828e-490bff464adb.gif",
      title: "Sorting Visualizer",
      description: [
        "Visualizer for visualizing sorting algorithms." +
          "Very similar to the Pathfinding Visualizer, but for sorting algorithms. ",
      ],
      previewLink: "https://sv.jumr.dev/",
      githubLink: "https://github.com/juliusmarminge/sorting-visualizer",
    },
  ];
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
        {projects.map((project, idx) => (
          <ProjectCard key={`project-card-${idx}`} {...project} />
        ))}
      </div>
    </motion.div>
  );
};
