import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import ShowProductSlice from "./slices/ShowProductSlice";
import CartSlice from "./slices/CartSlice";
import signupSlice from "./slices/SignupSlice";
import LoginSlice from "./slices/LoginSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  products: ShowProductSlice,
  cart: CartSlice,
  userSignup: signupSlice,
  login: LoginSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export { store, persistor };
