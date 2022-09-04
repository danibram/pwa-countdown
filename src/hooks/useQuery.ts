import React from "react";

export const useQuery = (onAction: any) => {
  React.useEffect(() => {
    const url = window.location.href;
    const r = new URL(url);
    const init = r.searchParams.get("init");
    if (init) {
      const initAsNumber = parseInt(init);
      if (!isNaN(initAsNumber) && initAsNumber > 0) {
        onAction(initAsNumber);
      }
      if (window.history.pushState) {
        const newURL = new URL(window.location.href);
        newURL.search = "";
        window.history.pushState({ path: newURL.href }, "", newURL.href);
      }
    }
  }, []);
};
