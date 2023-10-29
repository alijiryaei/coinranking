export interface WishlistItem {
    uuid : string;
    name : string;
    iconUrl : string
}

export interface WishlistState {
   wishlistItems : WishlistItem[]
}