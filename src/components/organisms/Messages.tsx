import { counterState } from "../../hooks/useCountdown";

export default function Countdown({
  counterState,
  onShowKeyboard,
  onStart,
  onPause,
  onStop,
}: {
  counterState: counterState;
  onShowKeyboard: () => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}) {
  return (
    <div className="p-2 text-center">
      {counterState == "not-started" ||
      counterState == "finished" ||
      counterState == "stopped" ? (
        <button className="p-2" onClick={() => onShowKeyboard()}>
          Type a number to start!
        </button>
      ) : counterState == "ready" ? (
        <button className="p-2" onClick={() => onStart()}>
          Type enter to start!
        </button>
      ) : counterState == "running" ? (
        <>
          <button className="p-2" onClick={() => onPause()}>
            Space to pause
          </button>
          ,&nbsp;
          <button className="p-2" onClick={() => onStop()}>
            Esc/Backspace to stop!
          </button>
        </>
      ) : counterState == "paused" ? (
        <>
          <button className="p-2" onClick={() => onPause()}>
            Space to resume
          </button>
          ,&nbsp;
          <button className="p-2" onClick={() => onStop()}>
            Esc/Backspace to stop!
          </button>
        </>
      ) : null}
    </div>
  );
}
