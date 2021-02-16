# Reducer Logger

A simple typescript logger for reducer functions, inspired by [redux-logger](https://github.com/LogRocket/redux-logger).

Provides a diff of the previous state / next state via [deep-diff](https://github.com/flitbit/diff).

![screenshot of reducer logger](screenshot.png)

## Installation

```bash
$ npm i --save @fthebaud/reducer-logger
# or
$ yarn add @fthebaud/reducer-logger
```

## Usage

Just wrapp the reducer using the wrapReducer function.

Second parameter is an optional configuration object.

```js
import { wrapReducer } from '@fthebaud/reducer-logger';

const reducer = (state: State, action: Action): State => {
  // Reducer code
};

export const reducerWithLogs = wrapReducer<State, Action>(
    reducer,
    {
      disabled: process.env.NODE_ENV === 'production',
      displayName: 'reducer #1',
    }
);

```

## Options

| Name        | type    | default |
| ----------- | ------- | ------- |
| disabled    | boolean | false   |
| displayName | string  | ''      |
