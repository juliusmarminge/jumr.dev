import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
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
          <meta property="title" content="🇸🇪 Julius | SWE | OSS" />
          <meta property="og:title" content="🇸🇪 Julius | SWE | OSS" />
          <meta
            name="description"
            content="Hi, I'm Julius! A Software Engineer from Sweden passionate about tech."
          />
          <meta
            name="og:description"
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
          <meta name="twitter:image" content="/api/og" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@jullerino" />
          <meta name="og:image" content="/api/og" />
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
