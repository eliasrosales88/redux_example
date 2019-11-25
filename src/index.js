// import "./styles.css";
// import { createStore } from "redux";

function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function() {
      listeners.filter(l => l !== listener);
    };
  }

  // dispatch({});
  return { getState, dispatch, subscribe };
}

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    default:
      return state;
  }
}

const store = createStore(counter, 5);

console.log(store);

console.log(store.getState());

const unsubscribe = store.subscribe(function() {
  console.log(store.getState());
});

store.dispatch({ type: "INCREMENT" });
unsubscribe();
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });

document.getElementById("app").innerHTML = store.getState();
