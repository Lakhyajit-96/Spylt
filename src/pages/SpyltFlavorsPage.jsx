import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import { flavorlists } from '../constants';
import FooterSection from '../sections/FooterSection';

const SpyltFlavorsPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".flavors-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".flavors-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        ".flavor-cards",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.3"
      );
  });

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-milk">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 z-50 md:p-9 p-3">
        <img 
          src="/images/nav-logo.svg" 
          alt="nav-logo" 
          className="md:w-24 w-20 cursor-pointer hover:scale-105 transition-transform" 
          onClick={handleBackToHome}
        />
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {isMobile ? (
          <img
            src="/images/hero-bg.png"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
        ) : (
          <video
            src="/videos/hero-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
        )}

        <div className="flavors-content opacity-0 translate-y-10 relative z-10 w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="flavors-title general-title text-dark-brown mb-8">
                SPYLT FLAVORS
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  TASTE THE DIFFERENCE
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-3xl mx-auto md:text-lg leading-[115%]">
              Discover our incredible range of protein-packed, caffeine-infused beverages. 
              Each flavor is carefully crafted to deliver the perfect balance of taste, nutrition, and energy.
            </p>
          </div>

          {/* Flavor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {flavorlists.map((flavor, index) => (
              <div 
                key={index}
                className="flavor-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk hover:scale-105 transition-transform duration-300"
              >
                <div className="relative mb-6 group overflow-hidden rounded-2xl">
                  <img
                    src={`/images/${flavor.color}-drink.webp`}
                    alt={flavor.name}
                    className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  />
                  <img
                    src={`/images/${flavor.color}-elements.webp`}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-dark-brown font-bold text-2xl mb-4 text-center">
                  {flavor.name}
                </h3>
                <div className="space-y-3 font-paragraph text-dark-brown">
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span className="font-bold">25g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Caffeine:</span>
                    <span className="font-bold">150mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calories:</span>
                    <span className="font-bold">180</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sugar:</span>
                    <span className="font-bold">8g</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button className="bg-light-brown text-dark-brown font-bold py-3 px-8 rounded-full border-[.2vw] border-milk hover:bg-mid-brown hover:text-milk transition-all duration-300">
                    Try This Flavor
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Flavor Details */}
          <div className="space-y-12">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">What Makes Our Flavors Special?</h3>
              <div className="grid md:grid-cols-2 gap-8 font-paragraph text-dark-brown">
                <div>
                  <h4 className="font-bold text-xl mb-4">Premium Ingredients</h4>
                  <p className="mb-4">We source only the finest ingredients from trusted suppliers worldwide. Our protein comes from grass-fed whey, and our natural flavors are extracted using advanced techniques to preserve their authentic taste.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Grass-fed whey protein isolate</li>
                    <li>Natural caffeine from green coffee beans</li>
                    <li>Real fruit extracts and natural flavors</li>
                    <li>No artificial colors or preservatives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Perfect Balance</h4>
                  <p className="mb-4">Each SPYLT flavor is meticulously crafted to deliver the perfect balance of taste, nutrition, and energy. Our team of flavor scientists work tirelessly to ensure every sip is as delicious as the last.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Smooth, creamy texture</li>
                    <li>Optimal protein-to-caffeine ratio</li>
                    <li>Long-lasting energy without crashes</li>
                    <li>Satisfying taste that curbs cravings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Flavor Profiles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 font-paragraph text-dark-brown">
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3">Chocolate Milk</h4>
                  <p>Rich, velvety chocolate with hints of vanilla. Our signature flavor that started it all.</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3">Strawberry Milk</h4>
                  <p>Fresh strawberry sweetness with a creamy finish. Like summer in a bottle.</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3">Cookies & Cream</h4>
                  <p>Crushed cookie pieces blended with smooth vanilla cream. Pure indulgence.</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3">Peanut Butter Chocolate</h4>
                  <p>Creamy peanut butter meets rich chocolate. A match made in heaven.</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3">Vanilla Milkshake</h4>
                  <p>Classic vanilla with a modern twist. Smooth, sweet, and satisfying.</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3">Max Chocolate Milk</h4>
                  <p>Double the chocolate intensity. For serious chocolate lovers only.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Limited Edition Flavors</h3>
              <p className="font-paragraph text-dark-brown text-center mb-6">
                Keep an eye out for our seasonal and limited edition flavors! We're always experimenting with new taste combinations.
              </p>
              <div className="grid md:grid-cols-3 gap-6 font-paragraph text-dark-brown text-center">
                <div>
                  <h4 className="font-bold text-xl mb-3">Pumpkin Spice (Fall)</h4>
                  <p>Warm spices meet creamy pumpkin flavor</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-3">Peppermint Mocha (Winter)</h4>
                  <p>Cool mint with rich coffee and chocolate</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-3">Tropical Mango (Summer)</h4>
                  <p>Exotic mango with a hint of coconut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default SpyltFlavorsPage;