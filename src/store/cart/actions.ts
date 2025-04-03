import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from "./type";
import Api from "../../common/helpers/Api";
import { toast } from "react-toastify";

// Action to set cart items
export const setCart = (cartItems) => {
  return {
    type: SET_CART,
    payload: cartItems,
  };
};

export const addToCart = (product) => async (dispatch, getState) => {
  try {
    // ✅ Ensure product exists before proceeding
    if (!product || !product.id) {
      console.error("Error: Product is undefined or missing 'id'", product);
      toast.error("Invalid product data. Please try again.");
      return;
    }

    let cart = getState().cart.singleCart; // Get cart from Redux state

    if (!cart || !cart.id) {
      console.log("No cart found. The backend will handle cart creation.");
      cart = { id: 0, cartItemDtoList: [] }; // ✅ Assign default `id: 0`
    }

    // ✅ Ensure cartItemDtoList is initialized
    if (!Array.isArray(cart.cartItemDtoList)) {
      cart.cartItemDtoList = [];
    }

    // Check if the product is already in the cart
    const existingItem = cart.cartItemDtoList.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      console.log("Product already in cart. Updating quantity...");
      dispatch(changeCartItemQuantity(cart.id || 0, existingItem.id, 1)); // ✅ Use fallback `cart.id || 0`

      // ✅ Show success notification
      toast.success("Item quantity updated successfully!");
    } else {
      // ✅ Send `null` for `cartId`, backend will determine it
      const requestBody = {
        cartId: null, // ✅ Backend will fetch the correct cart
        productId: product.id,
        quantity: 1,
      };

      try {
        // Send request to backend
        const addItemResponse = await Api.post(`/carts-items`, requestBody);

        if (addItemResponse.data && addItemResponse.data.status === "OK") {
          cart.cartItemDtoList.push(addItemResponse.data.payload);

          // ✅ Dispatch updated cart
          dispatch({
            type: ADD_TO_CART,
            payload: cart,
          });

          // ✅ Store updated cart in local storage
          localStorage.setItem("cart", JSON.stringify(cart));

          // ✅ Show success notification
          toast.success(
            addItemResponse.data.description || "Item added to cart!"
          );
        } else {
          console.error("Unexpected response structure:", addItemResponse.data);
          toast.error("Failed to add item to cart.");
        }
      } catch (error: any) {
        // ✅ Handle 409 Conflict (Item already in cart)
        if (error.response?.status === 409) {
          console.warn(
            "409 Conflict: Item already in cart. Updating quantity..."
          );
          dispatch(changeCartItemQuantity(cart.id || 0, product.id, 1)); // ✅ Use fallback `cart.id || 0`
          toast.success("Item already in cart. Quantity updated!");
        } else {
          console.error("Error adding to cart:", error);
          toast.error("An error occurred. Please try again.");
        }
      }
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    toast.error("An error occurred. Please try again.");
  }
};

export const removeFromCart =
  (productId: number) => async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Remove from local storage first
      const cart = getState().cart.singleCart;
      if (!cart) {
        console.error("Cart is null or undefined");
        return;
      }

      const updatedCartItems = cart.cartItemDtoList.filter(
        (item) => item.id !== productId
      );
      const updatedCart = { ...cart, cartItemDtoList: updatedCartItems };

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Dispatch Redux action to update state
      dispatch({
        type: REMOVE_FROM_CART,
        payload: productId,
      });

      // 🔥 Make DELETE request to the backend (use backticks ``)
      const response = await Api.delete(`/carts/remove/${productId}`);

      console.log("Item removed from backend:", response.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

// Clear Cart
export const clearCart = () => (dispatch) => {
  localStorage.removeItem("cart");
  dispatch({ type: CLEAR_CART });
};
//Change cart item quantity
export const changeCartItemQuantity =
  (cartId: number, cartItemId: number, quantityChange: number) =>
  async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Get current cart from Redux state
      const cart = getState().cart.singleCart;
      if (!cart) {
        console.error("Cart is null or undefined");
        return;
      }

      // Find the item to update
      const updatedCartItems = cart.cartItemDtoList.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
          : item
      );

      // Create updated cart object
      const updatedCart = { ...cart, cartItemDtoList: updatedCartItems };

      //  Prepare DTO for backend request
      const requestBody = {
        cartId: cartId,
        cartItemId: cartItemId,
        quantity: quantityChange,
      };

      //  Send PATCH request to backend (corrected)
      const response = await Api.patch("/carts-items", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Update Local Storage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        //Dispatch Redux Action with full updated cart
        dispatch({
          type: UPDATE_CART_ITEM_QUANTITY,
          payload: updatedCart,
        });
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

// Fetch Cart
export const fetchCart = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await Api.get("/carts/customer", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    localStorage.setItem("cart", JSON.stringify(response.data.payload));
    dispatch(setCart(response.data.payload));
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};
