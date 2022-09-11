import React from "react";
import Confetti from "react-confetti";
import { counterState } from "../../hooks/useCountdown";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Sprites from "../molecules/Sprites";
import Countdown from "../organisms/Countdown";
import Messages from "../organisms/Messages";
import ModalKeyboard from "./ModalKeyboard";

const Main = ({
  counterState,
  count,
  counterView,
  onStart,
  onPause,
  onStop,
  onNumber,
}: {
  counterState: counterState;
  count: number;
  counterView: [string, string, string, string];
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onNumber: (arg0: number) => void;
}) => {
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const { height, width } = useWindowDimensions();
  const isVertical = React.useMemo(() => height / width > 1.2, [height, width]);

  return (
    <>
      <main className="container sm:p-2 mx-auto flex flex-col items-center justify-center h-full">
        <Countdown
          counterState={counterState}
          counterView={counterView}
          isVertical={isVertical}
        />
        <Messages
          counterState={counterState}
          isVertical={isVertical}
          onShowKeyboard={() => setShowKeyboard(true)}
          onStart={onStart}
          onPause={onPause}
          onStop={onStop}
        />
      </main>
      <div className="absolute bottom-0 w-full">
        <Sprites counterState={counterState} count={count} />
      </div>
      {showKeyboard ? (
        <ModalKeyboard
          counterView={counterView}
          onPressNumber={(n) => onNumber(n)}
          onStop={() => onStop()}
          onClose={() => setShowKeyboard(false)}
          onStart={() => {
            onStart();
            setShowKeyboard(false);
          }}
        />
      ) : null}
      {counterState == "finished" ? (
        <Confetti width={width} height={height} />
      ) : null}
    </>
  );
};

export default Main;
