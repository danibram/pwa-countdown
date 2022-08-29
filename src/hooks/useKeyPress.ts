import { useEffect, useState } from "react";

export function useKeyPress(targetKey: string): [boolean, string] {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState([false, ""]);
  // If pressed key is our target key then set to true
  const downHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed([true, key]);
    }
    if ("numbers" === targetKey && /[0-9]/.test(key)) {
      setKeyPressed([true, key]);
    }
  };
  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed([false, key]);
    }

    if ("numbers" === targetKey && /[0-9]/.test(key)) {
      setKeyPressed([false, key]);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed as [boolean, string];
}
