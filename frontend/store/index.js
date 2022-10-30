import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import reducers from "../store/reducers/index";

// initial states here
const initalState = {};

// creating store
export const store = createStore(
  reducers
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });