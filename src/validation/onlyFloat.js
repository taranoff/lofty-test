export const onlyFloat = v =>
  /^[0-9]*(\.[0-9]+)?$/.test(v) || "Только вещественные числа";
