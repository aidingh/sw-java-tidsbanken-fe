
import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { jwt_token: "", role: ""};

export const tokenSlice = createSlice({
  name: "token_reducer",
  initialState: { value: initialStateValue }, 
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
      console.log("token in reducer state:  " + state.value.jwt_token);
      console.log("role in reducer state:  " + state.value.role);
    },
  },
});
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
