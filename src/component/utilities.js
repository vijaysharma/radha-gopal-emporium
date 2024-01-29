export const calculateFinalPrice = ({ inputValues, clothes, priceContext }) => {
  const clothRatePerInch = parseInt(inputValues.clothRate) / (39 * 32);
  const LinenRatePerInch = parseInt(inputValues.linenRate) / (39 * 32);
  const area = clothes.reduce(
    (acc, cloth) => {
      return {
        clarea: acc.clarea + parseInt(cloth.length) * parseInt(cloth.width),
        lnarea: cloth.linenRequired
          ? acc.lnarea + parseInt(cloth.length) * parseInt(cloth.width)
          : acc.lnarea,
      };
    },
    { clarea: 0, lnarea: 0 }
  );
  let clothCost =
    area.clarea * clothRatePerInch + area.lnarea * LinenRatePerInch;

  // adding 10% wastage, stich, electricity, pouch
  clothCost = Math.ceil(1.1 * clothCost + 5);
  const labourCost = Math.max(
    parseInt(inputValues.labour),
    Math.ceil(
      area.clarea * clothRatePerInch * 1.5 +
        area.lnarea * LinenRatePerInch * 1.1
    )
  );
  const profit = Math.ceil(
    (parseInt(inputValues.profit) / 100) * (clothCost + labourCost)
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

export const inputValueSanitiser = (e) =>
  e.target.value ? parseFloat(e.target.value) : 0;
