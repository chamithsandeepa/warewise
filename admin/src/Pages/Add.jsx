import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendURL + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-8 bg-white p-8 rounded-xl shadow-soft glass"
    >
      <div className="w-full">
        <h2 className="text-2xl font-prata text-primary mb-6">Add New Product</h2>
        <div>
          <p className="mb-2 text-sm font-medium font-outfit text-gray-700">Upload Image</p>
          <div className="flex gap-4">
            <label htmlFor="image1" className="group">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
                className="w-24 h-24 object-cover cursor-pointer border border-dashed border-gray-300 rounded-lg group-hover:border-primary transition-colors bg-gray-50"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                accept="image/*"
                hidden
              />
            </label>
            <label htmlFor="image2" className="group">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt=""
                className="w-24 h-24 object-cover cursor-pointer border border-dashed border-gray-300 rounded-lg group-hover:border-primary transition-colors bg-gray-50"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                accept="image/*"
                hidden
              />
            </label>
            <label htmlFor="image3" className="group">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
                className="w-24 h-24 object-cover cursor-pointer border border-dashed border-gray-300 rounded-lg group-hover:border-primary transition-colors bg-gray-50"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                accept="image/*"
                hidden
              />
            </label>
            <label htmlFor="image4" className="group">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
                className="w-24 h-24 object-cover cursor-pointer border border-dashed border-gray-300 rounded-lg group-hover:border-primary transition-colors bg-gray-50"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm font-medium font-outfit text-gray-700">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-4 py-2.5 border border-gray-200 rounded-lg focus:border-black transition-colors font-outfit"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm font-medium font-outfit text-gray-700">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-4 py-2.5 border border-gray-200 rounded-lg focus:border-black transition-colors font-outfit"
          placeholder="Write Content here"
          rows="4"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
        <div>
          <p className="mb-2 text-sm font-medium font-outfit text-gray-700">Product category</p>
          <div className="relative">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-black bg-white appearance-none pr-10 cursor-pointer"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium font-outfit text-gray-700">Sub category</p>
          <div className="relative">
             <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-black bg-white appearance-none pr-10 cursor-pointer"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium font-outfit text-gray-700">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-2.5 sm:w-[120px] border border-gray-200 rounded-lg focus:border-black transition-colors"
            type="number"
            step="0.01"
            min="0"
            placeholder="25.00"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium font-outfit text-gray-700">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                } w-10 h-10 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 font-medium text-sm`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="accent-primary w-4 h-4 cursor-pointer"
        />
        <label className="cursor-pointer text-sm font-medium text-gray-700 font-outfit" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-32 py-3 mt-4 bg-primary text-white rounded-lg hover:bg-black transition-all duration-300 font-medium font-outfit shadow-md">
        ADD
      </button>
    </form>
  );
};

export default Add;
