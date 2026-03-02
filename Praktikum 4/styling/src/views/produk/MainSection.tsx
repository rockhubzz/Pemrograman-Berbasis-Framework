import React from "react";

const sampleProducts = [
  { id: 1, name: "Tas Kulit", price: "Rp 250.000" },
  { id: 2, name: "Sepatu Olahraga", price: "Rp 350.000" },
  { id: 3, name: "Headphone", price: "Rp 420.000" },
];

const MainSection: React.FC = () => {
  return (
    <main style={{padding: '1rem'}}>
      <div style={{display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
        {sampleProducts.map(p => (
          <article key={p.id} style={{border: '1px solid rgba(15,23,42,0.06)', borderRadius: 8, padding: 12}}>
            <h3 style={{margin: '0 0 0.5rem 0'}}>{p.name}</h3>
            <p style={{color: '#6b7280', margin: 0}}>{p.price}</p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default MainSection;
