import { createSlice } from "@reduxjs/toolkit";
import { fileMap } from "./fileEntries";
import { resourceMap } from "./resources";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    fileMap,
    resourceMap,
  },
  reducers: {},
});

// export const {} = dataSlice.actions;
export default dataSlice.reducer;
