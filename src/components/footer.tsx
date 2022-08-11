import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="pb-10 footer">
      <div>
        <span className="footer-title">Learn More</span>
        <Link href="/about">
          <a className="link link-hover">Get to know me!</a>
        </Link>
        <Link href="/projects">
          <a className="link link-hover">Take a look at my projects!</a>
        </Link>
        <Link href="/blog">
          <a className="link link-hover">Read my blog!</a>
        </Link>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <Link href="https://github.com/juliusmarminge">
          <a className="link link-hover">GitHub</a>
        </Link>
        <Link href="https://twitter.com/jullerino">
          <a className="link link-hover">Twitter</a>
        </Link>
        <Link href="https://discordapp.com/users/julius#3394">
          <a className="link link-hover">Discord</a>
        </Link>
      </div>
    </footer>
  );
};
