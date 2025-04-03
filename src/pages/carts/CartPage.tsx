import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  removeFromCart,
  changeCartItemQuantity,
} from "../../store/cart/actions";
import { ICart, ICartItem } from "../../interfaces/Cart";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart: ICart | null = useSelector(
    (state: RootState) => state.cart.singleCart
  );
  const [cartState, setCartState] = useState<ICart | null>(cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCartItemChange = (
    cartId: number,
    cartItemId: number,
    amountChanged: number
  ) => {
    dispatch(changeCartItemQuantity(cartId, cartItemId, amountChanged));
  };

  const calculateTotal = () => {
    if (!cart?.cartItemDtoList?.length) return "0.00";
    return cart.cartItemDtoList
      .reduce(
        (total, item) => total + (item.subTotal || item.price * item.quantity),
        0
      )
      .toFixed(2);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Shopping Cart</h1>
        <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
      </div>

      {/* If cart is empty */}
      {!cart?.cartItemDtoList?.length ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.cartItemDtoList.map((item: ICartItem) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-300">
                <img
                  src={item.imageUrl || "/default-image.png"}
                  alt={item.title || "Product Image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium truncate">{item.title}</h3>
                <p className="text-xs text-gray-600">Price: ${item.price}</p>
                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm font-semibold text-gray-900">
                  $
                  {item.subTotal?.toFixed(2) ||
                    (item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCartItemChange(cart.cartId, item.id, -1)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={item.quantity <= 1} // Prevent negative quantity
                >
                  <MinusCircleIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCartItemChange(cart.cartId, item.id, 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id)}
                className="ml-3 text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="text-center font-bold text-lg text-gray-800 border-t pt-3">
            Total: ${calculateTotal()}
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
