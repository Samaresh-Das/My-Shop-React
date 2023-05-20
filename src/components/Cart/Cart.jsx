import React, { Fragment, useContext } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../Modal/Modal";
import { FaRupeeSign } from "react-icons/fa";
import Card from "./Card";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const themeMode = useSelector((state) => state.theme.theme);

  const totalAmount = (
    <span>
      {cartCtx.totalAmount > 0 && <FaRupeeSign />}
      {cartCtx.totalAmount}
    </span>
  );

  const hasItems = cartCtx.items.length > 0;

  const addItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItem = (id) => {
    cartCtx.removeItem(id);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    return new Promise((resolve) => {
      //resolving the promise
      const options = {
        key: "rzp_test_ayIz6jcXM3N2lC",
        currency: "INR",
        amount: amount * 100,
        name: "Cloth store",
        description: "Thanks for purchasing",
        handler: function (response) {
          resolve(response.razorpay_payment_id);
        },
        prefill: {
          name: "Cloth store",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  };

  const paymentHandler = async (amount) => {
    const res = await displayRazorpay(amount); //if the promise resolves then clear the cart only.
    if (res) {
      console.log("Payment ID:", res);
      cartCtx.clearCart();
    }
  };

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        <Card
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItem.bind(null, item)}
          onRemove={removeItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Fragment>
      <Modal onClose={props.onClose}>
        {cartItems}
        <hr />
        {cartCtx.totalAmount > 0 && (
          <h4
            className={`d-flex flex-row justify-content-between px-2 ${
              themeMode === "dark" && "text-white"
            }`}
          >
            {" "}
            <span>
              <p>Total Price = {totalAmount}</p>
            </span>{" "}
            <span>
              {hasItems && (
                <button
                  className="btn btn-success px-5 fs-5"
                  onClick={() => paymentHandler(cartCtx.totalAmount)}
                >
                  Order
                </button>
              )}
            </span>
          </h4>
        )}
      </Modal>
    </Fragment>
  );
};

export default Cart;
