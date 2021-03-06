import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial values to be stored.
 */
const initialStateValue = { jwt_token: "", role: "", user: {} };

/**
 * Creates a createSlice object. Object will allow a reducer to be defined.
 */
export const tokenSlice = createSlice({
  name: "token_reducer",
  initialState: { value: initialStateValue },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
