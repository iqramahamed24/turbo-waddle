import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/home/Home";
import Income from "./pages/dashboard/income/Income";
import Budget from "./pages/dashboard/budget/Budget";
import Expenses from "./pages/dashboard/expenses/Expenses";
import LogOut from "./Components/LogOut";
import SignUp from "./pages/auth/Signup";
import Mainpage from "./pages/dashboard/mainpage/Mainpage";
import ContactUs from "./pages/dashboard/contactUs/ContactUs";
import "./index.css";
import { ToastContainer } from "react-bootstrap";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/income" element={<Income />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </>
  );
}

export default App;
