import { useInterval } from "./useInterval";

import { useCallback, useEffect, useState } from "react";

function useCountdown(initialCount: number): [
  number,
  boolean,
  {
    startCountdown: () => void;
    stopCountdown: () => void;
  }
] {
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
}

export default useCountdown;
