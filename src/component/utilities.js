const parseFloatInput = (inputValue) => parseFloat(inputValue ? inputValue : 0);

export const calculateFinalPrice = ({ inputValues, clothes, priceContext }) => {
  const clothRatePerInch = parseFloatInput(inputValues.clothRate) / (39 * 32);
  const LiningRatePerInch = parseFloatInput(inputValues.liningRate) / (39 * 32);  
  const LaceRatePerInch = parseFloatInput(inputValues.laceRate) / 39;
  const area = clothes.reduce(
    (acc, cloth) => {
      let l = parseFloatInput(cloth.length);
      let w = parseFloatInput(cloth.width);
      return {
        clarea: acc.clarea + l * w,
        lnarea: cloth.liningRequired ? acc.lnarea + l * w : acc.lnarea,
        laceLn: cloth.laceRequired ? acc.laceLn + l + w + w : acc.laceLn,
      };
    },
    { clarea: 0, lnarea: 0, laceLn: 0 }
  );
  let clothCost =
    area.clarea * clothRatePerInch + area.lnarea * LiningRatePerInch + area.laceLn * LaceRatePerInch;

  // adding 10% wastage, stich, electricity, pouch
  clothCost = Math.ceil(1.1 * clothCost + 5);
  const labourCost = Math.max(
    parseFloatInput(inputValues.labour),
    Math.ceil(
      area.clarea * clothRatePerInch * 1.5 +
        area.lnarea * LiningRatePerInch * 1.1
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
