import { configureStore } from "@reduxjs/toolkit";
import websocketReducer from "./websocketSlice";

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
  },
});

// Define the RootState type from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
