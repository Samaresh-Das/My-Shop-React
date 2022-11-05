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
        {/* {cartItems}
        <div>
          {cartCtx.items.map((item) => (
            <p>{item.price}</p>
          ))}
          <span>{cartCtx.totalAmount > 0 && totalAmount}</span>
        </div>
        <div>{hasItems && <button>Order</button>}</div> */}
        <hr />
        {cartCtx.totalAmount > 0 && (
          <p
            className={`d-flex flex-row justify-content-between px-2 ${
              themeMode === "dark" && "text-white"
            }`}
          >
            {" "}
            <span>
              <h4>Total Price = {totalAmount}</h4>
            </span>{" "}
            <span>
              {hasItems && (
                <button className="btn btn-success px-5 fs-5">Order</button>
              )}
            </span>
          </p>
        )}
      </Modal>
    </Fragment>
  );
};

export default Cart;
