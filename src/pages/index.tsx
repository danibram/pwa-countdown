import type { NextPage } from "next";
import React from "react";
import Countdown from "../components/Countdown";
import { Context, ContextOutput } from "../hocs/a2hs";

const Home: NextPage = () => {
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const { isAppInstalled, isAppInstallable, deferredPrompt } = React.useContext(
    Context
  ) as ContextOutput;

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
