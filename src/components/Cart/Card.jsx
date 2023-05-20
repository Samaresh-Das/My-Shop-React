import React from "react";

const Card = ({ name, price, amount, onAdd, onRemove }) => {
  return (
    <div className="card mb-2" style={{ width: "90%" }}>
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <h5 className="card-subtitle mb-2 text-muted">
          No. of items - X{amount}
        </h5>
        <h5 className="card-text bold">Price - {price}</h5>
        <button type="button" className="btn btn-success mx-2" onClick={onAdd}>
          +
        </button>
        <span className="border border-3 border-success py-1 px-2 rounded">
          {amount}
        </span>
        <button
          type="button"
          className="btn btn-danger mx-2 py-1"
          onClick={onRemove}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Card;
