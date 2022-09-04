import { GameSprite, GameTile } from "../atoms/Game";

const Sprites = ({
  isRunning,
  count,
}: {
  isRunning: boolean;
  count: number;
}) => {
  return (
    <>
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
    </>
  );
};

export default Sprites;
