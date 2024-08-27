import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ProductForm = ({ initialProduct = false, formType }) => {
  console.log("initialProduct", initialProduct);
  const { Products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const location = useLocation();
  let updatedata;
  if (initialProduct) {
    updatedata = Products.filter((item) => {
      return item._id == location.state.productId;
    })[0];
  }
  let userData = {};
  if (initialProduct) {
    userData = {
      title: updatedata.title,
      price: updatedata.price,
      description: updatedata.description,
      category: updatedata.category,
      image: updatedata.image,
    };
  } else {
    userData = {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    };
  }

  const [product, setProduct] = useState(userData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProduct({
        ...product,
        [name]: files[0], // Store the file object in state
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("qnty", product.qnty);
    formData.append("image", product.image);
    try {
      const headers = {
        method: "POST",
        body: formData,
      };
      if (!initialProduct) {
        const response = await fetch(`/api/product/createProduct`, headers);
        const res = await response.json();
        setProduct({
          title: "",
          price: "",
          description: "",
          category: "",
          qnty: "",
          image: null, // Reset the image field to null
        });
        navigate("/");
        return res;
      } else {
        const response = await fetch(
          `/api/product/updateProduct/${location.state.productId}`,
          headers
        );
        const res = await response.json();
        setProduct({
          title: "",
          price: "",
          description: "",
          category: "",
          qnty: "",
          image: null, // Reset the image field to null
        });
        navigate("/");
        return res;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container>
      <h2>{formType}</h2>
      <button
        className="btn btn-primary my-2"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Back to Dashboard
      </button>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product?.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={product?.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product?.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product?.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formQnty">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            name="qnty"
            value={product?.qnty}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="file"
            id="imageUpload"
            name="image"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {initialProduct ? "Update Product" : "Add Product"}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
