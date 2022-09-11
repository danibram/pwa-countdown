import { toClock } from "../../helpers/formating";
import { counterState } from "../../hooks/useCountdown";
import GlitchClock from "../atoms/GlitchClock";

const CountdownView = ({
  counterState,
  counterView,
}: {
  counterState: counterState;
  isVertical: boolean;
  counterView: [string, string, string, string];
}) => {
  return counterState == "running" ? (
    <GlitchClock clock={toClock(counterView)} />
  ) : (
    <p>{toClock(counterView)} </p>
  );
};

export default CountdownView;
