import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/order/actions";
import { RootState } from "../../store/reducers";
import { useNavigate } from "react-router-dom"; // Import useNavigate if using React Router v6+

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate hook for navigation
  const orders = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Handle click for navigating to order details page
  const handleViewOrderDetails = (orderId: number) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Order #</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Order Date</th>
                <th className="p-2 border">Shipping Address</th>
                <th className="p-2 border">Shipped On</th>
                <th className="p-2 border">Actions</th>{" "}
                {/* New Actions column */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border">
                  <td className="p-2 text-center">{order.orderNumber}</td>
                  <td className="p-2 text-center">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="p-2 text-center">{order.status}</td>
                  <td className="p-2 text-center">
                    {new Date(order.createdOn).toLocaleDateString()}
                  </td>
                  <td className="p-2">{order.shippingAddress}</td>
                  <td className="p-2">{order.shippedOn}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleViewOrderDetails(order.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
