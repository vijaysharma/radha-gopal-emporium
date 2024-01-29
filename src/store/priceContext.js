import { createContext, useState } from "react";

const initialState = {
  material: 0,
  labour: 0,
  profit: 0,
  final: 0,
};
export const priceCtx = createContext(initialState);
const PriceContext = ({ children }) => {
  const [finalPrice, setFinalPrice] = useState(initialState);

  return (
    <priceCtx.Provider value={{ finalPrice, setFinalPrice }}>
      {children}
    </priceCtx.Provider>
  );
};

export default PriceContext;
