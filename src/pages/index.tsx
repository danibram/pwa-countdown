import type { NextPage } from "next";
import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import UpperMenu from "../components/organisms/UpperMenu";
import AdditionalCSS from "../components/templates/AdditionalCSS";
import Main from "../components/templates/Main";
import ModalHelp from "../components/templates/ModalHelp";
import useCountdown from "../hooks/useCountdown";
import { useQuery } from "../hooks/useQuery";
import { useSound } from "../hooks/useSound";

const Home: NextPage = () => {
  const [showHelp, setShowHelp] = React.useState(false);

  const {
    counterState,
    counterView,
    count,
    handleStart,
    handleStop,
    handlePause,
    handleNumber,
  } = useCountdown();
  useQuery(handleNumber);
  const { muted, toogleMute } = useSound(count, counterState);
  const [parent]: any = useAutoAnimate();

  return (
    <div ref={parent} className="absolute w-full h-full">
      <AdditionalCSS />
      <UpperMenu
        muted={muted}
        toogleMute={toogleMute}
        showHelp={() => setShowHelp(true)}
      />
      <Main
        counterState={counterState}
        count={count}
        counterView={counterView}
        onStart={handleStart}
        onPause={handlePause}
        onStop={handleStop}
        onNumber={handleNumber}
      />
      {showHelp ? <ModalHelp onClose={() => setShowHelp(false)} /> : null}
    </div>
  );
};

export default Home;
