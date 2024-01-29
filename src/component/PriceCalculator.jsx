import React, { useState, useContext, useEffect } from "react";
import { priceCtx } from "../store/priceContext";
import Labelnput from "./Labelnput";
import ClothPiece from "./ClothPiece";
import { calculateFinalPrice, clothValueFinder } from "./utilities";

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
    if (e.target.name === "length") cloth.length = e.target.value;
    if (e.target.name === "width") cloth.width = e.target.value;
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
      [key]: e.target.value,
    });

  useEffect(() => {
    calculateFinalPrice({ inputValues, clothes, priceContext });
  }, [inputValues, clothes]);
  return (
    <>
      <div className="calculator">
        <div className="calculatorDefaultInputs">
          <Labelnput
            labelText="Cloth/mtr"
            inputValue={inputValues.clothRate}
            onChangehandler={(e) => inputOnChange(e, "clothRate")}
          />
          <Labelnput
            labelText="Linen/mtr"
            inputValue={inputValues.linenRate}
            onChangehandler={(e) => inputOnChange(e, "linenRate")}
          />
          <Labelnput
            labelText="Min. Lab."
            inputValue={inputValues.labour}
            onChangehandler={(e) => inputOnChange(e, "labour")}
          />
          <Labelnput
            labelText="Profit"
            inputValue={inputValues.profit}
            defaultSymbol="%"
            onChangehandler={(e) => inputOnChange(e, "profit")}
          />
        </div>
        <br />
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
