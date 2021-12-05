import { createStore } from "redux";

const reducer = (state = 0, action) => {
    // console.log("Reducer Called");
    switch (action.type) {
        case "INCREMENT":
            return state + action.payload;
        case "DECREMENT":
            return state - action.payload;
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => {
    console.log("current state", store.getState());
});

store.dispatch({
    type: "INCREMENT",
    payload: 5,
});
store.dispatch({
    type: "DECREMENT",
    payload: 2,
});
store.dispatch({
    type: "INCREMENT",
    payload: 4,
});
export default reducer;