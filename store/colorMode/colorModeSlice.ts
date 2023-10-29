/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColorMode, Mode } from "@/types/store";

const initialState: ColorMode = {
  mode: "light",
};

const colorMode = createSlice({
  name: "colorMode",
  initialState,
  reducers: {
    toggleColorMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleColorMode } = colorMode.actions;

export default colorMode.reducer;