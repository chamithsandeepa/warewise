import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setmethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //API calls for COD
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          // console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
      case "stripe": {
      //API calls for Stripe
        const responseStripe = await axios.post(
          backendUrl + "/api/order/stripe",
          orderData,
          { headers: { token } }
        );
        // console.log(responseStripe.data);
        if (responseStripe.data.success) {
          const {session_url} = responseStripe.data;
          window.location.replace(session_url);
        } else {
          toast.error(responseStripe.data.message);
        }
        break;
      }
      default:
        break;
      }

      // console.log(orderItems);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-100"
    >
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
            placeholder="First Name"
            type="text"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
            placeholder="Last Name"
            type="text"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
          placeholder="Email address"
          type="email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
          placeholder="Street"
          type="text"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
            placeholder="City"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
            placeholder="State"
            type="text"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
            placeholder="Zipcode"
            type="number"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
            placeholder="Country"
            type="text"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded-md py-2.5 px-3.5 w-full focus:outline-none focus:border-black transition-colors bg-white font-outfit"
          placeholder="Phone Number"
          type="tel"
        />
      </div>

      {/* Right Side - Payment */}
      <div className="mt-8 lg:mt-0 w-full sm:max-w-[450px]">
        <div className="mt-8 min-w-full bg-gray-50 p-6 rounded-lg">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment method selection */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <div
              onClick={() => setmethod("stripe")}
              className={`flex items-center gap-3 border p-3 cursor-pointer rounded-lg transition-all duration-300 ${
                method === "stripe" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === "stripe" ? "border-green-500" : "border-gray-300"
                }`}
              >
                  {method === "stripe" && <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>}
              </div>
              <img className="h-5 mx-2 object-contain" src={assets.stripe_logo} alt="Stripe" />
            </div>

            <div
              onClick={() => setmethod("cod")}
              className={`flex items-center gap-3 border p-3 cursor-pointer rounded-lg transition-all duration-300 ${
                method === "cod" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === "cod" ? "border-green-500" : "border-gray-300"
                }`}
              >
                 {method === "cod" && <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>}
              </div>
              <p className="text-gray-600 text-sm font-medium mx-2 font-outfit">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-primary text-white text-sm px-16 py-3.5 rounded hover:bg-black transition-all shadow-md hover:shadow-lg font-medium tracking-wide w-full sm:w-auto"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
