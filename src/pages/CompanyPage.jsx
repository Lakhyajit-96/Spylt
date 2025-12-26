import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import FooterSection from '../sections/FooterSection';

const CompanyPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".company-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".company-content", {
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
        ".company-sections",
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

        <div className="company-content opacity-0 translate-y-10 relative z-10 w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="company-title general-title text-dark-brown mb-8">
                OUR COMPANY
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  BUILT TO INSPIRE
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-3xl mx-auto md:text-lg leading-[115%]">
              From a simple idea to a revolutionary beverage brand, SPYLT represents the perfect fusion 
              of nutrition, energy, and taste. Discover our story, mission, and the people behind the magic.
            </p>
          </div>

          {/* Company Story */}
          <div className="space-y-12">
            <div className="company-sections opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Our Story</h3>
              <div className="grid md:grid-cols-2 gap-8 font-paragraph text-dark-brown">
                <div>
                  <p className="mb-4">
                    SPYLT was born from a simple frustration: why couldn't we find a drink that tasted amazing 
                    AND delivered the protein and energy we needed? In 2019, our founders set out to create 
                    the perfect beverage that would fuel both body and soul.
                  </p>
                  <p className="mb-4">
                    After countless hours of research, development, and taste testing, SPYLT emerged as the 
                    first beverage to successfully combine high-quality protein with natural caffeine in 
                    flavors that actually taste incredible.
                  </p>
                  <p>
                    Today, SPYLT is more than just a beverage company – we're a lifestyle brand that 
                    encourages people to embrace their inner kid while fueling their adult ambitions.
                  </p>
                </div>
                <div>
                  <img 
                    src="/images/hero-img.png" 
                    alt="SPYLT Story" 
                    className="w-full h-64 object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="company-sections opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Mission & Vision</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-2xl mb-4 text-dark-brown">Our Mission</h4>
                  <p className="font-paragraph text-dark-brown">
                    To create delicious, functional beverages that fuel people's passions and help them 
                    live life to the fullest. We believe nutrition shouldn't compromise on taste.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-2xl mb-4 text-dark-brown">Our Vision</h4>
                  <p className="font-paragraph text-dark-brown">
                    To become the world's most beloved functional beverage brand, inspiring a generation 
                    to embrace both their playful spirit and their ambitious goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="company-sections opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Our Values</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Quality First</h4>
                  <p className="font-paragraph text-dark-brown text-sm">
                    We never compromise on ingredients or taste. Every bottle meets our highest standards.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Fun & Playful</h4>
                  <p className="font-paragraph text-dark-brown text-sm">
                    Life's too short to be serious all the time. We embrace joy and playfulness in everything.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Sustainability</h4>
                  <p className="font-paragraph text-dark-brown text-sm">
                    We're committed to protecting the planet for future generations of SPYLT lovers.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16,4C18.209,4 20,5.791 20,8C20,10.209 18.209,12 16,12C13.791,12 12,10.209 12,8C12,5.791 13.791,4 16,4M16,14C18.7,14 24,15.35 24,18V20H8V18C8,15.35 13.3,14 16,14M8,4C10.209,4 12,5.791 12,8C12,8.81 11.707,9.548 11.22,10.142C10.537,10.693 9.849,11 9,11C6.791,11 5,9.209 5,7C5,4.791 6.791,3 9,3C9.849,3 10.537,3.307 11.22,3.858C11.707,4.452 12,5.19 12,6H10C10,5.448 9.552,5 9,5C7.895,5 7,5.895 7,7C7,8.105 7.895,9 9,9C9.552,9 10,8.552 10,8H12C12,9.209 10.209,11 8,11C5.791,11 4,9.209 4,7C4,4.791 5.791,3 8,3M8,13C10.7,13 16,14.35 16,17V19H0V17C0,14.35 5.3,13 8,13Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Community</h4>
                  <p className="font-paragraph text-dark-brown text-sm">
                    We believe in building genuine connections and supporting our community.
                  </p>
                </div>
              </div>
            </div>

            <div className="company-sections opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Leadership Team</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-mid-brown rounded-full mx-auto mb-4 flex items-center justify-center text-milk font-bold text-3xl">
                    AS
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-dark-brown">Alex Smith</h4>
                  <p className="font-paragraph text-mid-brown font-bold mb-3">CEO & Co-Founder</p>
                  <p className="font-paragraph text-dark-brown text-sm">
                    Former beverage industry executive with 15 years of experience. Passionate about 
                    creating products that make a difference in people's lives.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-mid-brown rounded-full mx-auto mb-4 flex items-center justify-center text-milk font-bold text-3xl">
                    MJ
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-dark-brown">Maria Johnson</h4>
                  <p className="font-paragraph text-mid-brown font-bold mb-3">CTO & Co-Founder</p>
                  <p className="font-paragraph text-dark-brown text-sm">
                    Food scientist and nutrition expert who developed SPYLT's unique formulation. 
                    PhD in Food Science from Stanford University.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-mid-brown rounded-full mx-auto mb-4 flex items-center justify-center text-milk font-bold text-3xl">
                    DL
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-dark-brown">David Lee</h4>
                  <p className="font-paragraph text-mid-brown font-bold mb-3">CMO</p>
                  <p className="font-paragraph text-dark-brown text-sm">
                    Creative marketing leader who built SPYLT's award-winning brand identity. 
                    Former VP of Marketing at major consumer brands.
                  </p>
                </div>
              </div>
            </div>

            <div className="company-sections opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">By the Numbers</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-mid-brown mb-2">2019</div>
                  <p className="font-paragraph text-dark-brown">Founded</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-mid-brown mb-2">50M+</div>
                  <p className="font-paragraph text-dark-brown">Bottles Sold</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-mid-brown mb-2">10,000+</div>
                  <p className="font-paragraph text-dark-brown">Retail Locations</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-mid-brown mb-2">95%</div>
                  <p className="font-paragraph text-dark-brown">Customer Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="company-sections opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Awards & Recognition</h3>
              <div className="grid md:grid-cols-2 gap-8 font-paragraph text-dark-brown">
                <div>
                  <h4 className="font-bold text-xl mb-4">Industry Awards</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C21.83,8 22.54,8.5 22.84,9.24C22.95,9.47 23,9.72 23,10V12L20.84,18.05C20.54,18.79 19.83,19.29 19,19.29H9.69L9,21Z"/>
                        </svg>
                      </div>
                      <span>2024 Beverage Innovation Award - Best New Product</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5,16L3,14L5,12L4,11L1,14L4,17L5,16M9,5V7H21V5H9M9,11V13H21V11H9M9,17V19H21V17H9Z"/>
                        </svg>
                      </div>
                      <span>2023 Taste Awards - Gold Medal Winner</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                        </svg>
                      </div>
                      <span>2023 Brand of the Year - Functional Beverages</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                        </svg>
                      </div>
                      <span>2022 Startup of the Year - Food & Beverage</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Media Recognition</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
                        </svg>
                      </div>
                      <span>Featured in Forbes "Brands to Watch 2024"</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                        </svg>
                      </div>
                      <span>Shark Tank Success Story - $2M Investment</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                        </svg>
                      </div>
                      <span>TikTok Viral Sensation - 100M+ Views</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-mid-brown rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                        </svg>
                      </div>
                      <span>Inc. Magazine "Fastest Growing Companies"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="company-sections opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Sustainability Commitment</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.82,15.42L19.32,16.61L19.92,19.24L17.88,18.78L16.3,20.75L15.09,18.26L12.89,19.87L12.89,17.05L10.89,15.66L13.41,15.66L14.5,13.12L15.91,15.27L18.15,14.63L17.73,17.1L19.68,18.05L18.68,19.06L21.82,15.42M17,8A5,5 0 0,1 12,13A5,5 0 0,1 7,8A5,5 0 0,1 12,3A5,5 0 0,1 17,8M12,2A6,6 0 0,0 6,8C6,10.22 7.09,12.16 8.68,13.58C4.42,15.84 2,20.55 2,22H4C4,19.24 6.76,17 10,17C10.64,17 11.27,17.1 11.88,17.28C11.93,16.87 12.05,16.47 12.23,16.1C11.5,16.03 10.76,16 10,16C8.64,16 7.35,16.42 6.26,17.1C5.67,16.04 6,14.62 6,13.5C6,11.57 7.57,10 9.5,10C10.45,10 11.32,10.43 11.93,11.12C12.5,10.25 13.21,9.5 14.07,8.93C13.12,6.73 11.47,5.5 9.5,5.5C7.57,5.5 6,7.07 6,9C6,9.34 6.04,9.67 6.1,10C4.56,10.58 3.5,12.06 3.5,13.8C3.5,16.14 5.36,18 7.7,18C8.54,18 9.32,17.75 9.96,17.32C10.65,18.04 11.5,18.64 12.44,19.05C11.76,19.36 11,19.5 10.2,19.5C7.79,19.5 5.8,17.51 5.8,15.1C5.8,13.8 6.4,12.63 7.35,11.85C6.55,10.95 6,9.8 6,8.5C6,5.46 8.46,3 11.5,3C14.54,3 17,5.46 17,8.5Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Eco-Friendly Packaging</h4>
                  <p className="font-paragraph text-dark-brown text-sm">
                    100% recyclable bottles made from 50% recycled materials. Working toward fully sustainable packaging by 2026.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Carbon Neutral</h4>
                  <p className="font-paragraph text-dark-brown text-sm">
                    Achieved carbon neutrality in 2023 through renewable energy and offset programs. Committed to net-zero by 2030.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16,4C18.209,4 20,5.791 20,8C20,10.209 18.209,12 16,12C13.791,12 12,10.209 12,8C12,5.791 13.791,4 16,4M16,14C18.7,14 24,15.35 24,18V20H8V18C8,15.35 13.3,14 16,14M8,4C10.209,4 12,5.791 12,8C12,8.81 11.707,9.548 11.22,10.142C10.537,10.693 9.849,11 9,11C6.791,11 5,9.209 5,7C5,4.791 6.791,3 9,3C9.849,3 10.537,3.307 11.22,3.858C11.707,4.452 12,5.19 12,6H10C10,5.448 9.552,5 9,5C7.895,5 7,5.895 7,7C7,8.105 7.895,9 9,9C9.552,9 10,8.552 10,8H12C12,9.209 10.209,11 8,11C5.791,11 4,9.209 4,7C4,4.791 5.791,3 8,3M8,13C10.7,13 16,14.35 16,17V19H0V17C0,14.35 5.3,13 8,13Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Community Impact</h4>
                  <p className="font-paragraph text-dark-brown text-sm">
                    1% of profits donated to youth sports and nutrition programs. Over $500K contributed to date.
                  </p>
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

export default CompanyPage;