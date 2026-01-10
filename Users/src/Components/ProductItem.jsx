import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      to={`/product/${id}`} 
      className="group block bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100"
    >
      <div className="overflow-hidden relative aspect-[4/5] bg-gray-50">
        <img
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          src={image[0]}
          alt={name}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <p className="pt-1 pb-2 text-sm text-gray-600 font-medium truncate group-hover:text-black transition-colors font-outfit">
          {name}
        </p>
        <p className="text-sm font-semibold text-primary font-prata">
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
