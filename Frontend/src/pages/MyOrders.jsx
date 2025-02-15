import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/order/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again later.");
      }
    };

    if (userId) fetchOrders();
  }, [token, userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      {error && <div className="text-red-600 mb-4">⚠️ {error}</div>}

      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {order._id}
              </h2>
              <p className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x ₹
                      {item.cost / item.quantity} = ₹{item.cost}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
