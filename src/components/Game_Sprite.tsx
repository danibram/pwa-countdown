import React, { useRef, useState } from "react";
import GameTile from "./Game_Tile";

export default function GameSprite(props: {
  src: string;
  tile: { width: number; height: number; top?: number; speed?: number };
  states: number;
  scale: number;
  framesPerStep: number;
}) {
  const { framesPerStep, states, src, tile, scale } = props;
  const [state, setState] = useState(0);
  const tick = useRef(0);
  const frame = useRef(0);

  const animate = () => {
    if (tick.current === framesPerStep) {
      tick.current = 0;
      setState((state) => (state + 1) % states);
    }

    tick.current += 1;

    frame.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    animate();

    () => cancelAnimationFrame(frame.current);
  }, [framesPerStep]);

  return <GameTile src={src} state={state} tile={tile} scale={scale} />;
}
