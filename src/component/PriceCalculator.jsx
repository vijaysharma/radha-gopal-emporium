import React, { useState, useContext, useEffect } from "react";
import { priceCtx } from "../store/priceContext";
import Labelnput from "./Labelnput";
import ClothPiece from "./ClothPiece";
import { calculateFinalPrice, clothValueFinder } from "./utilities";

const PriceCalculator = () => {
  const [inputValues, setInputValues] = useState(() => {
    let LsIvData = JSON.parse(localStorage.getItem("iv"));
    if (LsIvData && LsIvData.clothRate) {
      localStorage.removeItem("iv");
      LsIvData = undefined;
    }
    return (
      LsIvData || {
        labour: 35,
        profit: 40,
      }
    );
  });
  const [calculatable, setCalculatable] = useState(
    JSON.parse(localStorage.getItem("clc")) || false
  );
  const [clothes, setClothes] = useState(() => {
    let ClIvData = JSON.parse(localStorage.getItem("cl"));
    if (ClIvData && !ClIvData[0].clothRate) {
      localStorage.removeItem("cl");
    }
    return (
      ClIvData || [
        {
          id: 1,
          length: 0,
          width: 0,
          clothRate: 120,
          liningRate: 30,
          laceRate: 5,
          liningRequired: true,
          laceRequired: true,
        },
      ]
    );
  });

  const priceContext = useContext(priceCtx);
  const setFinalPrice = priceContext.setFinalPrice;
  const clothSizeHandler = (e, id, trash = false) => {
    const updatedClothes = [...clothes];
    let indexOfCloth;
    const cloth = updatedClothes.find((cl, index) => {
      indexOfCloth = index;
      return cl.id === id;
    });
    if (e.target.name === "clothRate") cloth.clothRate = e.target.value;
    if (e.target.name === "liningRate") cloth.liningRate = e.target.value;
    if (e.target.name === "laceRate") cloth.laceRate = e.target.value;
    if (e.target.name === "length") cloth.length = e.target.value;
    if (e.target.name === "width") cloth.width = e.target.value;
    if (e.target.name === "lining") cloth.liningRequired = e.target.checked;
    if (e.target.name === "lace") cloth.laceRequired = e.target.checked;
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
    calculateFinalPrice({ inputValues, clothes, setFinalPrice });
    localStorage.setItem("iv", JSON.stringify(inputValues));
    localStorage.setItem("cl", JSON.stringify(clothes));
    localStorage.setItem("clc", JSON.stringify(calculatable));
  }, [inputValues, clothes, calculatable, setFinalPrice]);
  return (
    <>
      <div className="calculator bg-secondary/5">
        <div className="calculatorDefaultInputs">
          <Labelnput
            labelText="Labor"
            name="labor"
            inputValue={inputValues.labour}
            onChangehandler={(e) => inputOnChange(e, "labour")}
          />
          <Labelnput
            labelText="Profit"
            name="profit"
            inputValue={inputValues.profit}
            defaultSymbol="%"
            onChangehandler={(e) => inputOnChange(e, "profit")}
          />
        </div>

        {clothes.map((cloth) => {
          return (
            <ClothPiece
              key={cloth.id}
              id={cloth.id}
              clothRate={cloth.clothRate}
              liningRate={cloth.liningRate}
              laceRate={cloth.laceRate}
              length={cloth.length}
              width={cloth.width}
              liningRequired={cloth.liningRequired}
              laceRequired={cloth.laceRequired}
              sizeHandler={clothSizeHandler}
              clothesLength={clothes.length}
            />
          );
        })}
        <br />
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
                clothRate: 120,
                liningRate: 30,
                laceRate: 5,
                liningRequired: false,
                laceRequired: false,
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
