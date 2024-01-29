import React, { useContext } from "react";
import { priceCtx } from "../store/priceContext";

const Price = () => {
  const { finalPrice } = useContext(priceCtx);

  return (
    <div className="priceCard">
      <div className="text-center card card-compact bg-base-100 shadow-xl">
        <h2>
          Final Price: <strong className="text-2xl">₹{finalPrice.final}</strong>
        </h2>
        <div className="card-body justify-center join join-horizontal lg:join-horizontal">
          <span className="badge badge-default badge-outline badge-lg join-item">
            Material: ₹
            <strong className="text-xl">{finalPrice.material}</strong>
          </span>
          <span className="badge badge-default badge-outline badge-lg join-item">
            Labour: ₹ <strong className="text-xl">{finalPrice.labour}</strong>
          </span>
          <span className="badge badge-default badge-outline badge-lg join-item">
            Profit: ₹ <strong className="text-xl">{finalPrice.profit}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Price;
