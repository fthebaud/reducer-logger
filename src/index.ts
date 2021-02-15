import { diff } from "deep-diff";
import { Reducer, Action, Options } from "./types";
import diffLogger from "./diff";

const defaultOptions: Options = {
  disabled: false,
};

function wrapReducer<S, A extends Action>(
  reducer: Reducer<S, A>,
  options: Options | undefined = defaultOptions
): Reducer<S, A> {
  if (options.disabled) {
    return reducer;
  }
  return (state: S, action: A): S => {
    const t0 = performance.now();
    const newState = reducer(state, action);
    const duration = (performance.now() - t0).toFixed(3);

    const difference = diff(state, newState);

    console.groupCollapsed(
      `%caction %c${
        action.type
      } %c@ ${new Date().toLocaleTimeString()} (in ${duration} ms)`,
      "color: gray; font-weight: lighter;",
      "color: dark; font-weight: bolder;",
      "color: gray; font-weight: lighter;"
    );
    console.debug(
      "%caction     %o",
      "color: #03A9F4; font-weight: bolder;",
      action
    );
    console.debug(
      "%cprev state %o",
      "color: #9E9E9E; font-weight: bolder;",
      state
    );
    console.debug(
      "%cnext state %o",
      "color: #4CAF50; font-weight: bolder;",
      newState
    );
    diffLogger(difference);
    console.groupEnd();

    return newState;
  };
}

export { wrapReducer };
