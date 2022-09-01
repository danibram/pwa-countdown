import type { NextPage } from "next";
import React from "react";
import Countdown from "../components/Countdown";
import { Context, ContextOutput } from "../hocs/a2hs";

const Home: NextPage = () => {
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const { isAppInstalled, isAppInstallable, deferredPrompt } = React.useContext(
    Context
  ) as ContextOutput;
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener("installed", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("controlling", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("activated", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = (event) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (
          confirm(
            "A newer version of this web app is available, reload to update?"
          )
        ) {
          wb.addEventListener("controlling", (event) => {
            window.location.reload();
          });

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSkipWaiting();
        } else {
          console.log(
            "User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time."
          );
        }
      };

      wb.addEventListener("waiting", promptNewVersionAvailable);

      // ISSUE - this is not working as expected, why?
      // I could only make message event listenser work when I manually add this listenser into sw.js file
      wb.addEventListener("message", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      /*
      wb.addEventListener('redundant', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalinstalled', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalactivated', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      */

      // never forget to call register as auto register is turned off in next.config.js
      wb.register();
    }
  }, []);

  return (
    <>
      <div className="overlayScan"></div>
      <div className="overlayStatic"></div>
      <div className="overlayAnimation"></div>
      <main className="container mx-auto flex flex-col items-center justify-between min-h-screen p-4">
        <div className="container flex ">
          <Countdown showKeyboard={showKeyboard} />
        </div>
        <div className="block container nes-container is-dark with-title mb-6 text-left">
          <p className="title">Trainer tips</p>
          <div className="lists">
            <ul className="nes-list is-disc">
              <li>
                Set timer with keyboard numbers, mobile user{" "}
                <a
                  className="underline"
                  href="javascript:;"
                  onClick={() => setShowKeyboard((value) => !value)}
                >
                  {showKeyboard ? "Hide" : "Show"} keyboard here
                </a>
              </li>
              <li>Enter to start</li>
              <li>Spacebar to pause/unpause</li>
              <li>Escape/Backspace to stop</li>

              {isAppInstallable && !isAppInstalled ? (
                <li>
                  <a
                    className="underline"
                    href="javascript:;"
                    onClick={() => deferredPrompt?.prompt()}
                  >
                    App not installed click here to install
                  </a>
                </li>
              ) : isAppInstalled ? (
                <li>App installed</li>
              ) : (
                <li>App is not installable</li>
              )}
            </ul>
          </div>
        </div>
        <div
          className={
            "flex justify-center items-center flex-col border-none bg-transparent mt-5"
          }
        >
          <a
            className={
              "font-bold flex justify-start items-center cursor-pointer"
            }
            href="https://github.com/danibram/pwa-countdown"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="nes-octocat animate"></i>
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;
