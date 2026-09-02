import { FESTIVALS } from "@puja/catalog";

export default function AdminFestivalsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-brown mb-6">Festivals ({FESTIVALS.length})</h1>
      <div className="space-y-4">
        {FESTIVALS.map((f) => (
          <div key={f.slug} className="p-5 bg-white rounded-xl border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-brown">{f.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{f.description}</p>
                <p className="text-xs text-gray-400 mt-2 capitalize">{f.tradition} tradition</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-gray-600">{f.startDate} → {f.endDate}</p>
                <p className="text-xs text-saffron mt-1">{f.bundleSlugs.length} bundles</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
