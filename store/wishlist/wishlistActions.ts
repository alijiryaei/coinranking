import { setWishlistItems } from "./wishlistSlice";
import { WishlistItem } from "@/types/store";

export const removeWishlistItem = (
  wishlistItems: WishlistItem[],
  wishlistItemToRemove: WishlistItem,
) => {
  const newWishlist = wishlistItems.filter(
    (cartItem) => cartItem.uuid !== wishlistItemToRemove.uuid,
  );

  return setWishlistItems(newWishlist);
};

export const addWishlistItem = (
  wishlistItems: WishlistItem[],
  wishlistItemToAdd: WishlistItem,
) => setWishlistItems([...wishlistItems, wishlistItemToAdd]);


export const updateWishlist = (wishlistItems: WishlistItem[], wishlistItem:WishlistItem) => {
   const existingWishlistItem = wishlistItems.some(item => item.uuid === wishlistItem.uuid);

   if(existingWishlistItem) {
     return removeWishlistItem(wishlistItems , wishlistItem)
   }

   return addWishlistItem(wishlistItems , wishlistItem)
}
