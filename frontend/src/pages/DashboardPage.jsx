import Card from "../components/ui/Card";
import {
  Package,
  Users,
  ShoppingCart
} from "lucide-react";

const stats = [
  {
    label: "Products",
    value: 3,
    subtitle: "Total products",
    icon: <Package size={38} />
  },
  {
    label: "Customers",
    value: 0,
    subtitle: "Total customers",
    icon: <Users size={38} />
  },
  {
    label: "Sales Orders",
    value: 0,
    subtitle: "Total orders",
    icon: <ShoppingCart size={38} />
  }
];

function DashboardPage() {
  return (
    <div className="relative">
      {/* Decorative background circles */}
      <div className="absolute left-[-200px] top-[-100px] h-[350px] w-[350px] rounded-full bg-green-100 opacity-40"></div>

      <div className="absolute bottom-[-150px] right-[-200px] h-[350px] w-[350px] rounded-full bg-green-100 opacity-40"></div>

      {/* Heading */}
      <div className="mb-16 text-center">
        <h2 
          style={{
            color: "#000000",
            fontSize: "32px",
            fontWeight: "bold",
            }}
          >
            Dashboard
        </h2>

        <div className="mx-auto mt-3 h-2 w-20 rounded-full bg-green-300"></div>

        <p className="mt-6 text-2xl text-slate-500">
          Overview of your business
          performance
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.label}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-700">
                {item.icon}
              </div>

              <h3 className="text-3xl font-semibold text-slate-700">
                {item.label}
              </h3>

              <p className="mt-4 text-6xl font-bold text-green-800">
                {item.value}
              </p>

              <div className="mt-8 w-full rounded-xl bg-green-50 py-4 text-lg text-green-700">
                {item.subtitle}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;