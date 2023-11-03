import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./components/Layout/Header/Header.js";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Product from "./components/Product/Products.js";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignup.js";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import React from "react";
import UserOptions from "./components/Layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
// import ProductList from "./components/Admin/ProductList.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = React.useState("");
  const stripePromise = loadStripe(stripeApiKey);
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Product />} />
        <Route exact path="/products/:keyword" element={<Product />} />
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/login" element={<LoginSignUp />}></Route>
        <Route exact path="/account" element={<Profile />}></Route>
        <Route exact path="/me/update" element={<UpdateProfile />}></Route>
        <Route
          exact
          path="/password/update"
          element={<UpdatePassword />}
        ></Route>
        <Route
          exact
          path="/password/forgot"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/shipping" element={<Shipping />}></Route>
        <Route exact path="/order/confirm" element={<ConfirmOrder />}></Route>
        <Route
          path="/process/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route exact path="/success" element={<OrderSuccess />}></Route>

        <Route exact path="/orders" element={<MyOrders />}></Route>
        <Route exact path="/order/:id" element={<OrderDetails />}></Route>
        <Route isAdmin={true} exact path="/admin/dashboard" element={<Dashboard />}></Route>
        {/* <Route isAdmin={true} exact path="/admin/products" element={<ProductList />}></Route> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
