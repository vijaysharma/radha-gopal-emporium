import React, { useState, useContext, useEffect } from "react";
import { priceCtx } from "../store/priceContext";
import Labelnput from "./Labelnput";
import ClothPiece from "./ClothPiece";
import { calculateFinalPrice, clothValueFinder } from "./utilities";

const PriceCalculator = () => {
  const [inputValues, setInputValues] = useState(()=>{
    let LsIvData = JSON.parse(localStorage.getItem("iv"));
    if(LsIvData && LsIvData.linenRate) {
      localStorage.removeItem("iv"); 
      LsIvData = undefined
    }
    return LsIvData || {
      clothRate: 120,
      liningRate: 30,
      laceRate: 5,
      labour: 35,
      profit: 40,
    }
  });
  const [calculatable, setCalculatable] = useState(
    JSON.parse(localStorage.getItem("clc")) || false
  );
  const [clothes, setClothes] = useState(
    JSON.parse(localStorage.getItem("cl")) || [
      {
        id: 1,
        length: 0,
        width: 0,
        liningRequired: true,
        laceRequired: true,
      },
    ]
  );
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
    calculateFinalPrice({ inputValues, clothes, priceContext });
    localStorage.setItem("iv", JSON.stringify(inputValues));
    localStorage.setItem("cl", JSON.stringify(clothes));
    localStorage.setItem("clc", JSON.stringify(calculatable));
  }, [inputValues, clothes]);
  return (
    <>
      <div className="calculator bg-secondary/5">
        <div className="calculatorDefaultInputs">
          <Labelnput
            labelText="Cloth/mtr"
            inputValue={inputValues.clothRate}
            onChangehandler={(e) => inputOnChange(e, "clothRate")}
          />
          <Labelnput
            labelText="Lining/mtr"
            inputValue={inputValues.liningRate}
            onChangehandler={(e) => inputOnChange(e, "liningRate")}
          />
          <Labelnput
            labelText="Lace/mtr"
            inputValue={inputValues.laceRate}
            onChangehandler={(e) => inputOnChange(e, "laceRate")}
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
              liningRequired={cloth.liningRequired}
              laceRequired={cloth.laceRequired}
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
                liningRequired: false,
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
