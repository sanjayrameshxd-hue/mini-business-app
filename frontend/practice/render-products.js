const products = [
  { id: 1, sku: "P001", name: "Notebook", price: 50, stockQty: 100 },
  { id: 2, sku: "P002", name: "Pen", price: 10, stockQty: 500 },
  { id: 3, sku: "P003", name: "Marker", price: 30, stockQty: 20 }
];
function formatProductLabel(product) {
  return `${product.sku} - ${product.name}`;
}
//console.log(formatProductLabel(products[0]));

function prepareProductTableRows(products) {
  return products.map(product => {
    return {
      id: product.id,
      label: formatProductLabel(product),
      priceText: `₹${product.price}`,
      stockText: `${product.stockQty} units`,
      stockStatus: product.stockQty < 50 ? "Low Stock" : "Available"
    };
  });
}

console.log(prepareProductTableRows(products));