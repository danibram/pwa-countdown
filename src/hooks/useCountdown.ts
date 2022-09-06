import { useInterval } from "./useInterval";

import React, { useCallback, useEffect, useState } from "react";
import { compose } from "../helpers/compose";
import {
  padding4Zero,
  padZerosAndJoin,
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
  const INITIAL_COUNTER_VIEW: [string, string] = ["00", "00"];
  const COUNTER_SYMBOL = ":";

  const [enterPress] = useKeyPress("Enter");
  const [scapePress] = useKeyPress("Escape");
  const [backspacePress] = useKeyPress("Backspace");
  const [spacePress] = useKeyPress(" ");
  const [numbersPressed, numberPressed] = useKeyPress("numbers");

  const [counterState, setCounterState] =
    React.useState<counterState>("not-started");
  const [counterView, setCounterView] =
    React.useState<[string, string]>(INITIAL_COUNTER_VIEW);
  const [counterTarget, setCounterTarget] = React.useState<null | number>(null);

  const [count, isRunning, { startCountdown, stopCountdown }] =
    useBaseCountdown(counterTarget ? counterTarget : 0);

  const handleReset = () => {
    stopCountdown();
    setCounterView(INITIAL_COUNTER_VIEW);
    setCounterTarget(null);
  };

  React.useEffect(() => {
    if (count < 0) {
      document.title = "Finished!!";
      setCounterState("finished");
      handleReset();
    } else {
      const minutes = Math.floor((count % (60 * 60)) / 60);
      const seconds = Math.floor(count % 60);
      const counterView = padZerosAndJoin([minutes, seconds]);
      setCounterView(counterView);
      if (counterView !== INITIAL_COUNTER_VIEW) {
        document.title = counterView.join(COUNTER_SYMBOL);
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
    const valueArr = compose(
      padZerosAndJoin,
      substringFromEnd4,
      padding4Zero
    )(value);
    setCounterView(valueArr);

    if (valueArr[0] !== "00" || valueArr[1] !== "00") {
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
    const [minutes, seconds] = counterView.map((v) => parseInt(v)) as [
      number,
      number
    ];

    if (seconds + minutes * 60 > 0) {
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
