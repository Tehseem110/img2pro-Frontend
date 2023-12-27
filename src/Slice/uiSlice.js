import { ModeEditOutlineRounded } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Mode: false 
  };

  const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
      toggleMode: (state) => {
        state.Mode = !state.Mode 
    
      },
    },
  });

  export const { toggleMode } = uiSlice.actions;
export default uiSlice.reducer;