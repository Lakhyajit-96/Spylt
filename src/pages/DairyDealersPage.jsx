import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FooterSection from '../sections/FooterSection';

const DairyDealersPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [dealerData, setDealerData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    experience: '',
    volume: ''
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".dealer-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".dealer-content", {
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
        ".dealer-cards",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDealerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    console.log('Dairy Dealer Application:', dealerData);
    alert('Application submitted! Our wholesale team will contact you within 2 business days.');
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

        <div className="dealer-content opacity-0 translate-y-10 relative z-10 w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="dealer-title general-title text-dark-brown mb-8">
                DAIRY DEALERS
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  WHOLESALE PARTNERS
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-3xl mx-auto md:text-lg leading-[115%]">
              Join the SPYLT wholesale network and bring the most exciting beverage brand to your customers. 
              Competitive margins, marketing support, and premium products that sell themselves.
            </p>
          </div>

          {/* Partnership Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="dealer-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">High Margins</h3>
              <p className="font-paragraph text-dark-brown text-sm">Competitive wholesale pricing with excellent profit potential</p>
            </div>

            <div className="dealer-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4M10,6L14,10L10,14V11H4V9H10M17,9.5H19.5L21.47,12H17M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">Fast Delivery</h3>
              <p className="font-paragraph text-dark-brown text-sm">Reliable supply chain with quick turnaround times</p>
            </div>

            <div className="dealer-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V10.5C3.59,10.5 4.09,10.81 4.38,11.31C4.59,11.71 4.59,12.29 4.38,12.69C4.09,13.19 3.59,13.5 3,13.5V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5C16.41,13.5 15.91,13.19 15.62,12.69C15.41,12.29 15.41,11.71 15.62,11.31C15.91,10.81 16.41,10.5 17,10.5M21,9V15A2,2 0 0,1 19,17H18V19A1,1 0 0,1 17,20H15A1,1 0 0,1 14,19V17H10V19A1,1 0 0,1 9,20H7A1,1 0 0,1 6,19V17H5A2,2 0 0,1 3,15V9A2,2 0 0,1 5,7H6V5A1,1 0 0,1 7,4H9A1,1 0 0,1 10,5V7H14V5A1,1 0 0,1 15,4H17A1,1 0 0,1 18,5V7H19A2,2 0 0,1 21,9Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">Marketing Support</h3>
              <p className="font-paragraph text-dark-brown text-sm">POS materials, digital assets, and promotional campaigns</p>
            </div>

            <div className="dealer-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5,16L3,5H1V3H4L6,14H18.5L19.5,12H6.5L7.2,9H21L19,17H5M6,20A2,2 0 0,0 8,22A2,2 0 0,0 10,20A2,2 0 0,0 8,18A2,2 0 0,0 6,20M16,20A2,2 0 0,0 18,22A2,2 0 0,0 20,20A2,2 0 0,0 18,18A2,2 0 0,0 16,20Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">Premium Brand</h3>
              <p className="font-paragraph text-dark-brown text-sm">Award-winning products that customers love</p>
            </div>
          </div>

          {/* Program Details */}
          <div className="space-y-12">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Why Partner with SPYLT?</h3>
              <div className="grid md:grid-cols-2 gap-8 font-paragraph text-dark-brown">
                <div>
                  <h4 className="font-bold text-xl mb-4">Growing Market</h4>
                  <p className="mb-4">The functional beverage market is exploding, with protein drinks and energy beverages leading the growth. SPYLT combines both categories into one premium product.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>$18.6B functional beverage market</li>
                    <li>15% annual growth rate</li>
                    <li>High consumer demand for protein + caffeine</li>
                    <li>Premium positioning with mass appeal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Proven Success</h4>
                  <p className="mb-4">Our retail partners consistently report strong sales performance and customer satisfaction. SPYLT products have high velocity and repeat purchase rates.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>95% customer satisfaction rate</li>
                    <li>High inventory turnover</li>
                    <li>Strong brand recognition</li>
                    <li>Loyal customer base</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Partnership Tiers</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-milk rounded-2xl border-[.2vw] border-light-brown">
                  <h4 className="font-bold text-xl mb-4 text-dark-brown">STARTER</h4>
                  <div className="text-2xl font-bold text-mid-brown mb-4">$2,500</div>
                  <p className="font-paragraph text-dark-brown text-sm mb-4">Minimum monthly order</p>
                  <ul className="font-paragraph text-dark-brown text-sm space-y-2">
                    <li>✓ 35% wholesale margin</li>
                    <li>✓ Basic marketing materials</li>
                    <li>✓ Standard delivery terms</li>
                    <li>✓ Email support</li>
                  </ul>
                </div>

                <div className="text-center p-6 bg-mid-brown rounded-2xl border-[.2vw] border-milk transform scale-105">
                  <h4 className="font-bold text-xl mb-4 text-milk">PREMIUM</h4>
                  <div className="text-2xl font-bold text-light-brown mb-4">$7,500</div>
                  <p className="font-paragraph text-milk text-sm mb-4">Minimum monthly order</p>
                  <ul className="font-paragraph text-milk text-sm space-y-2">
                    <li>✓ 40% wholesale margin</li>
                    <li>✓ Full marketing support</li>
                    <li>✓ Priority delivery</li>
                    <li>✓ Dedicated account manager</li>
                    <li>✓ Exclusive promotions</li>
                  </ul>
                </div>

                <div className="text-center p-6 bg-milk rounded-2xl border-[.2vw] border-light-brown">
                  <h4 className="font-bold text-xl mb-4 text-dark-brown">ELITE</h4>
                  <div className="text-2xl font-bold text-mid-brown mb-4">$15,000</div>
                  <p className="font-paragraph text-dark-brown text-sm mb-4">Minimum monthly order</p>
                  <ul className="font-paragraph text-dark-brown text-sm space-y-2">
                    <li>✓ 45% wholesale margin</li>
                    <li>✓ Custom marketing campaigns</li>
                    <li>✓ Same-day delivery available</li>
                    <li>✓ Executive account support</li>
                    <li>✓ Territory exclusivity options</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Success Stories</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-mid-brown rounded-full mx-auto mb-4 flex items-center justify-center text-milk font-bold text-2xl">
                    SM
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">SuperMart Chain</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-2">150 locations nationwide</p>
                  <p className="font-paragraph text-dark-brown">"SPYLT is our fastest-growing beverage brand. Customers can't get enough!"</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-mid-brown rounded-full mx-auto mb-4 flex items-center justify-center text-milk font-bold text-2xl">
                    FG
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">FreshGrocer Co.</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-2">Regional grocery chain</p>
                  <p className="font-paragraph text-dark-brown">"The profit margins and customer demand make SPYLT a no-brainer for us."</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-mid-brown rounded-full mx-auto mb-4 flex items-center justify-center text-milk font-bold text-2xl">
                    CF
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Campus Foods</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-2">University convenience stores</p>
                  <p className="font-paragraph text-dark-brown">"Students love SPYLT. It's become our #1 selling beverage."</p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Become a Dealer</h3>
              <form onSubmit={handleSubmitApplication} className="max-w-4xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={dealerData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Contact Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={dealerData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter contact person name"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={dealerData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={dealerData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-dark-brown font-bold mb-3">Business Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={dealerData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                    placeholder="Enter your business address"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Business Type *</label>
                    <select
                      name="businessType"
                      value={dealerData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                    >
                      <option value="">Select business type</option>
                      <option value="grocery">Grocery Store</option>
                      <option value="convenience">Convenience Store</option>
                      <option value="gas-station">Gas Station</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="campus">Campus Store</option>
                      <option value="distributor">Distributor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Expected Monthly Volume *</label>
                    <select
                      name="volume"
                      value={dealerData.volume}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                    >
                      <option value="">Select expected volume</option>
                      <option value="starter">$2,500 - $7,499 (Starter)</option>
                      <option value="premium">$7,500 - $14,999 (Premium)</option>
                      <option value="elite">$15,000+ (Elite)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-dark-brown font-bold mb-3">Previous Beverage Experience</label>
                  <textarea
                    name="experience"
                    value={dealerData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors resize-none"
                    placeholder="Tell us about your experience selling beverages or similar products..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-mid-brown text-milk uppercase font-bold text-xl rounded-full py-5 px-16 border-[.3vw] border-milk hover:bg-light-brown hover:text-dark-brown transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default DairyDealersPage;