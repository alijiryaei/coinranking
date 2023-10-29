import { RootState } from "@/store/store";
import { updateWishlist } from "@/store/wishlist/wishlistActions";
import { WishlistItem } from "@/types/store";
import { useDispatch, useSelector } from "react-redux";

const useWishlist = () => {
    const dispatch = useDispatch()
    const wishlist =
      useSelector(
        (state: RootState) => state.persistedReducer.wishlist.wishlistItems,
      ) ?? [];

      const isFavouriteCoin = (uuid : string) => wishlist.some(
        (wishlistItem) => wishlistItem.uuid === uuid,
      );

      const handleFavouriteCoinClick = (wishlistItemToAdd : WishlistItem) => {
        dispatch(updateWishlist(wishlist , wishlistItemToAdd))
      }

      return {
        handleFavouriteCoinClick,
        isFavouriteCoin,
      }
}

export default useWishlist;