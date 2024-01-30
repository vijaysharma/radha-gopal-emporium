import React from "react";
import logo from "../assets/images/radha-gopal-logo.png";

const Logo = () => {
  return (
    <div className="header bg-primary/20">
      <img className="inline" src={logo} height="auto" width="180" />
    </div>
  );
};

export default Logo;
