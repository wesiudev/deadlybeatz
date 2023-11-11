import { configureStore } from "@reduxjs/toolkit";

import audio from "./slices/audio";
import posts from "./slices/posts";

export const store = configureStore({
  reducer: {
    audio: audio,
    posts: posts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
