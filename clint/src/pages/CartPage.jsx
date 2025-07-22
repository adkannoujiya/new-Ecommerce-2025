import React, { useState, useEffect } from "react";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import s from "../AllCssFile/CartPage.module.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const checkoutPayment = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get(
        "https://new-ecommerce-2025-1.onrender.com/api/get-razorpay-key"
      );

      const {
        data: { order },
      } = await axios.post(
        "https://new-ecommerce-2025-1.onrender.com/api/checkout",
        { amount }
      );

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Ad E-Commerce",
        description: "Order Payment",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const res = await axios.post(
            "https://new-ecommerce-2025-1.onrender.com/api/payment-verification",
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              cart,
            }
          );

          if (res.data.success) {
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
          }
        },
        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
          contact: "",
        },
        notes: {
          address: auth?.user?.address || "NA",
        },
        theme: {
          color: "#fb8c00",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className={s.cartContainer}>
      <h2 className={s.cartTitle}>
        {auth?.token
          ? `Welcome Back,  ${
              auth.user.name.charAt(0).toUpperCase() + auth.user.name.slice(1)
            }!`
          : "Your Cart"}
      </h2>

      <div className={s.cartContent}>
        <div className={s.productList}>
          {cart?.length ? (
            cart.map((item) => (
              <div key={item._id} className={s.productCard}>
                <img
                  src={`https://new-ecommerce-2025-1.onrender.com/api/v1/product/product-photo/${item._id}`}
                  alt={item.name}
                  className={s.productImage}
                />
                <div className={s.productDetails}>
                  <div>
                    <div className={s.productName}>{item.name}</div>
                    <div className={s.productDesc}>
                      {item.description.substring(0, 80)}...
                    </div>
                    <div className={s.productPrice}>Price: ₹{item.price}</div>
                  </div>
                  <button
                    className={s.removeBtn}
                    onClick={() => removeCartItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  paddingTop: "10px",
                }}
              >
                No item in cart, go to home page and add items
              </p>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "orange",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Home
              </Link>
              {/* Add other elements here */}
            </div>
          )}
        </div>

        <div className={s.summaryBox}>
          <h3>Cart Summary</h3>
          <p>Total Items: {cart?.length}</p>
          <p>Total Price: ₹{totalPrice()}</p>
          {auth?.user?.address ? (
            <>
              <h5>Shipping Address:</h5>
              <p>{auth.user.address}</p>
              <button
                className={s.checkoutBtn}
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Change Address
              </button>
            </>
          ) : auth?.token ? (
            <button
              className={s.checkoutBtn}
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Set Shipping Address
            </button>
          ) : (
            <button
              className={s.checkoutBtn}
              onClick={() => navigate("/login", { state: "/cart" })}
            >
              Please Login to Checkout
            </button>
          )}

          <button
            className={s.checkoutBtn}
            onClick={() => checkoutPayment(totalPrice())}
            disabled={!auth?.user?.address || cart.length === 0 || loading}
          >
            {loading ? "Processing..." : "Make Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
