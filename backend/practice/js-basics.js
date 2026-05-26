const products = [
  { id: 1, sku: "P001", name: "Notebook", price: 50, stockQty: 100 },
  { id: 2, sku: "P002", name: "Pen", price: 10, stockQty: 500 },
  { id: 3, sku: "P003", name: "Marker", price: 30, stockQty: 20 }
];
function findProductBySku(products, sku) {
  return products.find(product => product.sku === sku);
}

//console.log(products.find);

//console.log(findProductBySku(products, "P002"));


function calculateStockValue(products) {
  return products.reduce((total, product) => {
    return total + (product.price * product.stockQty);
  }, 0);
}

//console.log(calculateStockValue(products));

function getLowStockProducts(products, threshold) {
  return products.filter(product => product.stockQty < threshold);
}

//console.log(getLowStockProducts(products, 500));

function validateProduct(product) {
  return (
    typeof product.id === "number" &&
    typeof product.sku === "string" &&
    typeof product.name === "string" &&
    typeof product.price === "number" &&
    typeof product.stockQty === "number"
  );
}

const newProduct = {
  id: 4,
  sku: "P004",
  name: "Pencil",
  price: 5,
  stockQty: 100
};

//console.log(validateProduct(newProduct));

function validateProduct1(product) {
  if (!product.sku) {
    return "SKU is required";
  }

  if (!product.name) {
    return "Name is required";
  }

  if (product.price <= 0) {
    return "Price must be greater than zero";
  }

  if (product.stockQty < 0) {
    return "Stock quantity cannot be negative";
  }

  return "Product is valid";
}

//console.log(validateProduct1(newProduct));

function calculateLineTotal(quantity, rate) {
  return quantity * rate;
}

console.log(calculateLineTotal(5, 50));

function calculateOrderTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.quantity * item.rate);
  }, 0);
}

const orderItems = [
  { productId: 1, quantity: 2, rate: 50 },
  { productId: 2, quantity: 5, rate: 10 }
];

console.log("Order total:", calculateOrderTotal(orderItems));