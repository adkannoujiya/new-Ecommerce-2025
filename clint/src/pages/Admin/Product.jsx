import React, { useEffect, useState } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //LoadMore
  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page]);

  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://new-ecommerce-2025-1.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      if (data?.success) {
        setProduct([...product, ...data?.product]);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  // get total count of product
  const getTotal = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://new-ecommerce-2025-1.onrender.com/api/v1/product/product-count"
      );
      setLoading(false);

      if (data?.success) {
        setTotal(data?.total);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //get all products
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://new-ecommerce-2025-1.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      if (data?.success) {
        setProduct(data?.product);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProduct();
    getTotal();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product List</h1>

          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <Link to={`/dashboard/admin/product/${p.slug}`}>
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`https://new-ecommerce-2025-1.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {product && product.length < total && (
              <button
                className="btn btn-warning "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loadeing..." : "LoadMore"}
              </button>
            )}
          </div> */}
          <button>hello</button>
          <h1 className="text-center">All Product List</h1>
        </div>
      </div>
    </>
  );
};

export default Product;
