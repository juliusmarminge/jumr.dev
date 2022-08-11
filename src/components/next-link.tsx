import Link from "next/link";

export const NextLink: React.FC<{
  href: string;
  className: string;
  children: React.ReactNode;
}> = ({ href, children, className }) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};
