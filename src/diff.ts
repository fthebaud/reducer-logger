/* eslint-disable @typescript-eslint/no-explicit-any */
/******************************************************************************
 *
 * original source: https://github.com/LogRocket/redux-logger/blob/master/src/diff.js
 *
 ******************************************************************************/
import {
  diff,
  Diff,
  DiffNew,
  DiffEdit,
  DiffDeleted,
  DiffArray,
} from 'deep-diff';
import { blue, green, red } from './colors';

enum DiffType {
  'N' = 'N',
  'E' = 'E',
  'D' = 'D',
  'A' = 'A',
}

type DiffDictionary = {
  [key in keyof typeof DiffType]: {
    color: string;
    text: string;
  };
};

// https://github.com/flitbit/diff#differences
const dictionary: DiffDictionary = {
  N: {
    color: green,
    text: 'ADDED:',
  },
  E: {
    color: blue,
    text: 'CHANGED:',
  },
  D: {
    color: red,
    text: 'DELETED:',
  },
  A: {
    color: blue,
    text: 'ARRAY:',
  },
};

function style(kind: DiffType): string {
  return `color: ${dictionary[kind].color}; font-weight: bold`;
}

function renderNew(diff: DiffNew<any>): string[] {
  const { path = [], rhs } = diff;
  return [path.join('.'), rhs];
}

function renderEdit(diff: DiffEdit<any>): string[] {
  const { path = [], lhs, rhs } = diff;
  return [path.join('.'), lhs, '→', rhs];
}

function renderDeleted(diff: DiffDeleted<any>): string[] {
  const { path = [] } = diff;
  return [path.join('.')];
}

function renderArray(diff: DiffArray<any>): any[] {
  const { path = [], index, item } = diff;
  return [`${path.join('.')}[${index}]`, item];
}

function render(diff: Diff<any>): any[] {
  const { kind } = <{ kind: DiffType }>diff;
  let output: string[];
  switch (kind) {
    case 'N':
      output = renderNew(diff as DiffNew<any>);
      break;
    case 'E':
      output = renderEdit(diff as DiffEdit<any>);
      break;
    case 'D':
      output = renderDeleted(diff as DiffDeleted<any>);
      break;
    case 'A':
      output = renderArray(diff as DiffArray<any>);
      break;
    default:
      output = [];
  }
  return output;
}

export default function renderDiff<S>(state: S, newState: S): void {
  const difference = diff(state, newState);

  console.groupCollapsed('diff');

  if (difference) {
    difference.forEach((diff: Diff<any>) => {
      const { kind } = <{ kind: DiffType }>diff;
      const output = render(diff);
      console.log(`%c ${dictionary[kind].text}`, style(kind), ...output);
    });
  } else {
    console.log('—— no diff ——');
  }

  console.groupEnd();
}
