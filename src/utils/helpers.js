import { create, all, prod } from 'mathjs'

const math = create(all, {});

export const formatPrice = (number) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);

  if (type === 'colors') {
    unique = unique.flat();
  }
  return ['all', ...new Set(unique)];
};


export const getTotalAmount = (amount, NetWeight) => {
  const unit = math.unit(NetWeight);
  const total = math.multiply(unit, amount);
  total.value = math.round(total.value, 2)
  return total.toString();
}

export const getTotalNutrients = products => {
  const nutrients = {}
  for (const product of products) {
    const multiplier = math.divide(math.multiply(math.unit(product.NutritionalTable.NetWeight), product.amount), math.unit("100g"));
    for (const [key, value] of Object.entries(product.NutritionalTable)) {
      if (value.endsWith("kcal"))
        continue
      const actualValue = nutrients[key];
      const unit = math.unit(value)
      if (actualValue)
        nutrients[key] = math.sum(math.multiply(unit, multiplier), actualValue)
      else
        nutrients[key] = math.multiply(unit, multiplier)      
    }
  }
  for (const [key, value] of Object.entries(nutrients)){
    console.log(value.value, math.round(value.value, 5))
    value.value = math.round(value.value, 3)
    nutrients[key] = value.toString()
  }
  return nutrients;
}