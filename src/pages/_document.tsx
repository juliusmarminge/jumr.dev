import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="og:title" content="jumr.dev - Meet Julius" />
          <meta
            name="description"
            content="Hi, I'm Julius! A Software Engineer from Sweden passionate about tech."
          />
          <meta
            name="description"
            content="Hi, I'm Julius! A Software Engineer from Sweden passionate about tech."
          />
          <meta property="og:url" content="https://jumr.dev/" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/seo/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/seo/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/seo/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/seo/favicon-16x16.png"
          />
          <link rel="manifest" href="/seo/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/seo/safari-pinned-tab.svg"
            color="#9ca3af"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body className="min-h-screen antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
