import { configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./pageReducer";

const reducer = {
    pages: pageReducer
};

export const store = configureStore({ reducer, });
export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;