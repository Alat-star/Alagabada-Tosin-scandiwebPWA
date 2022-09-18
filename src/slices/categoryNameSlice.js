import { createSlice } from "@reduxjs/toolkit";

// basic example slice copied from the docs
const categoryNameSlice = createSlice({
  name: "categoryName",
  initialState: {
    value: "all",
  },
  reducers: {
    changeCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = categoryNameSlice;

// export individual action creator functions
export const { changeCategory } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
