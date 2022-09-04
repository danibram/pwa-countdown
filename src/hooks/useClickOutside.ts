import React from "react";

const useClickOutside = (onClickOutside: (e: any) => void) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleMouseDown = function (e: { target: any }) {
      if (!(ref.current as any).contains(e.target)) {
        return onClickOutside(e);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return ref;
};
export default useClickOutside;
