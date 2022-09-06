import { counterState } from "../../hooks/useCountdown";
import CountdownView from "../molecules/CountdownView";

export default function Countdown({
  counterState,
  counterView,
  isVertical,
}: {
  counterState: counterState;
  isVertical: boolean;
  counterView: [string, string];
}) {
  return (
    <div
      className={[
        "w-full flex justify-center border-4 border-t-4 border-r-4 border-b-4 border-l-4 mb-6",
        ...(isVertical ? ["flex-col"] : []),
      ].join(" ")}
    >
      <div
        className={[
          "justify-center items-center flex",
          ...(isVertical ? ["flex-col"] : []),
        ].join(" ")}
        style={{
          fontSize: !isVertical ? "16vw" : "26vw",
        }}
      >
        <CountdownView
          counterState={counterState}
          isVertical={isVertical}
          counterView={counterView}
        />
      </div>
    </div>
  );
}
