import React from "react";

export const useQuery = (onAction: (n: number) => void) => {
  React.useEffect(() => {
    const url = window.location.href;
    const r = new URL(url);
    const init = r.searchParams.get("init");
    if (init) {
      const initAsNumber = parseInt(init);
      if (!isNaN(initAsNumber) && initAsNumber > 0) {
        onAction(initAsNumber);
      }
    }
  }, []);
};
