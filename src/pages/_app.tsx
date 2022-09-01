import type { AppType } from "next/dist/shared/lib/utils";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";

const A2HSProvider: any = dynamic(() => import("../hocs/a2hs"), {
  ssr: false,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const registerWB = async (w: any) => {
      const wb = w.workbox as any;

      const showSkipWaitingPrompt = function () {
        if (
          confirm(
            "Nueva versión de la página en marcha. ¡No esperes más a actualizarla!"
          )
        ) {
          wb.addEventListener("controlling", () => {
            window.location.reload();
          });
          wb.messageSW({ type: "SKIP_WAITING" });
        }
      };

      wb.addEventListener("waiting", showSkipWaitingPrompt);
      wb.addEventListener("externalwaiting", showSkipWaitingPrompt);

      wb.addEventListener(
        "message",
        (event: { type: any; data: { type: string } }) => {
          console.log(`Event ${event.type} is triggered.`);
          console.log(event);
          if (event.data && event.data.type === "SKIP_WAITING") {
            wb.messageSkipWaiting();
          }
        }
      );
      wb.addEventListener("installed", (event: { type: any }) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("controlling", (event: { type: any }) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("activated", (event: { type: any }) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      await wb.register();
    };

    // // Detects if device is on iOS
    // const isIos = () => {
    //     const userAgent = window.navigator.userAgent.toLowerCase();
    //     return /iphone|ipad|ipod/.test(userAgent);
    // };
    // // Detects if device is in standalone mode
    // const isInStandaloneMode = () =>
    //     'standalone' in window.navigator && window.navigator.standalone;

    // // Checks if should display install popup notification:
    // if (isIos() && !isInStandaloneMode()) {
    //     this.setState({ showInstallMessage: true });
    // }

    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any).workbox !== undefined
    ) {
      registerWB(window);
    }
  });

  return (
    <>
      <Head>
        <title>8bit Counter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <A2HSProvider>
        <Component {...pageProps} />
      </A2HSProvider>
    </>
  );
};

export default MyApp;
