import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import orderIcon from "../../public/images/orderID.svg";

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
      } catch {
        setError("Failed to load orders. Please try again later.");
      }
    };
    if (userId) fetchOrders();
  }, [token, userId]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-[#132D46] text-2xl font-extrabold text-center mb-4">My Orders</h1>
      {error && <div className="text-red-600 mb-4">⚠ {error}</div>}
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-[#132D46] p-2 rounded-[20px] shadow-2xl hover:shadow-3xl transition-all">
            <div className="bg-white p-6 rounded-[16px] flex items-center mb-2">
              <img src={orderIcon} alt="Order ID" className="w-8 h-8 mr-2" />
              <h2 className="text-[#132D46] text-xl font-semibold">Order ID: {order._id}</h2>
            </div>
            <div className="bg-white p-4 rounded-[16px]">
              <p className="text-gray-700 text-lg"><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-gray-700 text-lg"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <table className="w-full border-separate border-spacing-[4px]">
                <thead className="bg-[#132D46] text-white">
                  <tr>
                    {['Name', 'Quantity', 'Price', 'Total'].map((heading) => (
                      <th key={heading} className="p-2 border border-[#132D46] rounded-xl">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="text-gray-700 text-lg">
                      {[item.name, item.quantity, `₹${(item.cost / item.quantity).toFixed(2)}`, `₹${item.cost.toFixed(2)}`].map((cell, i) => (
                        <td key={i} className="p-2 border border-[#132D46] rounded-xl">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
