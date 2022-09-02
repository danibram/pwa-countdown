import type { NextPage } from "next";
import React from "react";
import Countdown from "../components/Countdown";
import { Context, ContextOutput } from "../hocs/a2hs";

const Home: NextPage = () => {
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const { isAppInstalled, isAppInstallable, deferredPrompt } = React.useContext(
    Context
  ) as ContextOutput;

  return (
    <>
      <div className="overlayScan"></div>
      <div className="overlayStatic"></div>
      <div className="overlayAnimation"></div>
      <div className="fixed right-0 text-sm mt-2 mr-2">
        <button
          className="m-2 p-2 mr-2 btn"
          onClick={() => setShowKeyboard((value) => !value)}
        >
          {showKeyboard ? "Hide" : "Show"} keyboard
        </button>
        <button
          className="m-2 p-2 btn"
          onClick={() => setShowHelp((value) => !value)}
        >
          ?
        </button>
      </div>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="container flex ">
          <Countdown showKeyboard={showKeyboard} />
        </div>
        {/* <div className="block container nes-container is-dark with-title mb-6 text-left">
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
              <li>Spacebar to pause / unpause</li>
              <li>Escape / Backspace to stop</li>

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
              ) : null}
            </ul>
          </div>
        </div> */}
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
      {showHelp ? (
        <div
          id="defaultModal"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0 h-modal md:h-full backdrop-blur-sm bg-white/30"
        >
          <div className="relative right-0 p-4 w-full max-w-2xl h-full md:h-auto">
            <dialog
              className="nes-dialog is-dark is-rounded"
              id="dialog-dark-rounded"
              open
            >
              <div className="block container nes-container is-dark with-title mb-6 text-left">
                <p className="title">Trainer tips</p>
                <div className="lists">
                  <ul className="nes-list is-disc">
                    <li>
                      Set timer with keyboard numbers, mobile user use show
                      keyboard button ;)
                    </li>
                    <li>Enter to start</li>
                    <li>Spacebar to pause / unpause</li>
                    <li>Escape / Backspace to stop</li>

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
                    ) : null}
                  </ul>
                </div>
              </div>
              <button className="nes-btn" onClick={() => setShowHelp(false)}>
                Understand
              </button>
            </dialog>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Home;
