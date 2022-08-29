export default function GameTile(props: {
  src: string;
  tile: { width: number; height: number; top?: number; speed?: number };
  state: number;
  scale: number;
}) {
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
}
