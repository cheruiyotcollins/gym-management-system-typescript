import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { ICartItem } from "../../interfaces/Cart";
import { placeOrder } from "../../store/order/actions";
const CheckoutPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.singleCart);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePlaceOrder = () => {
    if (!shippingAddress.trim()) {
      alert("Please enter a shipping address");
      return;
    }

    if (!cart?.cartItemDtoList?.length) {
      alert("Your cart is empty");
      return;
    }

    dispatch(placeOrder(shippingAddress, paymentMethod, cart.cartItemDtoList));
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Checkout</h1>

      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {!cart?.cartItemDtoList?.length ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.cartItemDtoList.map((item: ICartItem) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>
                {item.title} (x{item.quantity})
              </span>
              <span>${(item.subTotal || 0).toFixed(2)}</span>
            </div>
          ))
        )}
        <div className="text-right font-bold text-lg mt-2">
          Total: $
          {cart?.cartItemDtoList
            ?.reduce((total, item) => total + (item.subTotal || 0), 0)
            .toFixed(2)}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold">Shipping Address</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full mt-1 p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Payment Method</label>
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => setPaymentMethod("mpesa")}
            className={`py-2 px-4 rounded-md ${
              paymentMethod === "mpesa"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            MPESA
          </button>
          <button
            onClick={() => setPaymentMethod("card")}
            className={`py-2 px-4 rounded-md ${
              paymentMethod === "card"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Credit/Debit Card
          </button>
          <button
            onClick={() => setPaymentMethod("paypal")}
            className={`py-2 px-4 rounded-md ${
              paymentMethod === "paypal"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            PayPal
          </button>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;
