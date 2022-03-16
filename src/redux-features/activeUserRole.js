
import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { role: ""};

export const roleSlice = createSlice({
  name: "role_reducer",
  initialState: { value: initialStateValue }, 
  reducers: {
    setRole: (state, action) => {
      state.value = action.payload;
      console.log("role in reducer state:  " + state.value.role);
    },
  },
});
export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
