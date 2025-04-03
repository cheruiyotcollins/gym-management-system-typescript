import { IProduct } from "../../interfaces/Product";
import {
  SET_BOOKMARKS,
  SET_FILTERED_PRODUCTS,
  SET_PRODUCTS,
  SET_SINGLE_PRODUCT,
  ADD_TO_CART,
  SET_CART,
} from "./type";

interface IProductsState {
  products: IProduct[];
  filteredProducts: IProduct[];
  bookmarkedIds: number[];
  singleProduct: IProduct | null;
  loading: boolean;
  error: string;
}

const initialState: IProductsState = {
  products: [],
  filteredProducts: [],
  bookmarkedIds: localStorage.getItem("bookmarkedIds")
    ? JSON.parse(localStorage.getItem("bookmarkedIds") as string)
    : [],
  singleProduct: null,
  loading: false,
  error: "",
};

const ProductsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "value":
      return state;

    case SET_PRODUCTS:
      return {
        ...state,
        products: actions.payload,
      };

    case SET_SINGLE_PRODUCT:
      return { ...state, singleProduct: actions.payload };

    case SET_FILTERED_PRODUCTS:
      return { ...state, filteredProducts: actions.payload };

    case SET_BOOKMARKS:
      return {
        ...state,
        bookmarkedIds: actions.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        singleCart: actions.payload,
      };
    case SET_CART:
      return {
        ...state,
        singleCart: actions.payload,
      };

    default:
      return state;
  }
};

export default ProductsReducer;
