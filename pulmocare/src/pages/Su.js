import { useSelector, useDispatch } from 'react-redux';

function MyComponent() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch({ type: 'INCREMENT' });
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
}

export default MyComponent;
