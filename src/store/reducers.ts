import { combineReducers } from "redux";
import { AuthReducer } from "./auth";
import { ProductsReducer } from "./products";
import { CartReducer } from "./cart";
import { OrderReducer } from "./order";

const reducers = combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  cart: CartReducer,
  order: OrderReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
