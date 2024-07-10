import { useEffect, useState } from "react";

export const useKeyPress = (targetKey, component) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    if (!component) return;
    const downHandler = (event) => {
      if (event.key === targetKey) {
        console.log(event.target);
        event.preventDefault();
        setKeyPressed(true);
      }
    };
    const upHandler = (event) => {
      if (event.key === targetKey) {
        event.preventDefault();
        setKeyPressed(false);
      }
    };
    component.addEventListener("keydown", downHandler);
    component.addEventListener("keyup", upHandler);
    return () => {
      component.removeEventListener("keydown", downHandler);
      component.removeEventListener("keyup", upHandler);
    };
  }, [targetKey, component]);
  return keyPressed;
};
