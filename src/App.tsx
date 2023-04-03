import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Cookies from "universal-cookie";

const App: React.FC = () => {
  const cookies = new Cookies();
  const token = cookies.get("fetch-access-token");
  console.log(token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
