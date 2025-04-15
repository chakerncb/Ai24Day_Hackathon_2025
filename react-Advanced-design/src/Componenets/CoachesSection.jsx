import React from "react";

const CoachesSection = () => {
  const coaches = [
    {
      id: 1,
      name: "Michael Johnson",
      gender: "male",
      specialty: "Strength Training",
      experience: "10 years",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Certified strength coach with a passion for powerlifting and functional training."
    },
    {
      id: 2,
      name: "David Chen",
      gender: "male",
      specialty: "Olympic Weightlifting",
      experience: "8 years",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      bio: "Former competitive weightlifter now helping athletes reach their peak performance."
    },
    {
      id: 3,
      name: "Sarah Williams",
      gender: "female",
      specialty: "Yoga & Mobility",
      experience: "7 years",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Combines traditional yoga with modern mobility techniques for optimal movement."
    },
    {
      id: 4,
      name: "Robert Garcia",
      gender: "male",
      specialty: "Bodybuilding",
      experience: "12 years",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "IFBB Pro coach specializing in physique development and competition prep."
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      gender: "female",
      specialty: "HIIT & Conditioning",
      experience: "5 years",
      image: "https://randomuser.me/api/portraits/women/41.jpg",
      bio: "Creates high-energy workouts that maximize fat loss and cardiovascular health."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Meet Our <span className="text-blue-600">Expert Coaches</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our certified professionals will guide you through every step of your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {coaches.map((coach) => (
            <div 
              key={coach.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img 
                  src={coach.image} 
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                  <p className="text-blue-300 font-medium">{coach.specialty}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${coach.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`}></span>
                  <span className="text-sm text-gray-500">{coach.gender === 'male' ? 'Male Coach' : 'Female Coach'}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-gray-500">{coach.experience}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{coach.bio}</p>
                
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-medium">
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-semibold transition-colors duration-300">
            View All Coaches
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;