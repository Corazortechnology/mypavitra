import { PRODUCTS } from "@puja/catalog";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-brown mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Products", value: PRODUCTS.length, href: "/products" },
          { label: "Orders", value: "—", href: "/orders" },
          { label: "Active Campaigns", value: "1", href: "/campaigns" },
          { label: "Pending Reviews", value: "0", href: "/reviews" },
        ].map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="p-5 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-semibold text-brown mt-1">{stat.value}</p>
          </a>
        ))}
      </div>
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="font-semibold text-brown mb-2">Storefront Live</h2>
          <p className="text-sm text-gray-600 mb-4">
            Customer website at localhost:3000 with {PRODUCTS.length} products, full cart & checkout.
          </p>
          <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="text-sm text-saffron hover:underline">
            Open storefront →
          </a>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="font-semibold text-brown mb-2">Next: Connect Backend</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• PostgreSQL + Drizzle migrations</li>
            <li>• Razorpay payment keys</li>
            <li>• Shiprocket API integration</li>
            <li>• Product CRUD with image upload</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
