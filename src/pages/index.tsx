import type { NextPage } from "next";
import React from "react";

import UpperMenu from "../components/organisms/UpperMenu";
import AdditionalCSS from "../components/templates/AdditionalCSS";
import Main from "../components/templates/Main";
import ModalHelp from "../components/templates/ModalHelp";
import ModalKeyboard from "../components/templates/ModalKeyboard";
import useCountdown from "../hooks/useCountdown";

const Home: NextPage = () => {
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);

  const {
    counterView,
    count,
    isRunning,
    isPaused,
    isStopped,
    handleStart,
    handleStop,
    handlePause,
    handleNumber,
  } = useCountdown();

  return (
    <>
      <AdditionalCSS />
      <UpperMenu
        isStopped={isStopped}
        isPaused={isPaused}
        onPause={handlePause}
        onStop={handleStop}
        showControls={() => setShowKeyboard(true)}
        showHelp={() => setShowHelp(true)}
      />
      <Main isRunning={isRunning} count={count} counterView={counterView} />
      {showHelp ? <ModalHelp onClose={() => setShowHelp(false)} /> : null}
      {showKeyboard ? (
        <ModalKeyboard
          counterView={counterView}
          onPressNumber={(n) => handleNumber(n)}
          onStop={() => handleStop()}
          onClose={() => setShowKeyboard(false)}
          onStart={() => {
            handleStart();
            setShowKeyboard(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Home;
