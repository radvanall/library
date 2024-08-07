import { useKeyPress } from "../../api/useKeyPress";
import { useEffect, useRef, useReducer } from "react";
import { createInitState, TYPE, reducer } from "./reducer";
const useCustomSelect = (options, textKey, setSelected) => {
  const [state, dispatch] = useReducer(reducer, options, createInitState);
  const selectRef = useRef();
  const refList = useRef([]);
  const arrowUp = useKeyPress("ArrowUp", selectRef, state.opened);
  const arrowDown = useKeyPress("ArrowDown", selectRef, state.opened);
  const closeOptions = useKeyPress("Escape", selectRef);
  const changeValue = (event) => {
    // console.log("input value=", state.selected);
    let newValue = event.target.value;
    let found = options.find((item) => item?.[textKey] === newValue);
    let newOptions = options.filter((item) =>
      item?.[textKey]?.includes(newValue)
    );
    if (state.opened === false)
      dispatch({
        type: TYPE.TOGGLE,
      });
    dispatch({
      type: TYPE.SET_DISPLAYED_OPTIONS,
      data: newOptions,
    });

    if (found) {
      // dispatch({
      //   type: TYPE.SELECTED,
      //   data: { id: found.id, value: found[textKey] },
      // });
      setSelected({ id: found.id, value: found[textKey] });
      dispatch({
        type: TYPE.SET_SELECTED_INDEX,
        data: 0,
      });
    } else {
      setSelected({ id: 0, value: event.target.value });
      // dispatch({
      //   type: TYPE.SELECTED,
      //   data: { id: 0, value: event.target.value },
      // });
      dispatch({
        type: TYPE.SET_SELECTED_INDEX,
        data: -1,
      });
    }
  };
  const selectValue = (event, field, index) => {
    dispatch({
      type: TYPE.SET_SELECTED_INDEX,
      data: index,
    });
    setSelected({ id: event.target.id, value: field });
    // dispatch({
    //   type: TYPE.SELECTED,
    //   data: { id: event.target.id, value: field },
    // });
  };
  const openOptions = () => {
    dispatch({
      type: TYPE.TOGGLE,
    });
  };

  useEffect(() => {
    if (arrowDown) {
      let prev = state.selectedIndex + 1;
      if (prev >= state.displayedOptions.length) {
        prev = 0;
      } else if (prev < 0) {
        prev = state.displayedOptions.length - 1;
      }
      dispatch({
        type: TYPE.SET_SELECTED_INDEX,
        data: prev,
      });
      refList.current[prev]?.click();
      refList.current[prev]?.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (arrowUp) {
      let prev = state.selectedIndex - 1;
      if (prev >= state.displayedOptions.length) {
        prev = 0;
      } else if (prev < 0) {
        prev = state.displayedOptions.length - 1;
      }
      dispatch({
        type: TYPE.SET_SELECTED_INDEX,
        data: prev,
      });
      refList.current[prev]?.click();
      refList.current[prev]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [arrowUp, arrowDown]);
  useEffect(() => {
    if (closeOptions) {
      dispatch({
        type: TYPE.TOGGLE,
      });
    }
  }, [closeOptions]);
  return {
    selectRef,
    refList,
    state,
    changeValue,
    openOptions,
    selectValue,
  };
};
export default useCustomSelect;
