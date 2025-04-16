import React from 'react';
import img3 from '../../public/img3.jpg';
import img2 from '../../public/img2.jpg';
import img4 from '../../public/img4.jpg';

const HeadlineCards = () => {
  const cards = [
    {
      id: 1,
      title: "TRANSFORM YOUR STRENGTH",
      subtitle: "Challenge Yourself Today",
      buttonText: "Start Training",
      image: img4,
      alt: "Strength Training",
      bgGradient: "from-red-500/20 to-black/70"
    },
    {
      id: 2,
      title: "JOIN OUR TRIBE",
      subtitle: "Together We Grow Stronger",
      buttonText: "Sign Up Now",
      image: img2,
      alt: "Community Workout",
      bgGradient: "from-blue-500/20 to-black/70"
    },
    {
      id: 3,
      title: "FUEL YOUR FIRE",
      subtitle: "Discover Nutrition Secrets",
      buttonText: "Learn More",
      image: img3,
      alt: "Healthy Nutrition",
      bgGradient: "from-amber-500/20 to-black/70"
    }
  ];

  return (
    <div className='max-w-screen-2xl mx-auto px-4 py-12 md:py-16 lg:py-20'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10'>
        {cards.map((card) => (
          <div 
            key={card.id} 
            className='group relative h-80 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500'
          >
            {/* Image with parallax effect */}
            <img
              className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out'
              src={card.image}
              alt={card.alt}
            />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${card.bgGradient}`}></div>
            
            {/* Content */}
            <div className='absolute inset-0 flex flex-col justify-end p-8 text-white'>
              {/* Title with cool text effect */}
              <h3 className='text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight uppercase'>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300'>
                  {card.title}
                </span>
              </h3>
              
              {/* Subtitle with animation */}
              <p className='text-lg lg:text-xl mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100'>
                {card.subtitle}
              </p>
              
              {/* Animated button */}
              <button className='
                self-start px-8 py-3 bg-white text-black font-bold rounded-full 
                hover:bg-gray-100 transform hover:scale-105 
                transition-all duration-300 shadow-lg
                opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0
                delay-200
              '>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700'>
                  {card.buttonText}
                </span>
                <span className='ml-2'>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadlineCards;