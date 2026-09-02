import { BUNDLES } from "@puja/catalog";
import { formatPrice } from "@puja/config";

export default function AdminBundlesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-brown mb-6">Bundles ({BUNDLES.length})</h1>
      <div className="space-y-4">
        {BUNDLES.map((b) => {
          const pricing = b.prices.IN;
          return (
            <div key={b.slug} className="p-5 bg-white rounded-xl border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-brown">{b.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{b.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{b.itemSlugs.length} items · {b.slug}</p>
                </div>
                {pricing && (
                  <div className="text-right">
                    <p className="font-semibold text-brown">
                      {formatPrice(pricing.bundle, "INR")}
                    </p>
                    {pricing.individual > pricing.bundle && (
                      <p className="text-xs text-green-600">
                        Save {formatPrice(pricing.individual - pricing.bundle, "INR")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
