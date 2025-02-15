import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/order/all-orders`,{
            headers:{Authorization: `Bearer ${token}`}
        });
        console.log(response);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, [backendUrl]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.userId.name}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <h3 className="font-semibold mt-2">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map(item => (
                  <li key={item._id}>{item.name} - {item.quantity} pcs (₹{item.cost})</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
