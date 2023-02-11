import React from "react";
import five from "../../public/sounds/AnnouncerFive.mp3";
import four from "../../public/sounds/AnnouncerFour.mp3";
import one from "../../public/sounds/AnnouncerOne.mp3";
import three from "../../public/sounds/AnnouncerThree.mp3";
import timeUp from "../../public/sounds/AnnouncerTimeUp.mp3";
import two from "../../public/sounds/AnnouncerTwo.mp3";
import tick from "../../public/sounds/Dot.mp3";
import stageclearSound from "../../public/sounds/smb_stage_clear.mp3";
import { counterState } from "./useCountdown";

export const useSound = (count: number, counterState: counterState) => {
  const [muted, setMuted] = React.useState(false);
  const [audioQueue, setAudioQueue] = React.useState<
    Map<string, HTMLAudioElement>
  >(new Map());

  const playAudio = React.useCallback(
    (pathToSound: string) => {
      const audio = new Audio(pathToSound);
      audio.onended = () => {
        setAudioQueue((queue) => {
          queue.delete(pathToSound);
          return queue;
        });
      };
      audio.play();
      audio.muted = muted;
      setAudioQueue((queue) => {
        return queue.set(pathToSound, audio);
      });
    },
    [muted]
  );

  React.useEffect(() => {
    if (muted) {
      audioQueue.forEach((sound) => (sound.muted = true));
    } else {
      audioQueue.forEach((sound) => (sound.muted = false));
    }
  }, [muted]);

  React.useEffect(() => {
    if (counterState === "finished") {
      playAudio(stageclearSound);
    }
  }, [counterState]);
  React.useEffect(() => {
    if (count % 60 == 0 && counterState == "running") playAudio(tick);

    if (count == 3) {
      playAudio(three);
    } else if (count == 2) {
      playAudio(two);
    } else if (count == 1) {
      playAudio(one);
    } else if (count == 0 && counterState == "running") {
      playAudio(timeUp);
    }
  }, [count]);

  return { muted, toogleMute: () => setMuted((mute) => !mute) };
};
