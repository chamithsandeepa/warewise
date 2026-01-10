import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";
import { currency } from "../App";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders (for admin panel)
  const fetchAllOrders = useCallback(async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendURL + "/api/order/list",
        {},
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [token]);

  // ✅ Status update handler
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendURL + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token, fetchAllOrders]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft glass">
      <h3 className="text-2xl font-prata text-primary mb-6">Order Page</h3>
      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 p-6 rounded-lg bg-gray-50/30 hover:shadow-soft transition-all duration-300"
            key={index}
          >
            <div className="flex justify-center sm:justify-start">
               <img className="w-14 h-14 object-contain opacity-80" src={assets.parcel_icon} alt="" />
            </div>
           
            <div className="text-sm text-gray-600 font-outfit">
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index} className="font-medium text-primary">
                        {item.name} x {item.quantity} <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="font-medium text-primary">
                        {item.name} x {item.quantity} <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-4 mb-1 font-semibold text-base text-primary">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="leading-relaxed">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="mt-2 font-medium">{order.address.phone}</p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>Items : <span className="font-medium text-primary">{order.items.length}</span></p>
              <p>Method : <span className="font-medium text-primary uppercase">{order.paymentMethod}</span></p>
              <p>Payment : <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-orange-500'}`}>{order.payment ? "Done" : "Pending"}</span></p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-base font-semibold text-primary font-prata">
              {currency}
              {order.amount}
            </p>
            
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2.5 font-medium border border-gray-200 rounded-lg bg-white focus:border-primary outline-none transition-colors cursor-pointer text-sm"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
