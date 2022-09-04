import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CountdownView from "../molecules/CountdownView";
import Sprites from "../molecules/Sprites";

export default function Countdown({
  isRunning,
  count,
  counterView,
}: {
  isRunning: boolean;
  count: number;
  counterView: [string, string];
}) {
  const { height, width } = useWindowDimensions();
  const isVertical = React.useMemo(() => height / width > 1.2, [height, width]);

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
        <Sprites isRunning={isRunning} count={count} />
      </div>
      <div
        className={[
          "w-full flex  justify-center border-4 border-t-0 border-r-4 border-b-4 border-l-4 mb-6",
          ...(isVertical ? ["flex-col"] : []),
        ].join(" ")}
      >
        <div
          className={[
            "justify-center items-center flex",
            ...(isVertical ? ["flex-col"] : []),
          ].join(" ")}
          style={{
            fontSize: !isVertical ? "17vw" : "33vw",
          }}
        >
          <CountdownView
            isRunning={isRunning}
            isVertical={isVertical}
            counterView={counterView}
          />
        </div>
      </div>
    </div>
  );
}
