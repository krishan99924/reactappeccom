import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import NavbarCom from "./components/Navbar";
import ProductsHomePage from "./components/ProductsHomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import Cart from "./components/Cart";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignUp";
import Dashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import ProductForm from "./components/ProductForm/ProductForm";
import { useState } from "react";
import ProductChart from "./pages/ProductCharts";

function App() {
  const [initialProduct, setInitialProduct] = useState(true);
  return (
    <>
      <BrowserRouter>
        <NavbarCom />
        <Routes>
          <Route exact path="/" element={<ProductsHomePage />}></Route>
          <Route exact path="/product/:id" element={<Product />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/login" element={<LoginForm />}></Route>
          <Route exact path="/signup" element={<SignupForm />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/productchart" element={<ProductChart />}></Route>
          <Route
            exact
            path="/productform"
            element={<ProductForm formType="Create your new product" />}
          ></Route>
          <Route
            exact
            path="/updateform"
            element={
              <ProductForm
                formType="update your product"
                initialProduct={initialProduct}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
