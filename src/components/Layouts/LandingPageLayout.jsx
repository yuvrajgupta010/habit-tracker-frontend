import React from "react";
import style from "./LandingPage.module.css";
import Header from "../Header/Header";

const LandingPageLayout = (props) => {
  return (
    <div className={style["landingPage"]}>
      <Header />
      {props.children}
    </div>
  );
};

export default LandingPageLayout;
