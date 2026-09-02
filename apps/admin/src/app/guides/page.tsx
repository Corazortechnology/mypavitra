import { GUIDES } from "@puja/catalog";

export default function AdminGuidesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-brown mb-6">Guides ({GUIDES.length})</h1>
      <div className="space-y-3">
        {GUIDES.map((g) => (
          <div key={g.slug} className="p-4 bg-white rounded-xl border border-gray-200 flex justify-between">
            <div>
              <h2 className="font-medium text-brown">{g.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{g.excerpt}</p>
            </div>
            <span className="text-xs text-gray-400 self-start">{g.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
