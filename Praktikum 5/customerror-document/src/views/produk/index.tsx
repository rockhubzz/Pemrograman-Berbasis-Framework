import React from "react";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";

const ProdukView: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <head>
        <title>Produk Kami</title>
      </head>
      <HeroSection />
      <MainSection />
    </div>
  );
};

export default ProdukView;
