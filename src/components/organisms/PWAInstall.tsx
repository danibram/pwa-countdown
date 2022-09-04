import React from "react";
import { Context, ContextOutput } from "../../hocs/a2hs";
import PWAInstallButton from "../molecules/PWAInstallButton";

const PWAInstall = () => {
  const { isAppInstalled, isAppInstallable, deferredPrompt } = React.useContext(
    Context
  ) as ContextOutput;

  return isAppInstallable && !isAppInstalled ? (
    <PWAInstallButton onClick={() => deferredPrompt?.prompt()} />
  ) : null;
};

export default PWAInstall;
