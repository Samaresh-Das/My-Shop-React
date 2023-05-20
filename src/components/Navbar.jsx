import React, { Fragment, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IconContext } from "react-icons";
import { BsGridFill, BsList } from "react-icons/bs";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import Cart from "./Cart/Cart";
import { viewActions } from "../store/view";
import { themeActions } from "../store/theme";
import { useDispatch, useSelector } from "react-redux";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.theme);
  const [showModal, setShowModal] = useState(false);

  const categorySelectHandler = (e) => {
    props.genderHandler(e.target.value);
  };
  const sizeSelectHandler = (e) => {
    props.sizeHandler(e.target.value);
  };
  const searchHandler = (e) => {
    props.searchHandler(e.target.value);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const listViewHandler = () => {
    dispatch(viewActions.list("list"));
  };

  const gridViewHandler = () => {
    dispatch(viewActions.grid("grid"));
  };

  const darkThemeToggler = () => {
    if (themeMode === "light") {
      dispatch(themeActions.dark("dark"));
    }
    console.log(themeMode);
  };
  const lightThemeToggler = () => {
    if (themeMode === "dark") {
      dispatch(themeActions.light("light"));
    }
    console.log(themeMode);
  };

  return (
    <Fragment>
      {showModal && <Cart onClose={hideModalHandler} />}
      <nav
        className={`navbar navbar-expand-lg ${
          themeMode === "light"
            ? "bg-light"
            : themeMode === "dark" && "navbar-dark bg-dark"
        }`}
      >
        <div className="container-fluid">
          <div className="navbar-brand fw-bold fs-2">Sam's Shop</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="form-floating mx-2">
              <select
                className="form-select py-0"
                style={{ height: "40px" }}
                id="floatingSelect"
                onChange={categorySelectHandler}
              >
                <option selected disabled>
                  Category
                </option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
              {/* <label htmlFor="floatingSelect"></label> */}
            </div>
            <div className="form-floating navbar-nav me-auto mb-2 mb-lg-0">
              <select
                className="form-select mx-2 py-0"
                style={{ height: "40px" }}
                id="floatingSelect"
                onChange={sizeSelectHandler}
              >
                <option selected disabled>
                  Size
                </option>
                <option value="M">M</option>
                <option value="S">S</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              {/* <label htmlFor="floatingSelect"></label> */}
              <button
                className="btn btn-outline-success mx-2 border border-success border-3"
                type="button"
                onClick={props.resetHandler}
              >
                Reset
              </button>
            </div>

            <div className="me-3 ">
              {themeMode === "dark" && (
                <button
                  className="d-inline mx-2 bg-dark  text-light"
                  style={{
                    border: "none",
                    borderRadius: "50%",
                    fontSize: "20px",
                  }}
                  onClick={lightThemeToggler}
                >
                  <MdOutlineDarkMode />
                </button>
              )}
              {themeMode === "light" && (
                <button
                  className="d-inline mx-2 bg-light"
                  style={{
                    border: "none",
                    fontSize: "20px",
                    borderRadius: "50%",
                  }}
                  onClick={darkThemeToggler}
                >
                  <MdDarkMode />
                </button>
              )}
              <button
                className={`d-inline mx-2 bg-light ${
                  themeMode === "dark"
                    ? "bg-dark text-light"
                    : themeMode === "light" && "bg-light"
                }`}
                style={{
                  border: "none",
                  fontSize: "20px",
                  borderRadius: "50%",
                }}
                onClick={gridViewHandler}
              >
                <BsGridFill />
              </button>
              <button
                className={`d-inline mx-2 bg-light ${
                  themeMode === "dark"
                    ? "bg-dark text-light"
                    : themeMode === "light" && "bg-light"
                }`}
                style={{
                  border: "none",
                  fontSize: "20px",
                  borderRadius: "50%",
                }}
                onClick={listViewHandler}
              >
                <BsList />
              </button>
            </div>
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchHandler}
              />
              <IconContext.Provider
                value={{
                  color: "#2a9d8f",
                  className: "global-class-name cart-icon text-center me-0",
                  size: "2em",
                }}
              >
                <div
                  className={`mx-3  text-center ${
                    themeMode === "dark" ? "text-white" : "text-dark"
                  }`}
                >
                  <AiFillHeart />
                  Wishlist
                </div>
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  color: "#2a9d8f",
                  className: "global-class-name cart-icon",
                  size: "2em",
                }}
              >
                <div
                  onClick={showModalHandler}
                  className={`ms-3 ${
                    themeMode === "dark" ? "text-white" : "text-dark"
                  }`}
                >
                  <HiOutlineShoppingBag />
                  Cart
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
