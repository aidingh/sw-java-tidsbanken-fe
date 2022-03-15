
import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { jwt_token: "" };

export const tokenSlice = createSlice({
  name: "token_reducer",
  initialState: { value: initialStateValue }, 
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
      console.log("token in reducer state:  " + state.value.jwt_token);
    },
  },
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
