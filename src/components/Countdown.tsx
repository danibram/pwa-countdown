import { useEffect, useState } from "react";
import { compose } from "../helpers/compose";
import {
  cleanSym,
  padding4Zero,
  padZerosAndJoin,
  substringFromEnd4,
} from "../helpers/formating";
import useCountdown from "../hooks/useCountdown";
import { useKeyPress } from "../hooks/useKeyPress";
import GameSprite from "./Game_Sprite";
import GameTile from "./Game_Tile";
import Keyboard from "./keyBoard";

export default function Countdown() {
  const [enterPress] = useKeyPress("Enter");
  const [scapePress] = useKeyPress("Escape");
  const [backspacePress] = useKeyPress("Backspace");
  const [spacePress] = useKeyPress(" ");
  const [numbersPressed, numberPressed] = useKeyPress("numbers");

  const [counter, setCounter] = useState("00:00");
  const [target, setTarget] = useState<null | number>(null);

  const [count, isRunning, { startCountdown, stopCountdown }] = useCountdown(
    target ? target : 0
  );

  const handleNumber = (n: number) => {
    const value = counter + String(n);
    setCounter(
      compose(padZerosAndJoin, substringFromEnd4, padding4Zero, cleanSym)(value)
    );
  };

  const handlePause = () => {
    if (count > 0) {
      isRunning && stopCountdown();
      !isRunning && startCountdown();
    }
  };

  const handleStop = () => {
    stopCountdown();
    setCounter("00:00");
    setTarget(null);
  };

  const handleStart = () => {
    const [minutes, seconds] = counter.split(":").map((v) => parseInt(v)) as [
      number,
      number
    ];

    console.log(minutes, seconds);
    if (seconds + minutes * 60 > 0) {
      setTarget(seconds + minutes * 60);
      startCountdown();
    }
  };

  useEffect(() => {
    if (count < 0) {
      handleStop();
    } else {
      const minutes = Math.floor((count % (60 * 60)) / 60);
      const seconds = Math.floor(count % 60);
      console.log(count);
      setCounter(padZerosAndJoin([minutes, seconds]));
    }
  }, [count]);

  useEffect(() => {
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
      <div
        className="w-full flex justify-center border-4 border-t-0 border-r-gray-800  border-b-gray-800 border-l-gray-800 mb-6"
        style={{ paddingTop: "18px" }}
      >
        <div
          style={{
            fontSize: "14vw",
          }}
        >
          {counter}
        </div>
      </div>
      <div className="flex lg:hidden nes-container justify-center my-6 visible lg:invisible">
        <Keyboard
          isPaused={!isRunning}
          isStopped={target === null}
          onPressNumber={(n) => handleNumber(n)}
          onPause={() => handlePause()}
          onPlay={() => handlePause()}
          onStop={() => handleStop()}
          onStart={() => handleStart()}
        />
      </div>
    </div>
  );
}
