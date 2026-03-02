import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 px-4 text-center bg-gradient-to-b from-blue-50 to-indigo-50">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Produk Kami</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">Temukan produk terbaik untuk kebutuhanmu.</p>
    </section>
  );
};

export default HeroSection;
