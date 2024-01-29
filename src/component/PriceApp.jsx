import Price from "./Price";
import PriceCalculator from "./PriceCalculator";
import priceCtx from "../store/priceContext";

const PriceApp = () => {
  return (
    <>
      <priceCtx.Provider value={{}}>
        <Price />
        <PriceCalculator />
      </priceCtx.Provider>
    </>
  );
};

export default PriceApp;
