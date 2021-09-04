import { useState, useMemo } from "react";

const useToggle = () => {
  const [state, setState] = useState("off");
  // Note: you can also use boolean values instead of 'on' & 'off' string.

  const handlers = useMemo(
    () => ({
      toggle: () => {
        setState((res) => (res === "on" ? "off" : "on"));
      }
    }),
    []
  );

  return [state, handlers];
};

export default useToggle;