import NavBar from "../components/NavBar";
import HeroSection from "../sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "../sections/MessageSection";
import FlavorSection from "../sections/FlavorSection";
import { useGSAP } from "@gsap/react";
import NutritionSection from "../sections/NutritionSection";
import BenefitSection from "../sections/BenefitSection";
import TestimonialSection from "../sections/TestimonialSection";
import FooterSection from "../sections/FooterSection";
import { MagneticCursor, FloatingParticles, PremiumLoader } from "../components/PremiumEffects";
import ScrollProgress from "../components/ScrollProgress";
import { useState, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for premium experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!isLoading) {
      ScrollSmoother.create({
        smooth: 3,
        effects: true,
      });

      // Add magnetic class to interactive elements
      const interactiveElements = document.querySelectorAll('button, .hero-button, .social-btn, [role="button"]');
      interactiveElements.forEach(el => {
        el.classList.add('magnetic');
      });
    }
  }, [isLoading]);

  return (
    <>
      <PremiumLoader isLoading={isLoading} />
      {!isLoading && (
        <main>
          <ScrollProgress />
          <MagneticCursor />
          <FloatingParticles />
          <NavBar />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <HeroSection />
              <MessageSection />
              <FlavorSection />
              <NutritionSection />

              <div>
                <BenefitSection />
                <TestimonialSection />
              </div>

              <FooterSection />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default HomePage;