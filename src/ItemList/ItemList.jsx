import React, { Fragment, useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { IconContext } from "react-icons";

import { useSelector } from "react-redux";
import CartContext from "../context/cart-context";
import ItemListForm from "./ItemListForm";

const ItemList = ({ id, images, name, price, category, size, stock }) => {
  const cartCtx = useContext(CartContext);
  const view = useSelector((state) => state.view.view);
  const themeMode = useSelector((state) => state.theme.theme);
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  const gridJsx = (
    <div
      className={`card my-2 ${
        themeMode === "dark" ? "card-dark text-white" : null
      }`}
      style={{ width: "21rem", margin: "0px 3px" }}
    >
      <img src={images} className="card-img-top" alt="..." />
      <div className="card-body ">
        <h3 className="card-title">{name}</h3>
        {/* <p className="card-text">
      Some quick example text to build on the card title and make up the
      bulk of the card's content.
    </p> */}
        <ul className="list-group list-group-flush">
          <li
            className={`list-group-item ${
              themeMode === "dark" ? "list-dark text-white" : null
            }`}
          >
            <h3>
              <IconContext.Provider
                value={{
                  color: "black",
                  className: "global-class-name",
                  size: "22px",
                }}
              >
                <FaRupeeSign
                  className={`${themeMode === "dark" ? "text-white" : null}`}
                />
              </IconContext.Provider>
              {price}
            </h3>
          </li>
          {stock ? (
            <li
              className={`list-group-item fw-bolder border-0 ${
                themeMode === "dark" ? "list-dark" : null
              }`}
              style={{ color: "#6a994e" }}
            >
              In Stock
            </li>
          ) : (
            <li
              className={`list-group-item fw-bolder border-0 ${
                themeMode === "dark" ? "list-dark" : null
              }`}
              style={{ color: "#d90429" }}
            >
              Out Of Stock
            </li>
          )}
          <ItemListForm stock={stock} onAddToCart={addToCartHandler} id={id} />
        </ul>
      </div>
    </div>
  );

  const listJsx = (
    <div
      className={`card mb-3  ${
        themeMode === "dark" ? "card-dark text-white" : null
      }`}
      style={{ maxWidth: "100%" }}
    >
      <div className="row g-0">
        <div className="col-md-2">
          <img
            src={images}
            className="img-fluid rounded-start"
            style={{ height: "200px" }}
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <h3>
              <IconContext.Provider
                value={{
                  color: "black",
                  className: "global-class-name",
                  size: "22px",
                }}
              >
                <FaRupeeSign
                  className={`${themeMode === "dark" ? "text-white" : null}`}
                />
              </IconContext.Provider>
              {price}
            </h3>
            <p className="card-text">
              {stock ? (
                <p
                  className="list-group-item fw-bolder"
                  style={{ color: "#6a994e" }}
                >
                  In Stock
                </p>
              ) : (
                <p
                  className="list-group-item fw-bolder"
                  style={{ color: "#d90429" }}
                >
                  Out Of Stock
                </p>
              )}
            </p>

            <ItemListForm
              stock={stock}
              onAddToCart={addToCartHandler}
              id={id}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {view === "grid" ? gridJsx : view === "list" && listJsx}
    </Fragment>
  );
};

export default ItemList;
