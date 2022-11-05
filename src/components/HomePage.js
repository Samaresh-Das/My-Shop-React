import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import data from "../DUMMY_DATA";
import ItemList from "../ItemList/ItemList";
import Navbar from "./Navbar";

const HomePage = () => {
  const view = useSelector((state) => state.view.view);
  // console.log(view);
  const [items, setItems] = useState(data);

  const genderHandler = (gen) => {
    const genResult = data.filter((curGen) => {
      return curGen.category === gen;
    });
    setItems(genResult);
  };

  const sizeHandler = (size) => {
    const sizeResult = data.filter((curSize) => {
      return curSize.size === size;
    });
    console.log(sizeResult);
    setItems(sizeResult);
  };

  const searchHandler = (ser) => {
    const searchResult = data.filter((curItem) => {
      return curItem.name.toLowerCase().includes(ser);
    });
    setItems(searchResult);
  };
  const resetHandler = (ser) => {
    setItems(data);
  };

  const availableItems = items.map((item) => (
    <ItemList
      key={item.id}
      id={item.id}
      images={item.image}
      name={item.name}
      price={item.price}
      category={item.category}
      size={item.size}
      stock={item.inStock}
    />
  ));
  return (
    <Fragment>
      <Navbar
        sizeHandler={sizeHandler}
        genderHandler={genderHandler}
        searchHandler={searchHandler}
        resetHandler={resetHandler}
      />
      {view === "grid" ? (
        <div className="d-flex flex-row flex-wrap justify-content-between my-3 container">
          {availableItems}
        </div>
      ) : (
        view === "list" && (
          <div className="d-flex flex-column align-content-between container my-3">
            {availableItems}
          </div>
        )
      )}
    </Fragment>
  );
};

export default HomePage;
