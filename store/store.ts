import wishlistReducer from "@/store/wishlist/wishlistSlice";
import { configureStore , combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import colorModeSlice from "./colorMode/colorModeSlice";


const persistConfig = {
  key : 'root',
  storage
}

const reducer = combineReducers({
  wishlist : wishlistReducer,
  colorMode : colorModeSlice
})

const persistedReducer = persistReducer(persistConfig , reducer)
export const store = configureStore({
  reducer : {
    persistedReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


