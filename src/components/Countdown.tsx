import React, { useState } from "react";
import { compose } from "../helpers/compose";
import {
  cleanSym,
  padding4Zero,
  padZerosAndJoin,
  substringFromEnd4,
} from "../helpers/formating";
import useCount from "../hooks/useCountdown";
import { useKeyPress } from "../hooks/useKeyPress";
import GameSprite from "./Game_Sprite";
import GameTile from "./Game_Tile";
import Keyboard from "./Keyboard";

const INITIAL_COUNTER_VIEW = "00:00";

const useCountdown = () => {
  const [enterPress] = useKeyPress("Enter");
  const [scapePress] = useKeyPress("Escape");
  const [backspacePress] = useKeyPress("Backspace");
  const [spacePress] = useKeyPress(" ");
  const [numbersPressed, numberPressed] = useKeyPress("numbers");

  const [counterView, setCounterView] = useState(INITIAL_COUNTER_VIEW);
  const [counterTarget, setCounterTarget] = useState<null | number>(null);

  const [count, isRunning, { startCountdown, stopCountdown }] = useCount(
    counterTarget ? counterTarget : 0
  );

  React.useEffect(() => {
    if (count < 0) {
      document.title = "Finished!!";
      handleStop();
    } else {
      const minutes = Math.floor((count % (60 * 60)) / 60);
      const seconds = Math.floor(count % 60);
      const counterView = padZerosAndJoin([minutes, seconds]);
      setCounterView(counterView);
      if (counterView !== INITIAL_COUNTER_VIEW) {
        document.title = counterView;
      }
    }
  }, [count]);

  React.useEffect(() => {
    if (enterPress) {
      handleStart();
    }

    if (scapePress || backspacePress) {
      handleStop();
    }
    if (spacePress) {
      handlePause();
    }

    if (numbersPressed && !isRunning) {
      handleNumber(parseInt(numberPressed));
    }
  }, [
    enterPress,
    scapePress,
    backspacePress,
    spacePress,
    numbersPressed,
    numberPressed,
  ]);

  const handleNumber = (n: number) => {
    const value = counterView + String(n);
    setCounterView(
      compose(padZerosAndJoin, substringFromEnd4, padding4Zero, cleanSym)(value)
    );
  };

  const handlePause = () => {
    if (count > 0) {
      if (isRunning) {
        stopCountdown();
        document.title = "Paused!!";
      } else {
        startCountdown();
      }
    }
  };

  const handleStop = () => {
    stopCountdown();
    setCounterView(INITIAL_COUNTER_VIEW);
    setCounterTarget(null);
    document.title = "Stopped!!";
  };

  const handleStart = () => {
    const [minutes, seconds] = counterView
      .split(":")
      .map((v) => parseInt(v)) as [number, number];

    if (seconds + minutes * 60 > 0) {
      setCounterTarget(seconds + minutes * 60);
      startCountdown();
    }
  };

  return {
    counterView,
    count,
    counterTarget,
    isRunning,
    handleStart,
    handleStop,
    handlePause,
    handleNumber,
  };
};

export default function Countdown({ showKeyboard }: { showKeyboard: boolean }) {
  const {
    counterView,
    count,
    counterTarget,
    isRunning,
    handleStart,
    handleStop,
    handlePause,
    handleNumber,
  } = useCountdown();
  return (
    <div className="w-full">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          position: "relative",
          top: "18px",
        }}
      >
        {isRunning ? (
          <GameSprite
            src={"/ground.png"}
            states={12}
            tile={{ width: -1, height: 26, top: 94, speed: 10 }}
            scale={1}
            framesPerStep={6}
          />
        ) : (
          <GameTile
            src={"/ground.png"}
            state={0}
            tile={{ width: -1, height: 26, top: 94 }}
            scale={1}
          />
        )}
        {isRunning ? (
          <GameSprite
            src={"/dino-run.png"}
            states={4}
            tile={{ width: 88, height: 94 }}
            scale={1}
            framesPerStep={10}
          />
        ) : count == 0 ? (
          <GameTile
            src={"/dino-hurt.png"}
            state={0}
            tile={{ width: 80, height: 94 }}
            scale={1}
          />
        ) : (
          <GameTile
            src={"/dino-idle.png"}
            state={0}
            tile={{ width: 88, height: 94 }}
            scale={1}
          />
        )}
      </div>
      <div className="w-full flex justify-center border-4 border-t-0 border-r-4 border-b-4 border-l-4 mb-6">
        <div
          className="pt-5"
          style={{
            fontSize: "14vw",
          }}
        >
          {isRunning ? (
            <div className="counter glitch">
              <span>{counterView}</span>
              {counterView}
              <span>{counterView}</span>
            </div>
          ) : (
            counterView
          )}
        </div>
      </div>
      {showKeyboard ? (
        <div className="flex justify-center my-6 ">
          <Keyboard
            isPaused={!isRunning}
            isStopped={counterTarget === null}
            onPressNumber={(n) => handleNumber(n)}
            onPause={() => handlePause()}
            onPlay={() => handlePause()}
            onStop={() => handleStop()}
            onStart={() => handleStart()}
          />
        </div>
      ) : null}
    </div>
  );
}
