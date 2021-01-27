export const pluralize = (n, { zero, one, few, many, radix, fewMax }) => {
  const order = n.toString().length; // порядок числа
  const mod = Math.abs(n) % radix;
  let pattern;
  if (order === 1) {
    // числа от 0 до 9 включительно
    if (n === 0) pattern = zero;
    else if (n === 1) pattern = one;
    else if (n > 1 && n <= fewMax) pattern = few;
    else pattern = many;
  } else if (order === 2) {
    // числа от 10 до 99 включительно
    const s = Math.floor(n / radix);
    if (s === 1) pattern = many;
    else if (s > 1) {
      if (mod === 0 || mod > fewMax) pattern = many;
      else if (mod > 1 && mod <= fewMax) pattern = few;
      else pattern = one;
    }
  } else {
    // числа от 100 и сколько душе угодно
    const stringNumber = n.toString();
    const newN = +stringNumber.slice(stringNumber.length - 2);
    const newS = Math.floor(newN / radix);
    const newMod = Math.abs(newN) % radix;
    if (newS === 1) pattern = many;
    else if (newS > 1) {
      if (newMod === 0 || newMod > fewMax) pattern = many;
      else if (newMod > 1 && newMod <= fewMax) pattern = few;
      else pattern = one;
    }
  }
  return pattern.replace('{}', n);
};
