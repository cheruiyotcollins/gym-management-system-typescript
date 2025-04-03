import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  SET_ORDERS,
} from "./type";
import { IOrder } from "../../interfaces/Order"; // Assuming you have the correct path

interface IOrderState {
  orders: IOrder[]; // List of orders
  loading: boolean; // Loading state for placing order
  error: string; // Error state for handling errors
  singleCart: any; // If `singleCart` holds a cart state that should be cleared after a successful order
}

const initialState: IOrderState = {
  orders: [], // Start with an empty list of orders
  loading: false, // Initially not loading
  error: "", // No errors initially
  singleCart: null, // Empty cart initially
};

const OrderReducer = (
  state = initialState,
  action: { type: string; payload?: any }
): IOrderState => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload, // Set the orders array when the action is dispatched
      };

    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true when placing an order
        error: "", // Clear any previous error
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false, // Set loading to false after a successful order
        singleCart: null, // Clear the cart after placing the order
      };

    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        loading: false, // Stop loading after failure
        error: action.payload, // Set the error message
      };

    default:
      return state;
  }
};

export default OrderReducer;
