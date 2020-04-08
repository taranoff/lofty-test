export function createProduct({
  artnumber = 0,
  name = "",
  brand = "",
  weight = 0,
  quantity = 0,
  price = 0,
  stock = 0
}) {
  return {
    artnumber: +artnumber,
    name,
    brand,
    weight: +weight,
    quantity: +quantity,
    price: +price,
    stock: +stock
  };
}
