export default function Keyboard(props: {
  isStopped: boolean;
  isPaused: boolean;
  onPressNumber: (n: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onStart: () => void;
}) {
  const {
    isStopped,
    isPaused,
    onPressNumber,
    onPause,
    onPlay,
    onStop,
    onStart,
  } = props;

  return (
    <>
      <div className="tw`flex`">
        {isStopped ? (
          <>
            <div className="tw`flex`">
              {[1, 2, 3].map((n) => (
                <button
                  key={`button-${n}`}
                  type="button"
                  className="nes-btn"
                  onClick={() => onPressNumber(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="tw`flex`">
              {[4, 5, 6].map((n) => (
                <button
                  key={`button-${n}`}
                  type="button"
                  className="nes-btn"
                  onClick={() => onPressNumber(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="tw`flex`">
              {[7, 8, 9].map((n) => (
                <button
                  key={`button-${n}`}
                  type="button"
                  className="nes-btn"
                  onClick={() => onPressNumber(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="tw`flex`">
              <button
                type="button"
                className="nes-btn"
                onClick={() => onStop()}
              >
                X
              </button>
              <button
                type="button"
                className="nes-btn"
                onClick={() => onPressNumber(0)}
              >
                0
              </button>
              <button
                type="button"
                className="nes-btn"
                onClick={() => onStart()}
              >
                &lt;
              </button>
            </div>
          </>
        ) : (
          <div className="tw`flex`">
            {isPaused ? (
              <button
                type="button"
                className="nes-btn"
                onClick={() => onPlay()}
              >
                Play
              </button>
            ) : (
              <button
                type="button"
                className="nes-btn"
                onClick={() => onPause()}
              >
                Pause
              </button>
            )}

            <button type="button" className="nes-btn" onClick={() => onStop()}>
              Stop
            </button>
          </div>
        )}
      </div>
    </>
  );
}
