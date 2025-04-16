import React from "react";

const PromotionsSection = () => {
  const promotions = [
    {
      id: 1,
      title: "New Member Special",
      description: "Get 50% off your first 3 months of membership when you sign up today!",
      discount: "50% OFF",
      duration: "First 3 months",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tag: "POPULAR"
    },
    {
      id: 2,
      title: "Personal Training Package",
      description: "Buy 10 sessions, get 2 free with our certified coaches!",
      discount: "2 FREE",
      duration: "Limited time",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tag: "BEST VALUE"
    },
    {
      id: 3,
      title: "Summer Body Challenge",
      description: "Join our 8-week challenge and get a free nutrition plan!",
      discount: "FREE PLAN",
      duration: "8 weeks",
      image: "https://images.unsplash.com/photo-1571019614242-c95595925d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tag: "NEW"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Current <span className="text-blue-600">Promotions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these limited-time offers to boost your fitness journey!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div 
              key={promo.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Promo Tag */}
              {promo.tag && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  {promo.tag}
                </div>
              )}
              
              {/* Promo Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={promo.image} 
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Promo Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{promo.title}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {promo.discount}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{promo.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {promo.duration}
                  </span>
                  
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-medium text-sm">
                    Claim Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-semibold transition-colors duration-300">
            View All Promotions
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;