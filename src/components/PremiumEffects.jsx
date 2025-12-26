import { useEffect, useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Magnetic Cursor Effect Component
export const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add magnetic effect to interactive elements
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      magneticElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: `scale(${isHovering ? 2 : 1})`,
        transition: 'transform 0.3s ease',
      }}
    >
      <div className="w-5 h-5 bg-mid-brown rounded-full opacity-80"></div>
    </div>
  );
};

// Floating Particles Component
export const FloatingParticles = () => {
  useGSAP(() => {
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(162, 104, 51, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      `;
      document.body.appendChild(particle);

      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100,
      });

      gsap.to(particle, {
        y: -100,
        x: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 5,
      });

      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, []);

  return null;
};

// 3D Tilt Effect Component
export const TiltCard = ({ children, className = "", intensity = 15 }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * intensity;
      const rotateY = (centerX - x) / centerX * intensity;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        transformPerspective: 1000,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div ref={cardRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
};

// Morphing Shape Component
export const MorphingShape = ({ className = "" }) => {
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(".morphing-path", {
      attr: { d: "M50,10 C80,10 90,40 90,50 C90,80 60,90 50,90 C20,90 10,60 10,50 C10,20 20,10 50,10 Z" },
      duration: 3,
      ease: "power2.inOut"
    })
    .to(".morphing-path", {
      attr: { d: "M50,5 C85,15 95,45 85,55 C75,85 45,95 50,85 C15,75 5,45 15,35 C25,5 45,5 50,5 Z" },
      duration: 3,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <svg className={`absolute opacity-10 ${className}`} viewBox="0 0 100 100">
      <path
        className="morphing-path"
        d="M50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 C20,30 30,20 50,20 Z"
        fill="currentColor"
      />
    </svg>
  );
};

// Text Scramble Effect Component
export const ScrambleText = ({ text, className = "", trigger = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("").map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className={className}>{displayText}</span>;
};

// Premium Loading Component
export const PremiumLoader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (isLoading) {
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(".loader-circle", {
        rotation: 360,
        duration: 2,
        ease: "none"
      })
      .to(".loader-logo", {
        scale: 1.1,
        duration: 1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, 0);

      // Simulate loading progress
      gsap.to({ value: 0 }, {
        value: 100,
        duration: 3,
        ease: "power2.out",
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].value));
        }
      });
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-milk z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="loader-circle w-20 h-20 border-4 border-light-brown border-t-mid-brown rounded-full mx-auto"></div>
          <img 
            src="/images/nav-logo.svg" 
            alt="SPYLT Logo" 
            className="loader-logo absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
          />
        </div>
        <p className="font-paragraph text-dark-brown mb-4">Loading Premium Experience...</p>
        <div className="text-mid-brown font-bold text-lg">{progress}%</div>
      </div>
    </div>
  );
};

// Parallax Background Component
export const ParallaxBackground = ({ children, speed = 0.5 }) => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * speed;
        parallaxRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={parallaxRef} className="will-change-transform">
      {children}
    </div>
  );
};

// Glitch Effect Component
export const GlitchText = ({ text, className = "", trigger = false }) => {
  const glitchRef = useRef(null);

  useGSAP(() => {
    if (trigger && glitchRef.current) {
      const tl = gsap.timeline();
      
      tl.to(glitchRef.current, {
        skewX: 70,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(glitchRef.current, {
        skewX: 0,
        scaleX: 1.3,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(glitchRef.current, {
        scaleX: 1,
        duration: 0.1,
        ease: "power2.inOut"
      });
    }
  }, [trigger]);

  return (
    <span ref={glitchRef} className={`inline-block ${className}`}>
      {text}
    </span>
  );
};

// Liquid Button Component
export const LiquidButton = ({ children, onClick, className = "" }) => {
  const buttonRef = useRef(null);

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleClick = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden transform-gpu ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-mid-brown to-light-brown opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
    </button>
  );
};

export default {
  MagneticCursor,
  FloatingParticles,
  TiltCard,
  MorphingShape,
  ScrambleText,
  PremiumLoader,
  ParallaxBackground,
  GlitchText,
  LiquidButton
};