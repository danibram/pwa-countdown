import type { NextPage } from "next";
import Countdown from "../components/Countdown";

const Home: NextPage = () => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="container flex ">
          <Countdown />
        </div>
        <div
          className="hidden lg:block container nes-container with-title mb-6"
          style={{ textAlign: "left" }}
        >
          <p className="title">Trainer tips</p>
          <div className="lists">
            <ul className="nes-list is-disc">
              <li>Set timer with keyboard numbers</li>
              <li>Enter to start</li>
              <li>Spacebar to pause/unpause</li>
              <li>Escape/Backspace to stop</li>
            </ul>
          </div>
        </div>
        <div
          className={
            "flex justify-center items-center flex-col border-none bg-transparent text-black"
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
            <span className={"ml-6"}>Source</span>
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;
