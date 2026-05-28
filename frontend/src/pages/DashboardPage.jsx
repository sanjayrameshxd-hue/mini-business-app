import Card from "../components/ui/Card";
import {
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";

const summary = [
  {
    label: "Products",
    value: 3,
    icon: Package,
  },
  {
    label: "Customers",
    value: 0,
    icon: Users,
  },
  {
    label: "Sales Orders",
    value: 0,
    icon: ShoppingCart,
  },
];

function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h2
        style={{
          color: "#000000",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Dashboard
      </h2>

        <p className="text-slate-500">
          Overview of your business performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>

                  <h3 className="mt-2 text-4xl font-bold text-slate-900">
                    {item.value}
                  </h3>
                </div>

                <div className="rounded-2xl bg-green-100 p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardPage;