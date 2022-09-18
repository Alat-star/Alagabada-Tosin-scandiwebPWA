import { combineReducers, createStore } from "@reduxjs/toolkit";
import categoryNameReducer from "../slices/categoryNameSlice";
import cartReducer from "../slices/cartSlice"
import currencyReducer from "../slices/currencySlice"

// assume that the counter slice will be combined with other slices
const reducer = combineReducers({
  categoryName: categoryNameReducer,
  cart:cartReducer,
  currency:currencyReducer,

});

// create the store from the combined reducer
const store = createStore(reducer);

export default store;


