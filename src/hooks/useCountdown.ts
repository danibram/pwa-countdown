import { useInterval } from "./useInterval";

import React, { useCallback, useEffect, useState } from "react";
import { compose } from "../helpers/compose";
import {
  cleanDashes,
  padding4Zero,
  padZeroAndSplit,
  substringFromEnd4,
} from "../helpers/formating";
import { useKeyPress } from "./useKeyPress";

const useBaseCountdown = (
  initialCount: number
): [
  number,
  boolean,
  {
    startCountdown: () => void;
    stopCountdown: () => void;
  }
] => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const [isRunning, setIsRunning] = useState(false);
  const startCountdown = () => setIsRunning(true);
  const stopCountdown = () => setIsRunning(false);

  const countdownCallback = useCallback(() => {
    if (count < 0) {
      stopCountdown();
      return;
    }

    setCount((c) => c - 1);
  }, [count]);

  useInterval(countdownCallback, isRunning ? 1000 : null);

  return [
    count,
    isRunning,
    {
      startCountdown,
      stopCountdown,
    },
  ];
};

export type counterState =
  | "not-started"
  | "ready"
  | "running"
  | "paused"
  | "stopped"
  | "finished";

const useCountdown = () => {
  const INITIAL_COUNTER_VIEW: [string, string, string, string] = [
    "_",
    "_",
    "_",
    "_",
  ];
  const COUNTER_SYMBOL = ":";

  const [enterPress] = useKeyPress("Enter");
  const [scapePress] = useKeyPress("Escape");
  const [backspacePress] = useKeyPress("Backspace");
  const [spacePress] = useKeyPress(" ");
  const [numbersPressed, numberPressed] = useKeyPress("numbers");

  const [counterState, setCounterState] =
    React.useState<counterState>("not-started");
  const [counterView, setCounterView] =
    React.useState<[string, string, string, string]>(INITIAL_COUNTER_VIEW);
  const [counterTarget, setCounterTarget] = React.useState<null | number>(null);

  const [count, isRunning, { startCountdown, stopCountdown }] =
    useBaseCountdown(counterTarget ? counterTarget : 0);

  const handleReset = () => {
    stopCountdown();
    setCounterView(INITIAL_COUNTER_VIEW);
    setCounterTarget(null);
  };

  React.useEffect(() => {
    if (counterState === "running") {
      if (count < 0) {
        document.title = "Finished!!";
        setCounterState("finished");
        handleReset();
      } else {
        const minutes = Math.floor((count % (60 * 60)) / 60);
        const seconds = Math.floor(count % 60);
        const [m1, m2] = padZeroAndSplit(minutes);
        const [s1, s2] = padZeroAndSplit(seconds);
        setCounterView([m1, m2, s1, s2]);
        document.title = [m1, m2, COUNTER_SYMBOL, s1, s2].join("");
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
    const value = counterView.join("") + String(n);
    const valueArr = compose(substringFromEnd4, padding4Zero)(value);
    setCounterView(valueArr);

    if (!valueArr.every((s) => s === "0" || s === "_")) {
      setCounterState("ready");
    }
  };

  const handlePause = () => {
    if (count > 0) {
      if (isRunning) {
        stopCountdown();
        document.title = "Paused!!";
        setCounterState("paused");
      } else {
        startCountdown();
        setCounterState("running");
      }
    }
  };

  const handleStop = () => {
    handleReset();
    document.title = "Stopped!!";
    setCounterState("stopped");
  };

  const handleStart = () => {
    const [m2, m1, s2, s1] = cleanDashes(counterView);
    const minutes = parseInt(m2 + m1);
    const seconds = parseInt(s2 + s1);

    if (seconds + minutes * 60 > 0) {
      setCounterView([m2, m1, s2, s1]);
      setCounterTarget(seconds + minutes * 60);
      startCountdown();
      setCounterState("running");
    }
  };

  return {
    counterState,
    counterView,
    count,
    counterTarget,
    handleStart,
    handleStop,
    handlePause,
    handleNumber,
  };
};

export default useCountdown;
