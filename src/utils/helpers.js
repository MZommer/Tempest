import { create, all } from 'mathjs'

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


export const getTotalAmount = (amount, ServingSize) => {
  const unit = math.unit(ServingSize);
  const total = math.multiply(unit, amount);
  return total.toString();
}