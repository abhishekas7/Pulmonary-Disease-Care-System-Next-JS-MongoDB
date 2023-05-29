import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';

// Define your initial state and reducers
const initialState = { /* your initial state */ };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // handle different actions and update the state accordingly
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

// Create a wrapper component with the Redux Provider
export default function ReduxWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
