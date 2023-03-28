import Image from "next/image";

import { type Meta } from "~/app/blog/helpers";

export const BlogCard = (props: Meta) => {
  return (
    <div className="flex cursor-pointer flex-col rounded-lg border p-4 transition-all hover:scale-105">
      <h4 className="text-center text-lg font-semibold">{props.title}</h4>
      <p className="text-center text-sm uppercase">{props.date}</p>
      <div>
        <Image
          src={props.previewImg}
          alt={props.title}
          className="mx-auto object-cover py-4 md:h-48 xl:h-52"
          height={400}
          width={800}
        />
        <p className="text-sm line-clamp-3 md:text-left">{props.description}</p>
      </div>
    </div>
  );
};
