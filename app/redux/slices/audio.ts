import { createSlice } from "@reduxjs/toolkit";
//czy chcesz galierię zdjęć
//mapa strony (google maps)
//zakładki
const initialState: any = {
  audio: {},
  audioProgress: "0:00",
  rawTimestamp: 0,
};
export const audio = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
    setAudioProgress: (state, action) => {
      state.audioProgress = action.payload;
    },
    setRawTimestamp: (state, action) => {
      state.rawTimestamp = action.payload;
    },
  },
});

export const { setAudio, setAudioProgress, setRawTimestamp } = audio.actions;

export default audio.reducer;
