import React, { useEffect, useState, useCallback } from "react";
import { currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { backendURL } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list", {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [token]);

  const removeProduct = async (id) => {
    try {
      const reponse = await axios.post(
        backendURL + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (reponse.data.success) {
        toast.success(reponse.data.message);
        await fetchList();
      } else {
        toast.error(reponse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft glass">
      <h2 className="text-2xl font-prata text-primary mb-6">All Products List</h2>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border border-gray-100 bg-gray-50 text-sm font-medium font-outfit text-gray-600 rounded-t-lg">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        <div className="flex flex-col gap-3">
          {list.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border border-gray-100 text-sm hover:bg-gray-50/50 transition-colors rounded-lg"
              key={index}
            >
              <img className="w-12 h-12 object-cover rounded-md border border-gray-200" src={item.image[0]} alt="product" />
              <p className="font-medium text-primary font-outfit truncate">{item.name}</p>
              <p className="text-gray-500">{item.category}</p>
              <p className="font-medium text-primary">
                {currency}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg text-red-400 hover:text-red-600 transition-colors"
                title="Remove Product"
              >
                <span className="material-icons-outlined">delete</span>
                {/* Fallback if no icons: X */}
                X
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
