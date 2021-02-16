type Action = {
  type: string;
  [key: string]: unknown;
};

interface Reducer<S, A> {
  (state: S, action: A): S;
}

export type Options = {
  disabled?: boolean;
  displayName?: string;
};

export { Reducer, Action };
