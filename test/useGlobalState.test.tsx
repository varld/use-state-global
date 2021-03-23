import { act, renderHook } from '@testing-library/react-hooks';
import createGlobalState from '../src';

describe('use-delayed', () => {
  it('exports', () => {
    expect(typeof createGlobalState).toEqual('function');
  });

  it('returns hook', () => {
    expect(typeof createGlobalState({})).toEqual('function');
  });

  it('syncs data', async () => {
    let useState = createGlobalState({
      count: 0
    });

    let handler = () => {
      let [state, setState] = useState();

      return {
        state,
        setState
      };
    };

    let { result: result1 } = renderHook(() => handler());
    expect(result1.current.state.count).toBe(0);

    let { result: result2 } = renderHook(() => handler());
    expect(result2.current.state.count).toBe(0);

    act(() => {
      result2.current.setState({ count: 5 });
    });

    expect(result2.current.state.count).toBe(5);
    expect(result1.current.state.count).toBe(5);
  });

  it('can be accessed from outside', async () => {
    let useState = createGlobalState({
      count: 0
    });

    let handler = () => {
      let [state, setState] = useState();

      return {
        state,
        setState
      };
    };

    let { result: result1 } = renderHook(() => handler());
    expect(result1.current.state.count).toBe(0);
    expect(useState.getState().count).toBe(0);

    act(() => {
      result1.current.setState({ count: 5 });
    });

    expect(result1.current.state.count).toBe(5);
    expect(useState.getState().count).toBe(5);

    act(() => {
      useState.setState({ count: 10 });
    });

    expect(result1.current.state.count).toBe(10);
    expect(useState.getState().count).toBe(10);
  });
});
