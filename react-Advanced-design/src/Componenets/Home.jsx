
import React, { useRef } from "react";

import Hero from "./Hero";
import Navbar from "./Navbar";
import HeadlineCards from "./HeadlineCards";
import Offers from "./Offers";
import CoachesSection from "./CoachesSection";
import PromotionsSection from "./PromotionsSection";

const Home = () => {
    const heroRef = useRef(null);
    const headlineCardsRef = useRef(null);
    const offersRef = useRef(null);
    const coachesRef = useRef(null);
    const promotionsRef = useRef(null);
  return (
    <div>
       {/* Pass refs to Navbar */}
       <Navbar
        sections={{
          hero: heroRef,
          headlineCards: headlineCardsRef,
          offers: offersRef,
          coaches: coachesRef,
          promotions: promotionsRef,
        }}
      />
      <section ref={heroRef}>
        <Hero />
      </section>
      <section ref={headlineCardsRef}>
        <HeadlineCards />
      </section>
      <section ref={offersRef}>
        <Offers />
      </section>
      <section ref={coachesRef}>
        <CoachesSection />
      </section>
      <section ref={promotionsRef}>
        <PromotionsSection />
      </section>
    </div>
  )
}

export default Home
