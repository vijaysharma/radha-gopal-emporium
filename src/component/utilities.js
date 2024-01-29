const parseFloatInput = (inputValue) => parseFloat(inputValue ? inputValue : 0);

export const calculateFinalPrice = ({ inputValues, clothes, priceContext }) => {
  const clothRatePerInch = parseFloatInput(inputValues.clothRate) / (39 * 32);
  const LinenRatePerInch = parseFloatInput(inputValues.linenRate) / (39 * 32);
  const area = clothes.reduce(
    (acc, cloth) => {
      let l = parseFloatInput(cloth.length);
      let w = parseFloatInput(cloth.width);
      return {
        clarea: acc.clarea + l * w,
        lnarea: cloth.linenRequired ? acc.lnarea + l * w : acc.lnarea,
      };
    },
    { clarea: 0, lnarea: 0 }
  );
  let clothCost =
    area.clarea * clothRatePerInch + area.lnarea * LinenRatePerInch;

  // adding 10% wastage, stich, electricity, pouch
  clothCost = Math.ceil(1.1 * clothCost + 5);
  const labourCost = Math.max(
    parseFloatInput(inputValues.labour),
    Math.ceil(
      area.clarea * clothRatePerInch * 1.5 +
        area.lnarea * LinenRatePerInch * 1.1
    )
  );
  const profit = Math.ceil(
    (parseFloatInput(inputValues.profit) / 100) * (clothCost + labourCost)
  );
  const finalPrice = clothCost + labourCost + profit;
  priceContext.setFinalPrice({
    material: clothCost,
    labour: labourCost,
    profit: profit,
    final: finalPrice,
  });
};

export const clothValueFinder = (cl) => {
  const found = cl.find((c) => c.length * c.width === 0);
  return !found;
};
