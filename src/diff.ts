/******************************************************************************
 * source: https://github.com/LogRocket/redux-logger/blob/master/src/diff.js
 ******************************************************************************/

import differ from "deep-diff";

// https://github.com/flitbit/diff#differences

const dictionary: any = {
  E: {
    color: "#2196F3",
    text: "CHANGED:",
  },
  N: {
    color: "#4CAF50",
    text: "ADDED:",
  },
  D: {
    color: "#F44336",
    text: "DELETED:",
  },
  A: {
    color: "#2196F3",
    text: "ARRAY:",
  },
};

export function style(kind: any): any {
  return `color: ${dictionary[kind].color}; font-weight: bold`;
}

export function render(diff: any): any {
  const { kind, path, lhs, rhs, index, item } = diff;

  switch (kind) {
    case "E":
      return [path.join("."), lhs, "→", rhs];
    case "N":
      return [path.join("."), rhs];
    case "D":
      return [path.join(".")];
    case "A":
      return [`${path.join(".")}[${index}]`, item];
    default:
      return [];
  }
}

export default function diffLogger(difference: any) {
  console.groupCollapsed("diff");

  if (difference) {
    difference.forEach((elem: any) => {
      const { kind } = elem;
      const output = render(elem);
      console.debug(`%c ${dictionary[kind].text}`, style(kind), ...output);
    });
  } else {
    console.debug("—— no diff ——");
  }

  console.groupEnd();
}
