import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        if (!token) {
          return null;
        }

        const response = await axios.post(
          backendUrl + "/api/order/userorders",
          {},
          { headers: { token } }
        );
        // console.log(response.data);
        if (response.data.success) {
          let allOrdersItem = [];
          response.data.orders.map((order) => {
            order.items.map((item) => {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              allOrdersItem.push(item);
            });
          });
          // console.log(allOrdersItem);
          setOrderData(allOrdersItem.reverse());
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    loadOrderData();
  }, [token, backendUrl]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-6 py-6 border-t border-b border-gray-200 text-gray-700 bg-white p-4 items-center"
          >
            {/* Product Info */}
            <div className="col-span-2 lg:col-span-3 flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-24 object-cover rounded-sm"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium text-gray-900">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg font-bold">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: <span className="text-gray-900 font-medium">{item.quantity}</span></p>
                  <p className="border bg-gray-50 px-2 py-0.5 rounded text-xs">{item.size}</p>
                </div>
                <p className="mt-2 text-gray-400 text-sm">
                  Date:{" "}
                  <span className="text-gray-600">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1 text-gray-400 text-sm">
                  Payment:{" "}
                  <span className="text-gray-600 uppercase">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Status & Action */}
            <div className="col-span-2 lg:col-span-2 flex justify-between md:justify-end gap-x-10 items-center mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base font-medium text-gray-600">{item.status}</p>
              </div>
              <button
                className="border border-gray-300 px-6 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
