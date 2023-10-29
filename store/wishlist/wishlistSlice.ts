/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WishlistItem, WishlistState } from "@/types/store";

const initialState: WishlistState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistItems: (state, action: PayloadAction<WishlistItem[]>) => {
      state.wishlistItems = action.payload;
    },
  },
});

export const { setWishlistItems } = wishlistSlice.actions;

export default wishlistSlice.reducer;
