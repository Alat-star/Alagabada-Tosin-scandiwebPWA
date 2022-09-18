import { createSlice } from "@reduxjs/toolkit";
// basic example slice copied from the docs
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
    filt: [],
    pdpinfo: [],
    attrid: 0,
    cartQuantity: 0,
  },
  reducers: {
    addCart: (state, action) => {
      state.attrid = action.payload.textindex;

      state.value.push({
        name: action.payload.id,
        quantity: 0,
        brand: action.payload.brand,
        img: action.payload.image,
        id: action.payload.index,
        attributes: action.payload.attributes,
        attributeName: action.payload.textindex,
        prices: action.payload.prices,
      });

      state.pdpinfo.push({
        image: action.payload.image,
      });

      var result = state.value.reduce((unique, o) => {
        if (o.name) {
          //push to array but don't push a duplicate
          if (
            !unique.some(
              (obj) =>
                obj.name === o.name && obj.attributeName === o.attributeName
            )
          ) {
            //add quantity if name or textindex is the same
            if (
              (o.attributeName === action.payload.textindex &&
                o.name === action.payload.id) ||
              (o.attributeName === action.payload.quanincre &&
                o.name === action.payload.quanincrename)
            ) {
              o.quantity++;
            }
            //reduce quantity onclick
            if (
              o.attributeName === action.payload.quandecre &&
              o.name === action.payload.quandecrename
            ) {
              o.quantity -= 1;
              if (o.quantity <= 0) {
                o.quantity = 0;
              }
            }

            unique.push(o);
          }
        }
        //remove from array if quantity = 0
        const pos = unique.findIndex((el) => el.quantity === 0);
        if (pos >= 0) unique.splice(pos, 1);

        return unique;
      }, []);
      state.filt = result;

      const totalQuantity = state.value.reduce(function (acc, obj) {
        return acc + obj.quantity;
      }, 0);
      state.cartQuantity = totalQuantity;
    },
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = cartSlice;

// export individual action creator functions
export const { addCart } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
