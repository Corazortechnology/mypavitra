import { PRODUCTS } from "@puja/catalog";
import { formatPrice } from "@puja/config";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-brown">Products ({PRODUCTS.length})</h1>
        <button
          type="button"
          className="px-4 py-2 bg-saffron text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed"
          title="Connect PostgreSQL to enable create/edit"
        >
          + Add Product
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 font-medium text-gray-600">Product</th>
              <th className="text-left p-3 font-medium text-gray-600">SKU</th>
              <th className="text-left p-3 font-medium text-gray-600">Category</th>
              <th className="text-left p-3 font-medium text-gray-600">Price (IN)</th>
              <th className="text-left p-3 font-medium text-gray-600">Stock</th>
              <th className="text-left p-3 font-medium text-gray-600">Tradition</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: p.imageColor }}
                    >
                      {p.imageEmoji}
                    </span>
                    <div>
                      <p className="font-medium text-brown">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-gray-600">{p.sku}</td>
                <td className="p-3 text-gray-600">{p.categorySlugs[0]}</td>
                <td className="p-3 font-medium">
                  {p.prices.IN ? formatPrice(p.prices.IN.selling, "INR") : "—"}
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.inStock ? "In stock" : "Out"}
                  </span>
                </td>
                <td className="p-3 capitalize text-gray-600">{p.tradition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
