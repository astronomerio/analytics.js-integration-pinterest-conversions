/**
 * Take a product conforming to the Segment ecommerce spec
 * and map it to a product in the format pinterest expects.
 *
 * @param {Obj} product
 */

module.exports = function (product) {
    console.log(product);
  const mappedProduct = {};

  mappedProduct.product_id =  product.product_id;
  mappedProduct.product_name = product.name;
  mappedProduct.product_price = product.price;
  mappedProduct.product_quantity = product.quantity;
  mappedProduct.product_category = product.category;
  return mappedProduct;





};
