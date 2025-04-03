import { ICart } from "../../interfaces/Cart";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_CART,
  SET_SINGLE_CART,
  SET_FILTERED_CARTS,
  SET_BOOKMARKS,
  UPDATE_CART_ITEM_QUANTITY,
} from "./type";

// ✅ Define the ICartState interface
interface ICartState {
  items: ICart | null; // Single cart, initially null
  filteredCarts: ICart[]; // List of filtered carts
  bookmarkedIds: number[]; // List of bookmarked cart IDs
  singleCart: ICart | null; // Single cart object
  loading: boolean; // Loading state
  error: string; // Error messages
}

// ✅ Correct initialState
const initialState: ICartState = {
  items: null, // Corrected to match the interface definition
  filteredCarts: [],
  bookmarkedIds: localStorage.getItem("bookmarkedIds")
    ? JSON.parse(localStorage.getItem("bookmarkedIds") as string)
    : [],
  singleCart: {
    cartId: 1,
    cartItemDtoList: [],
    name: "",
    totalPrice: 0,
  },
  loading: false,
  error: "",
};

// ✅ Fix reducer type: add `action: { type: string; payload?: any }`
const CartReducer = (
  state = initialState,
  action: { type: string; payload?: any }
): ICartState => {
  switch (action.type) {
    case SET_CART:
    case SET_SINGLE_CART:
      console.log("Redux SET_SINGLE_CART Payload:", action.payload);
      return { ...state, singleCart: action.payload };

    case SET_FILTERED_CARTS:
      return { ...state, filteredCarts: action.payload };

    case SET_BOOKMARKS:
      return { ...state, bookmarkedIds: action.payload };

    case ADD_TO_CART:
      if (!state.singleCart) return state; // Ensure cart exists

      return {
        ...state,
        singleCart: {
          ...state.singleCart,
          cartItemDtoList: [
            ...(state.singleCart.cartItemDtoList || []),
            action.payload,
          ], // Ensure array exists
        },
      };

    case REMOVE_FROM_CART:
      if (!state.singleCart) return state; // Ensure cart exists

      return {
        ...state,
        singleCart: {
          ...state.singleCart,
          cartItemDtoList: state.singleCart.cartItemDtoList
            ? state.singleCart.cartItemDtoList.filter(
                (item) => item.id !== action.payload
              )
            : [], // Ensure array exists
        },
      };

    case CLEAR_CART:
      return {
        ...state,
        singleCart: null, // Clears the cart instead of `items`
      };
    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        singleCart: action.payload, // ✅ Update the entire cart
      };

    default:
      return state;
  }
};

export default CartReducer;
