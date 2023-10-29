export interface WishlistItem {
    uuid : string;
    name : string;
    iconUrl : string
}

export interface WishlistState {
   wishlistItems : WishlistItem[]
}

export type Mode = "light" | "dark";

export interface ColorMode {
    mode : Mode
}