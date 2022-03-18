import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { jwt_token: "", role: "", user: {} };

export const tokenSlice = createSlice({
  name: "token_reducer",
  initialState: { value: initialStateValue },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
      console.log("role: " + state.value.role);
      console.log("token: " + state.value.jwt_token);
      console.log("nickname : " + state.value.user.nickname);
    },
  },
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
