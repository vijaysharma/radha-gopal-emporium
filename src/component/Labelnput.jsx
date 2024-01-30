import React from "react";

const Labelnput = ({
  labelText,
  inputValue,
  defaultSymbol = "₹",
  onChangehandler,
}) => {
  return (
    <label className="form-control text-center max-w-24 inline-block cursor-pointer">
      <div className="label">
        <span className="label-text text-xs">
          {labelText} <strong>({defaultSymbol})</strong>:
        </span>
      </div>
      <input
        type="text"
        placeholder="Enter"
        className="input input-bordered input-primary max-w-20"
        value={inputValue}
        onChange={(e) => onChangehandler(e)}
      />
    </label>
  );
};

export default Labelnput;
