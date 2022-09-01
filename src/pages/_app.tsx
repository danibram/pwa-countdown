import type { AppType } from "next/dist/shared/lib/utils";
import dynamic from "next/dynamic";
import Head from "next/head";
import "../styles/globals.css";

const A2HSProvider = dynamic(() => import("../hocs/a2hs"), {
  ssr: false,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>8bit Counter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <A2HSProvider>
        <Component {...pageProps} />
      </A2HSProvider>
    </>
  );
};

export default MyApp;
