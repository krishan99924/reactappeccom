// ProductsTable.js
import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../slices/ShowProductSlice";

const ProductsTable = () => {
  const navigate = useNavigate();
  const { Products } = useSelector((state) => state.products);
  const location = useLocation();
  const dispatch = useDispatch();
  const handleEditProduct = (id) => {
    navigate("/updateform", { state: { productId: id } });
  };
  const handleonDelete = async (id) => {
    try {
      const headers = {
        method: "DELETE",
      };
      const response = await fetch(`/api/product/deleteProduct/${id}`, headers);
      dispatch(getProducts());
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="table-responsive">
      <table className="table table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Products?.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Card.Img variant="top" src={product.image} className="p-3" />
              </td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => {
                    handleEditProduct(product._id);
                  }}
                  // onClick={() => onEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleonDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
