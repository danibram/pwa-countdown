import { counterState } from "../../hooks/useCountdown";

export default function Countdown({
  counterState,
  isVertical,
  onShowKeyboard,
  onStart,
  onPause,
  onStop,
}: {
  counterState: counterState;
  isVertical: boolean;
  onShowKeyboard: () => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}) {
  return (
    <div className="p-2 text-center text-xl">
      {counterState == "not-started" ||
      counterState == "finished" ||
      counterState == "stopped" ? (
        <button className="p-2" onClick={() => onShowKeyboard()}>
          Click here to start!
        </button>
      ) : counterState == "ready" ? (
        <button className="p-2" onClick={() => onStart()}>
          Start!
        </button>
      ) : counterState == "running" ? (
        <>
          <button className="p-2" onClick={() => onPause()}>
            Pause
          </button>
          &nbsp;or&nbsp;
          <button className="p-2" onClick={() => onStop()}>
            stop!
          </button>
        </>
      ) : counterState == "paused" ? (
        <>
          <button className="p-2" onClick={() => onPause()}>
            Resume
          </button>
          &nbsp;or&nbsp;
          <button className="p-2" onClick={() => onStop()}>
            stop!
          </button>
        </>
      ) : null}
    </div>
  );
}
