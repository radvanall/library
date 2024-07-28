import { useEffect, useState } from "react";

export const useKeyPress = (targetKey, ref, condition = true) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const component = ref?.current;
    console.log(component);
    if (!component) return;
    const downHandler = (event) => {
      // debugger;
      console.log(component);
      console.log(condition);
      if (!condition) return;
      if (event.key === targetKey) {
        console.log(event.target);
        event.preventDefault();
        setKeyPressed(true);
      }
    };
    const upHandler = (event) => {
      console.log(component);
      if (!condition) return;
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
  }, [targetKey, ref, condition]);
  return keyPressed;
};
