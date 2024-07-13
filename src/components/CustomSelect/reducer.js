export function createInitState(options) {
  return {
    opened: false,
    displayedOptions: [...options],
    selectedIndex: -1,
    selected: { id: 0, value: "" },
  };
}
export const TYPE = {
  TOGGLE: "toggle",
  SET_DISPLAYED_OPTIONS: "setDisplayedOptions",
  SET_SELECTED_INDEX: "setSelectedIndex",
  SELECTED: "selected",
};
export function reducer(state, action) {
  switch (action.type) {
    case TYPE.TOGGLE: {
      return {
        ...state,
        opened: !state.opened,
      };
    }
    case TYPE.SET_DISPLAYED_OPTIONS: {
      return {
        ...state,
        displayedOptions: [...action.data],
      };
    }
    case TYPE.SET_SELECTED_INDEX: {
      return {
        ...state,
        selectedIndex: action.data,
      };
    }
    case TYPE.SELECTED: {
      return {
        ...state,
        selected: action.data,
      };
    }
  }
}
