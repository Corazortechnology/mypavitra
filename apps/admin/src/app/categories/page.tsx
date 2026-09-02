import { CATEGORIES } from "@puja/catalog";

export default function AdminCategoriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-brown mb-6">Categories ({CATEGORIES.length})</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <div key={cat.slug} className="p-5 bg-white rounded-xl border border-gray-200">
            <h2 className="font-semibold text-brown">{cat.name}</h2>
            <p className="text-xs text-gray-500 mt-1">/{cat.slug}</p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{cat.description}</p>
            <p className="text-xs text-saffron mt-3">{cat.productSlugs.length} products</p>
          </div>
        ))}
      </div>
    </div>
  );
}
