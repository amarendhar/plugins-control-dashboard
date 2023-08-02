import {
  Action,
  Middleware,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";
import { api } from "./api";
import { ENV } from "types";

const middlewares: Middleware[] = [api.middleware];
if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
  middlewares.push(reduxLogger);
}

export const rootReducer = {
  [api.reducerPath]: api.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
