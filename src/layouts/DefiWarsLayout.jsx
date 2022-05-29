import React from "react";
import { Outlet } from "react-router-dom";
import appStyle from "../App.module.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const DefiWarsLayout = () => (
  <div className={appStyle.Sword}>
    <Header />
    <div className={appStyle.container}>
      <Outlet/>
    </div>
    <Footer />
  </div>
);

export default DefiWarsLayout;
