import { useEffect, useState } from 'react';

type Listener<T> = (state: T) => void;

export let createGlobalState = <T>(initial: T) => {
  let global: T = initial;
  let listeners: Listener<T>[] = [];

  let trigger = (state: T) => {
    global = state;
    listeners.forEach(l => l(state));
  };

  let hook: any = () => {
    let [state, setState] = useState(() => global);

    useEffect(() => {
      let listener: Listener<T> = (s: T) => setState(s);
      listeners.push(listener);

      return () => {
        listeners = listeners.filter(l => l != listener);
      };
    }, []);

    let setGlobal = (s: T) => {
      setState(s);
      trigger(s);
    };

    return [state, setGlobal];
  };

  hook.getState = () => global;
  hook.setState = (state: T) => trigger(state);

  return hook as {
    (): [T, (s: T) => void];
    getState: () => T;
    setState: (state: T) => void;
  };
};

export default createGlobalState;
