import { useState } from "react";
import "./App.css";
import Logo from "./component/Logo";
import Price from "./component/Price";
import PriceCalculator from "./component/PriceCalculator";
import PriceContext from "./store/priceContext";

function App() {
  return (
    <>
      <Logo />
      <PriceContext>
        <Price />
        <PriceCalculator />
      </PriceContext>
    </>
  );
}

export default App;
