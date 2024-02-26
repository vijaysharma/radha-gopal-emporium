const parseFloatInput = (inputValue) => parseFloat(inputValue ? inputValue : 0);

export const calculateFinalPrice = ({
  inputValues,
  clothes,
  setFinalPrice,
}) => {
  const clothCost = clothes.reduce((acc, cloth) => {
    let clothRatePerInch = parseFloatInput(cloth.clothRate) / (39 * 32);
    let LiningRatePerInch = parseFloatInput(cloth.liningRate) / (39 * 32);
    let LaceRatePerInch = parseFloatInput(cloth.laceRate) / 39;
    let l = Math.max(
      parseFloatInput(cloth.length),
      parseFloatInput(cloth.width)
    );
    let w = Math.min(
      parseFloatInput(cloth.length),
      parseFloatInput(cloth.width)
    );
    // adding 10% wastage, stich, electricity, pouch
    return Math.ceil(
      acc +
        1.1 *
          (l * w * clothRatePerInch +
            (cloth.liningRequired ? l * w * LiningRatePerInch : 0) +
            (cloth.laceRequired ? (l + w + w) * LaceRatePerInch : 0))
    );
  }, 5);
  const labourCost = Math.max(
    parseFloatInput(inputValues.labour),
    Math.ceil(clothCost * 1.4)
  );
  const profit = Math.ceil(
    (parseFloatInput(inputValues.profit) / 100) * (clothCost + labourCost)
  );
  const finalPrice = clothCost + labourCost + profit;
  setFinalPrice({
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
