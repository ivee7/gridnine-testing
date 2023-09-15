import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer)
