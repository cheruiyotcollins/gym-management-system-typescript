import {
  SET_BOOKMARKS,
  SET_FILTERED_PRODUCTS,
  SET_PRODUCTS,
  SET_SINGLE_PRODUCT,
  ADD_TO_CART,
  SET_CART,
} from "./type";
import Api from "../../common/helpers/Api";

/**
 * Fetch all the products from the API.
 * @param onSuccess
 */
export const getProducts = (onSuccess) => async (dispatch) => {
  try {
    const response = await Api.get("/products");

    // Extract products from the 'payload' key in the response
    const products = response.data.payload;

    // Dispatch actions with the extracted products
    dispatch({
      type: SET_PRODUCTS,
      payload: products,
    });
    dispatch({
      type: SET_FILTERED_PRODUCTS,
      payload: products,
    });

    onSuccess();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Filter the products by the given category, query and sortBy params.
 * @param params
 * @param onSuccess
 */
export const filterProducts =
  (params, onSuccess) => async (dispatch, getState) => {
    const products = getState().products.products;
    let filteredProducts = [...products];

    if (params.q) {
      filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(params.q.toLowerCase());
      });
    }

    if (params.category) {
      if (params.category.length > 0) {
        filteredProducts = products.filter((product) => {
          return params.category.includes(product.category);
        });
      }
    }

    if (params.sortBy) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (params.sortBy === "ratingDto") {
          return b.ratingDto.rate - a.ratingDto.rate;
        }
        if (params.sortBy === "price_low_high") {
          return a.price - b.price;
        }
        if (params.sortBy === "price_high_low") {
          return b.price - a.price;
        }

        return 1;
      });
    }

    dispatch({
      type: SET_FILTERED_PRODUCTS,
      payload: filteredProducts,
    });
    // Just to mimic api call
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

/**
 * Get single product by providedId.
 * @param productId
 * @param onSuccess
 */
export const getSingleProduct =
  (productId: number, onSuccess) => async (dispatch) => {
    try {
      const response = await Api.get(`/products/${productId}`);
      dispatch({
        type: SET_SINGLE_PRODUCT,
        payload: response.data.payload,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
export const addToCart = (product) => async (dispatch, getState) => {
  try {
    let cart = getState().cart.singleCart; // ✅ Correctly accessing singleCart

    if (!cart) {
      cart = { id: 1, cartItemDtoList: [] }; // Initialize cart if it's undefined
    }

    if (!Array.isArray(cart.cartItemDtoList)) {
      cart.cartItemDtoList = []; // Ensure cartItemDtoList is an array
    }

    // Check if product is already in cart
    const existingItem = cart.cartItemDtoList.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if exists
    } else {
      cart.cartItemDtoList.push({ ...product, quantity: 1 }); // Add new item
    }

    // Dispatch updated cart to Redux
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });

    // Store in local storage (optional)
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

/**
 * Store bookmarks on local storage.
 * @param productId
 */
export const toggleBookmark =
  (productId: number) => async (dispatch, getState) => {
    const bookmarks = getState().products.bookmarkedIds;

    const bookmarkIds = [...bookmarks];

    if (bookmarkIds.includes(productId)) {
      const index = bookmarkIds.indexOf(productId);
      bookmarkIds.splice(index, 1);
    } else {
      bookmarkIds.push(productId);
    }

    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkIds));
    dispatch({
      type: SET_BOOKMARKS,
      payload: bookmarkIds,
    });
  };
