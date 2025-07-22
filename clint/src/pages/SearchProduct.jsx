import React, { useState } from "react";
import s from "../AllCssFile/SearchProduct.module.css";
import { useCart } from "../context/Cart";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <>
      <div className="container" style={{ width: "100%", display: "flex" }}>
        <div>
          <h1>Search result</h1>
          <h6>
            {values.result.length < 1
              ? "No Result Found"
              : `Found ${values.result.length}`}
          </h6>
          <div
            className="d-flex flex-wrap justify-content-start "
            style={{
              rowGap: "20px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "start",
            }}
          >
            {values?.result.map((p) => (
              <div key={p._id} className={`card m-2 ${s.searchpeoduct}`}>
                <img
                  onClick={() => navigate(`/product-details/${p.slug}`)}
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: "300px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 60)}</p>
                  <p className="card-text">₹{p.price}</p>
                </div>

                <button
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    alert("Item added to cart successfully");
                  }}
                  className="btn btn-secondary m-1"
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => navigate(`/product-details/${p.slug}`)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
