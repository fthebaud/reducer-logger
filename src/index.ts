import { Reducer, Action, Options } from './types';
import renderDiff from './diff';
import { lightblue, green, grey } from './colors';

const defaultOptions: Options = {
  disabled: false,
  displayName: '',
};

function wrapReducer<S, A extends Action>(
  reducer: Reducer<S, A>,
  options: Options | undefined = defaultOptions
): Reducer<S, A> {
  const { disabled, displayName } = options;

  if (disabled) {
    return reducer;
  }

  return (state: S, action: A): S => {
    const t0 = performance.now();
    const newState = reducer(state, action);
    const duration = performance.now() - t0;

    renderLog(action, state, newState, duration, displayName);

    return newState;
  };
}

function renderLog<S, A extends Action>(
  action: A,
  state: S,
  newState: S,
  duration: number,
  displayName?: string
): void {
  const prefix = displayName ? `[${displayName}] ` : '';

  console.groupCollapsed(
    `%c${prefix}%caction %c${
      action.type
    } %c@ ${new Date().toLocaleTimeString()} (in ${duration.toFixed(3)} ms)`,
    'color: dark; font-weight: bolder;',
    'color: gray; font-weight: lighter;',
    'color: dark; font-weight: bolder;',
    'color: gray; font-weight: lighter;'
  );

  console.log(
    '%caction     %o',
    `color: ${lightblue}; font-weight: bolder;`,
    action
  );

  console.log('%cprev state %o', `color: ${grey}; font-weight: bolder;`, state);

  console.log(
    '%cnext state %o',
    `color: ${green}; font-weight: bolder;`,
    newState
  );

  renderDiff<S>(state, newState);

  console.groupEnd();
}

export { wrapReducer };
