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

const useCountdown = () => {
  const INITIAL_COUNTER_VIEW: [string, string] = ["00", "00"];
  const COUNTER_SYMBOL = ":";

  const [enterPress] = useKeyPress("Enter");
  const [scapePress] = useKeyPress("Escape");
  const [backspacePress] = useKeyPress("Backspace");
  const [spacePress] = useKeyPress(" ");
  const [numbersPressed, numberPressed] = useKeyPress("numbers");

  const [counterView, setCounterView] =
    React.useState<[string, string]>(INITIAL_COUNTER_VIEW);
  const [counterTarget, setCounterTarget] = React.useState<null | number>(null);

  const [count, isRunning, { startCountdown, stopCountdown }] =
    useBaseCountdown(counterTarget ? counterTarget : 0);

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
    setCounterView(
      compose(padZerosAndJoin, substringFromEnd4, padding4Zero)(value)
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
    const [minutes, seconds] = counterView.map((v) => parseInt(v)) as [
      number,
      number
    ];

    if (seconds + minutes * 60 > 0) {
      setCounterTarget(seconds + minutes * 60);
      startCountdown();
    }
  };

  return {
    counterView,
    count,
    counterTarget,
    isStopped: !counterTarget,
    isPaused: !isRunning && counterTarget !== null && counterTarget > 0,
    isRunning,
    handleStart,
    handleStop,
    handlePause,
    handleNumber,
  };
};

export default useCountdown;
