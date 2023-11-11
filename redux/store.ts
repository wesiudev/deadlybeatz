import { configureStore } from "@reduxjs/toolkit";

import audio from "./slices/audio";

export const store = configureStore({
  reducer: {
    audio: audio,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
