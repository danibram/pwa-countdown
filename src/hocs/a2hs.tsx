import React, { useState } from "react";
interface StateType {
  deferredPrompt: {
    prompt: () => void;
  } | null;
  isAppInstallable: boolean;
  isAppInstalled: boolean;
}

interface Inyected {
  setA2HSState: (arg0: StateType) => void;
}

export type ContextOutput = StateType & Inyected;

export const Context = React.createContext<(StateType & Inyected) | null>(null);

const initialState: StateType = {
  deferredPrompt: null,
  isAppInstallable: false,
  isAppInstalled: false,
};
const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, setA2HSState] = useState(initialState);

  const installPrompt = (e) => {
    console.log("beforeinstallprompt");
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    setA2HSState((state) => ({
      ...state,
      deferredPrompt: e as any,
      isAppInstallable: true,
    }));
  };

  const installed = () => {
    setA2HSState((state) => ({
      ...state,
      isAppInstalled: true,
    }));
  };

  React.useEffect(() => {
    window.addEventListener("beforeinstallprompt", installPrompt);

    window.addEventListener("appinstalled", installed);

    () => {
      window.removeEventListener("beforeinstallprompt", installPrompt);
      window.removeEventListener("appinstalled", installed);
    };
  });

  return (
    <Context.Provider value={{ ...state, setA2HSState }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
