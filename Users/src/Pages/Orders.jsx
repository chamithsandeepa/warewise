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
    <div className="border-t border-gray-100 pt-16">
      <div className="text-2xl mb-12">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6 border border-gray-100 rounded-lg bg-white p-6 shadow-sm hover:shadow-soft transition-shadow"
          >
            {/* Product Info */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                 <img
                    className="w-full h-full object-cover"
                    src={item.image[0]}
                    alt={item.name}
                  />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-base font-semibold text-primary font-outfit mb-1">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-outfit">
                    <p className="font-prata text-primary font-medium">
                      {currency} {item.price}
                    </p>
                    <p>Qty: <span className="text-gray-900 font-medium">{item.quantity}</span></p>
                    <p className="px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100 text-xs text-gray-600 font-medium uppercase min-w-[2rem] text-center">
                       {item.size}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                   <p className="text-xs text-gray-400">
                    Ordered on: <span className="text-gray-600 font-medium">{new Date(item.date).toDateString()}</span>
                   </p>
                   <p className="text-xs text-gray-400">
                    Payment: <span className="text-gray-600 font-medium uppercase">{item.paymentMethod}</span>
                   </p>
                </div>
              </div>
            </div>

            {/* Status & Action */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-start sm:items-center md:items-end lg:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-green-500/50 animate-pulse'}`}></span>
                <p className="text-sm font-medium text-gray-600">{item.status}</p>
              </div>
              <button
                onClick={() => {}}
                className="px-6 py-2.5 text-sm font-medium rounded-full border border-gray-200 text-gray-600 hover:text-primary hover:border-black hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto"
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
