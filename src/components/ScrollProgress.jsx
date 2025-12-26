import { useEffect, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  useGSAP(() => {
    gsap.to('.scroll-progress-bar', {
      scaleX: scrollProgress / 100,
      duration: 0.1,
      ease: "none"
    });
  }, [scrollProgress]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <div 
        className="scroll-progress-bar h-full bg-gradient-to-r from-mid-brown to-light-brown origin-left"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
};

export default ScrollProgress;