// src/Context/ShopContext.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs : ";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ======================
  // Load cart from backend
  // ======================
  // useEffect(() => {
  //   const loadCartFromBackend = async () => {
  //     if (user && user.id) {
  //       try {
  //         const res = await axios.get(
  //           `http://localhost:8080/api/v1/users/${user.id}`
  //         );
  //         const updatedUser = res.data;
  //         localStorage.setItem("user", JSON.stringify(updatedUser));
  //         setUser(updatedUser);
  //         setCartItems(updatedUser.cartData || {});
  //       } catch (error) {
  //         console.error("Error loading cart from backend:", error);
  //       } finally {
  //         setIsCartLoaded(true);
  //       }
  //     } else {
  //       setIsCartLoaded(true);
  //     }
  //   };
  //   loadCartFromBackend();
  // }, [user?.id]);

  // ======================
  // Add to cart
  // ======================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  // ======================
  // Update quantity / remove
  // ======================
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ======================
  // Clear cart completely (frontend + backend)
  // ======================
  // const clearCart = async () => {
  //   setCartItems({});
  //   if (user?.id) {
  //     try {
  //       await axios.post(
  //         `http://localhost:8080/api/v1/users/updateCart`,
  //         {},
  //         { params: { userId: user.id } }
  //       );
  //     } catch (err) {
  //       console.error("Failed to clear cart on backend:", err);
  //     }
  //   }
  // };

  // ======================
  // Calculate total amount
  // ======================
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalAmount;
  };

  // ======================
  // Calculate cart count
  // ======================
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };

  // ======================
  // Sync cart to backend
  // ======================
  // useEffect(() => {
  //   const syncCart = async () => {
  //     if (!user || !user.id || !isCartLoaded) return;
  //     try {
  //       await axios.post(
  //         `http://localhost:8080/api/v1/users/updateCart`,
  //         cartItems,
  //         { params: { userId: user.id } }
  //       );
  //     } catch (err) {
  //       console.error("Error syncing cart to backend:", err);
  //     }
  //   };

  //   syncCart();
  // }, [cartItems, user, isCartLoaded]);

  // ======================
  // Load products
  // ======================
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      // console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
