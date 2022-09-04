import React, { useRef, useState } from "react";

export const GameTile = (props: {
  src: string;
  tile: { width: number; height: number; top?: number; speed?: number };
  state: number;
  scale: number;
}) => {
  const { src, tile, state, scale } = props;

  const left = tile.speed ? tile.speed * state : tile.width * state;

  return (
    <div
      style={{
        position: "relative",
        width: tile.width < 0 ? "100%" : `${tile.width}px`,
        height: `${tile.height}px`,
        overflow: "hidden",
        transform: `scale(${scale}, ${scale})`,
        transformOrigin: "top left",
        ...(tile.top ? { top: `${tile.top}px` } : {}),
      }}
    >
      <div
        style={{
          // backgroundSize: "100% 100%",
          backgroundImage: `url('${src}')`,
          backgroundPositionX: `-${left}px`,
          backgroundPositionY: "initial",
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          backgroundAttachment: "initial",
          backgroundOrigin: "initial",
          backgroundClip: "initial",
          backgroundColor: "initial",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          border: "0",
        }}
      />
    </div>
  );
};

export const GameSprite = (props: {
  src: string;
  tile: { width: number; height: number; top?: number; speed?: number };
  states: number;
  scale: number;
  framesPerStep: number;
}) => {
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
};
