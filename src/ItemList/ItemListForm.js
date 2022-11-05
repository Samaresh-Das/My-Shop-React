import React from "react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ItemListForm = (props) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const themeMode = useSelector((state) => state.theme.theme);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }
    setAddedToCart(true);
    toast.success("Added to cart");
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler} style={{ border: "none" }}>
      <li
        className={`list-group-item border-0  ${
          themeMode === "dark" ? "list-dark" : null
        }`}
      >
        <input
          ref={amountInputRef}
          type="number"
          id={`amount ${props.id}`}
          min="1"
          max="5"
          step="1"
          defaultValue="1"
        />
        <button
          disabled={!props.stock ? true : false}
          className={` mx-4 ${
            addedToCart ? "btn btn-success" : "btn btn-primary"
          }`}
        >
          Add To Cart
        </button>
      </li>
      {/* <li
        className={`list-group-item border-0 d-inline ${
          themeMode === "dark" ? "list-dark" : null
        }`}
      ></li> */}
    </form>
  );
};

export default ItemListForm;
