import React, { useState, useContext, useEffect } from "react";
import { priceCtx } from "../store/priceContext";
import ClothPiece from "./ClothPiece";
import {
  calculateFinalPrice,
  clothValueFinder,
  inputValueSanitiser,
} from "./utilities";

const PriceCalculator = () => {
  const [inputValues, setInputValues] = useState({
    clothRate: 120,
    linenRate: 30,
    labour: 35,
    profit: 25,
  });
  const [calculatable, setCalculatable] = useState(false);
  const [clothes, setClothes] = useState([
    {
      id: 1,
      length: 0,
      width: 0,
      linenRequired: false,
    },
  ]);
  const priceContext = useContext(priceCtx);
  const clothSizeHandler = (e, id, trash = false) => {
    const updatedClothes = [...clothes];
    let indexOfCloth;
    const cloth = updatedClothes.find((cl, index) => {
      indexOfCloth = index;
      return cl.id === id;
    });
    if (e.target.name === "length") cloth.length = inputValueSanitiser(e);
    if (e.target.name === "width") cloth.width = inputValueSanitiser(e);
    if (e.target.name === "checkbox") cloth.linenRequired = e.target.checked;
    if (trash) updatedClothes.splice(indexOfCloth, 1);
    setClothes([...updatedClothes]);
    if (clothValueFinder(updatedClothes)) {
      setCalculatable(true);
    } else {
      setCalculatable(false);
    }
  };
  const inputOnChange = (e, key) =>
    setInputValues({
      ...inputValues,
      [key]: inputValueSanitiser(e),
    });

  useEffect(() => {
    calculateFinalPrice({ inputValues, clothes, priceContext });
  }, [inputValues, clothes]);
  return (
    <>
      <div className="calculator">
        <label className="label cursor-pointer">
          <span className="label-text">
            Rate of cloth per meter <strong>(₹)</strong>:
          </span>
          <input
            type="text"
            id="cloth_rate"
            placeholder="Type the price rate"
            className="input input-bordered input-primary max-w-xs"
            value={inputValues.clothRate}
            onChange={(e) => inputOnChange(e, "clothRate")}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">
            Rate of linen per meter <strong>(₹)</strong>:
          </span>
          <input
            type="text"
            id="linen_rate"
            placeholder="Type the price rate"
            className="input input-bordered input-primary max-w-xs"
            value={inputValues.linenRate}
            onChange={(e) => inputOnChange(e, "linenRate")}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">
            Minimum Labour Cost <strong>(₹)</strong>:
          </span>
          <input
            type="text"
            id="labour_rate"
            placeholder="Type the minimum labout cost"
            className="input input-bordered input-primary max-w-xs"
            value={inputValues.labour}
            onChange={(e) => inputOnChange(e, "labour")}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">
            Profit <strong>(%)</strong>:
          </span>
          <input
            type="text"
            id="profit_rate"
            placeholder="Type the profit percentage"
            className="input input-bordered input-primary max-w-xs"
            value={inputValues.profit}
            onChange={(e) => inputOnChange(e, "profit")}
          />
        </label>
        {clothes.map((cloth) => {
          return (
            <ClothPiece
              key={cloth.id}
              id={cloth.id}
              length={cloth.length}
              width={cloth.width}
              linenRequired={cloth.linenRequired}
              sizeHandler={clothSizeHandler}
              clothesLength={clothes.length}
            />
          );
        })}

        <button
          className={`btn btn-outline btn-primary btn-xs ${
            calculatable ? "" : "btn-disabled"
          }`}
          onClick={() => {
            setClothes([
              ...clothes,
              {
                id: clothes[clothes.length - 1].id + 1,
                length: 0,
                width: 0,
                linenRequired: false,
              },
            ]);
            setCalculatable(false);
          }}
        >
          + Add Cloth
        </button>
      </div>
    </>
  );
};

export default PriceCalculator;
