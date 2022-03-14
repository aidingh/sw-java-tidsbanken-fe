/**
 * This is just an example of how u can set up your redux reducer.
 * Just copy the boilerplate code down below and
 *  add it to your own redux feature.
 */
import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { jwt_token: "" };

export const tokenSlice = createSlice({
  name: "token_reducer", // the name of the reducer
  initialState: { value: initialStateValue }, // initial state
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
      console.log("test" + state.value.jwt_token);
    },
  },
});
// This is where you export your actions
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
