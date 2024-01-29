import React from "react";
import logo from "../assets/images/radha-gopal-logo.png";

const Logo = () => {
  return (
    <div className="header bg-yellow-300">
      <img className="inline" src={logo} height="auto" width="300" />
    </div>
  );
};

export default Logo;
