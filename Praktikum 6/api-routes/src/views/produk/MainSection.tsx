import React from "react";

const sampleProducts = [
  { id: 1, name: "Tas Kulit", price: "Rp 250.000", img: "/produk/tas-kulit.png" },
  { id: 2, name: "Sepatu Olahraga", price: "Rp 350.000", img: "/produk/sepatu-olahraga.png" },
  { id: 3, name: "Headphone", price: "Rp 420.000", img: "/produk/headphone.png" },
];

const MainSection: React.FC = () => {
  return (
    <main className="px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sampleProducts.map(p => (
          <article key={p.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <img src={p.img} alt={p.name} className="w-full h-30 object-cover rounded-md mb-2" />
            <h3 className="font-semibold text-gray-900 mb-2">{p.name}</h3>
            <p className="text-gray-600 text-sm">{p.price}</p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default MainSection;
