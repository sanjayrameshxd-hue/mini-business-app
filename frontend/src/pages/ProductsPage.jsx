import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const products = [
  {
    id: 1,
    sku: "P001",
    name: "Notebook",
    price: 50,
    stockQty: 100,
  },
  {
    id: 2,
    sku: "P002",
    name: "Pen",
    price: 10,
    stockQty: 500,
  },
  {
    id: 3,
    sku: "P003",
    name: "Marker",
    price: 25,
    stockQty: 40,
  },
];

function ProductsPage() {
  return (
    <div className="mt-10">
      {/* Heading Section */}
      <div className="mb-6">
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              color: "#000000",
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Products
          </h2>

          <p className="text-slate-500">
            Manage your inventory and products
          </p>
        </div>

        {/* Button aligned right */}
        <div className="mt-4 flex justify-end">
          <Button>Add Product</Button>
        </div>
      </div>

      {/* Table Card */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-500">
                <th className="pb-4 font-semibold">
                  SKU
                </th>

                <th className="pb-4 font-semibold">
                  Name
                </th>

                <th className="pb-4 font-semibold">
                  Price
                </th>

                <th className="pb-4 font-semibold">
                  Stock
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="py-4 font-semibold text-slate-900">
                    {product.sku}
                  </td>

                  <td className="py-4 text-slate-700">
                    {product.name}
                  </td>

                  <td className="py-4 text-slate-700">
                    ₹{product.price}
                  </td>

                  <td className="py-4 text-slate-700">
                    {product.stockQty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default ProductsPage;