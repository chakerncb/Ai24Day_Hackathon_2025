import React, { useState } from "react";
import { offers } from "../data/data.js"; // Keep your path

const Offers = () => {
  const [currentOffers, setCurrentOffers] = useState(offers);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDiscount, setActiveDiscount] = useState("all");

  // Helper to convert discount string to number (e.g., "25%" => 25)
  const parseDiscount = (str) => parseInt(str.replace("%", ""), 10);

  // Apply both filters
  const applyFilters = (category, discount) => {
    let filtered = offers;

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (discount !== "all") {
      filtered = filtered.filter((item) => {
        const disc = parseDiscount(item.discount);

        if (discount === "10%") return disc >= 10 && disc < 20;
        if (discount === "20%") return disc >= 20 && disc < 30;
        if (discount === "30%") return disc >= 30 && disc < 40;
        if (discount === "40%+") return disc >= 40;

        return true;
      });
    }

    setCurrentOffers(filtered);
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    applyFilters(category, activeDiscount);
  };

  const filterByDiscount = (discount) => {
    setActiveDiscount(discount);
    applyFilters(activeCategory, discount);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Exclusive Offers
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
        {/* Filter by Category */}
        <div className="space-y-2">
          <p className="font-bold text-gray-700">Offer Type</p>
          <div className="flex flex-wrap gap-2">
            {["all", "membership", "package", "seasonal", "referral"].map((cat) => (
              <button
                key={cat}
                onClick={() => filterByCategory(cat)}
                className={`px-4 py-2 rounded-full capitalize transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Discount */}
        <div className="space-y-2">
          <p className="font-bold text-gray-700">Discount Level</p>
          <div className="flex flex-wrap gap-2">
            {["all", "10%", "20%", "30%", "40%+"].map((level) => (
              <button
                key={level}
                onClick={() => filterByDiscount(level)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeDiscount === level
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-amber-300"
                }`}
              >
                {level === "all" ? "All Discounts" : `${level} OFF`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                src={offer.image}
                alt={offer.name}
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                {offer.discount} OFF
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{offer.name}</h3>
                <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {offer.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{offer.description}</p>

              <div className="flex justify-between items-center">
                <div>
                  {offer.originalPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ${offer.originalPrice}
                    </p>
                  )}
                  <p className="text-xl font-bold text-gray-900">
                    ${offer.price}
                  </p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                  Claim Offer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;







