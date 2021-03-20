# Use State Global

A really simple react hook for managing shared/global state.

## About

Sometimes you might want to manage global application state but don't need something like Redux or Mobx. That's what `useStateGlobal` is for.

It seamlessly synchronizes state across all components that use it but does not increase your bundle size by that much.

## Install

```bash
# yarn
yarn add use-state-global

# npm
npm install --save use-state-global
```

## Usage

```tsx
import createGlobalState from 'use-state-global';

let useGlobalState = createGlobalState({
  // initial state
  count: 1
});

let Component = () => {
  let [state, setState] = useGlobalState();

  return (
    <div>
      Count: {count}

      <button onClick={() => setState({ count: count + 1 })}>Add 1</button>
    </div>
  )
};

let OtherComponent = () => {
  let [state] = useGlobalState();

  return (
    <div>
      Same count as the other one: {count}
    </div>
  )
};
```

## License

MIT © [Tobias Herber](https://github.com/herber)

[![Made by Varld](https://potato.varld.co/oss/badge.svg)](https://varld.co)
