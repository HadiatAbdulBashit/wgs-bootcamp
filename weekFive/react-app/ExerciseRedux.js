const redux = require('redux')

const rootReducer = (currentState = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return currentState + 1;
        case "DECREMENT":
            return currentState - 1;
        default:
            return currentState;
    }
    // return currentState
}

const store = redux.createStore(rootReducer);

store.dispatch({type: 'INCREMENT'})

console.log(store.getState());

console.log('State after Increment = ', store.getState());