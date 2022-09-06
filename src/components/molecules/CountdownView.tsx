import { counterState } from "../../hooks/useCountdown";
import GlitchClock from "../atoms/GlitchClock";

const CountdownView = ({
  counterState,
  isVertical,
  counterView,
}: {
  counterState: counterState;
  isVertical: boolean;
  counterView: [string, string];
}) => {
  return counterState == "running" ? (
    <>
      <GlitchClock clock={counterView[0]} />
      <GlitchClock
        style={{ lineHeight: "0" }}
        clock={!isVertical ? ":" : "-"}
      />
      <GlitchClock clock={counterView[1]} />
    </>
  ) : (
    <>
      <p>{counterView[0]} </p>
      <p style={{ lineHeight: "0" }}>{!isVertical ? ":" : "-"}</p>
      <p>{counterView[1]} </p>
    </>
  );
};

export default CountdownView;
