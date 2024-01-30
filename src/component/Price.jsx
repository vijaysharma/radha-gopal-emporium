import React, { useContext } from "react";
import { priceCtx } from "../store/priceContext";

const Price = () => {
  const { finalPrice } = useContext(priceCtx);

  return (
    <div className="priceCard">
      <div className="text-center rounded-none card bg-primary/10 shadow-xl p-2 pt-0">
        <h2 className="pt-1 pb-1">
          Final Price: <strong className="text-2xl">₹{finalPrice.final}</strong>
        </h2>
        <div className="card-body gap-0 p-0 justify-center join join-horizontal lg:join-horizontal">
          <span className="badge border-primary h-9 badge-outline badge-lg join-item">
            Material: ₹
            <strong className="text-xl">{finalPrice.material}</strong>
          </span>
          <span className="badge border-primary h-9 badge-outline badge-lg join-item">
            Labour: ₹ <strong className="text-xl">{finalPrice.labour}</strong>
          </span>
          <span className="badge border-primary h-9 badge-outline badge-lg join-item">
            Profit: ₹ <strong className="text-xl">{finalPrice.profit}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Price;
