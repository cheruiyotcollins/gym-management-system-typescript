import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  SET_ORDERS,
} from "./type";
import Api from "../../common/helpers/Api";
import { ICartItem } from "../../interfaces/Cart";

export const placeOrder = (
  shippingAddress: string,
  paymentMethod: string,
  cartItemDtoList: ICartItem[]
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: PLACE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated!");
      return;
    }

    // Prepare DTO for backend request
    // Prepare DTO for backend request
    const requestBody = {
      shippingAddress,
      paymentMethod,
    };

    try {
      const response = await Api.post("/orders", requestBody);

      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: response,
      });

      alert("Order placed successfully!");
    } catch (error: any) {
      dispatch({
        type: PLACE_ORDER_FAILURE,
        payload: error.message,
      });
      alert("Error placing order: " + error.message);
    }
  };
};
export const fetchOrders = () => async (dispatch: any) => {
  try {
    // Fetch the userId from the backend or auth state if needed
    const response = await Api.get("/orders/customer"); // Assuming this API call doesn't need a userId
    if (response.status === 200) {
      dispatch({
        type: SET_ORDERS,
        payload: response.data.payload,
      });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Optionally dispatch an error action if needed
  }
};
