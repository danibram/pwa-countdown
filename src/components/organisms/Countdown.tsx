import { counterState } from "../../hooks/useCountdown";
import CountdownView from "../molecules/CountdownView";

export default function Countdown({
  counterState,
  counterView,
  isVertical,
}: {
  counterState: counterState;
  isVertical: boolean;
  counterView: [string, string, string, string];
}) {
  return (
    <div className={["w-full flex justify-center mb-6"].join(" ")}>
      <div
        className={["justify-center items-center flex"].join(" ")}
        style={{
          fontSize: "18vw",
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
