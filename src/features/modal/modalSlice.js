import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSidebarOpen: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    setCloseSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { setCloseSidebar, setOpenSidebar } = modalSlice.actions;
export default modalSlice.reducer;
