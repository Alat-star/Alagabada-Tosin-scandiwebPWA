import { createSlice } from "@reduxjs/toolkit";

// basic example slice copied from the docs
const currencySlice = createSlice({
  name: "currency",
  initialState: {
    activeCurrency: { label: "USD", symbol: "$" },
  },
  reducers: {
    currencySwitcher: (state, action) => {
      state.activeCurrency = action.payload;
    },
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = currencySlice;

// export individual action creator functions
export const { currencySwitcher } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
