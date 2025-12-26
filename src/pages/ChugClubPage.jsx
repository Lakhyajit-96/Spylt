import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FooterSection from '../sections/FooterSection';

const ChugClubPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [membershipData, setMembershipData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    plan: 'monthly'
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".club-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".club-content", {
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
        ".membership-cards",
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
    setMembershipData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJoinClub = (e) => {
    e.preventDefault();
    console.log('Joining Chug Club:', membershipData);
    alert('Welcome to the Chug Club! Check your email for confirmation.');
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

        <div className="club-content opacity-0 translate-y-10 relative z-10 w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="club-title general-title text-dark-brown mb-8">
                CHUG CLUB
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  JOIN THE FAMILY
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-3xl mx-auto md:text-lg leading-[115%]">
              Become a member of the exclusive SPYLT Chug Club and unlock incredible benefits, 
              discounts, and early access to new flavors. It's more than a subscription - it's a lifestyle.
            </p>
          </div>

          {/* Membership Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="membership-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk text-center">
              <h3 className="text-dark-brown font-bold text-2xl mb-4">STARTER</h3>
              <div className="text-4xl font-bold text-mid-brown mb-4">$29.99</div>
              <p className="font-paragraph text-dark-brown mb-6">per month</p>
              <ul className="font-paragraph text-dark-brown space-y-3 mb-8">
                <li>✓ 12 bottles per month</li>
                <li>✓ 10% discount on all orders</li>
                <li>✓ Free shipping</li>
                <li>✓ Exclusive member newsletter</li>
                <li>✓ Birthday surprise</li>
              </ul>
              <button className="bg-light-brown text-dark-brown font-bold py-3 px-8 rounded-full border-[.2vw] border-milk hover:bg-mid-brown hover:text-milk transition-all duration-300 w-full">
                Choose Starter
              </button>
            </div>

            <div className="membership-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-mid-brown text-center transform scale-105">
              <div className="bg-mid-brown text-milk px-4 py-2 rounded-full text-sm font-bold mb-4">MOST POPULAR</div>
              <h3 className="text-dark-brown font-bold text-2xl mb-4">CHAMPION</h3>
              <div className="text-4xl font-bold text-mid-brown mb-4">$49.99</div>
              <p className="font-paragraph text-dark-brown mb-6">per month</p>
              <ul className="font-paragraph text-dark-brown space-y-3 mb-8">
                <li>✓ 24 bottles per month</li>
                <li>✓ 20% discount on all orders</li>
                <li>✓ Free shipping</li>
                <li>✓ Early access to new flavors</li>
                <li>✓ Exclusive SPYLT merchandise</li>
                <li>✓ Monthly flavor customization</li>
                <li>✓ VIP customer support</li>
              </ul>
              <button className="bg-mid-brown text-milk font-bold py-3 px-8 rounded-full border-[.2vw] border-milk hover:bg-light-brown hover:text-dark-brown transition-all duration-300 w-full">
                Choose Champion
              </button>
            </div>

            <div className="membership-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk text-center">
              <h3 className="text-dark-brown font-bold text-2xl mb-4">LEGEND</h3>
              <div className="text-4xl font-bold text-mid-brown mb-4">$89.99</div>
              <p className="font-paragraph text-dark-brown mb-6">per month</p>
              <ul className="font-paragraph text-dark-brown space-y-3 mb-8">
                <li>✓ 48 bottles per month</li>
                <li>✓ 30% discount on all orders</li>
                <li>✓ Free express shipping</li>
                <li>✓ First access to limited editions</li>
                <li>✓ Quarterly SPYLT care package</li>
                <li>✓ Personal flavor consultant</li>
                <li>✓ Exclusive events invitation</li>
                <li>✓ Custom bottle engraving</li>
              </ul>
              <button className="bg-light-brown text-dark-brown font-bold py-3 px-8 rounded-full border-[.2vw] border-milk hover:bg-mid-brown hover:text-milk transition-all duration-300 w-full">
                Choose Legend
              </button>
            </div>
          </div>

          {/* Club Benefits */}
          <div className="space-y-12">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Why Join the Chug Club?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 font-paragraph text-dark-brown text-center">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3">Save Money</h4>
                  <p>Get up to 30% off regular prices with our membership discounts.</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4M10,6L14,10L10,14V11H4V9H10M17,9.5H19.5L21.47,12H17M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3">Free Shipping</h4>
                  <p>Never pay for shipping again. All deliveries are on us.</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3">Exclusive Access</h4>
                  <p>Be the first to try new flavors and limited edition releases.</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3">Special Perks</h4>
                  <p>Enjoy birthday surprises, exclusive merchandise, and more.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Member Testimonials</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <img src="/images/p1.png" alt="Sarah M." className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Sarah M.</h4>
                  <p className="font-paragraph text-dark-brown">"The Chug Club has been a game-changer for my fitness routine. I never run out of my favorite flavors!"</p>
                </div>
                <div className="text-center">
                  <img src="/images/p2.png" alt="Mike T." className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Mike T.</h4>
                  <p className="font-paragraph text-dark-brown">"Love getting early access to new flavors. The savings are incredible too!"</p>
                </div>
                <div className="text-center">
                  <img src="/images/p3.png" alt="Jessica L." className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Jessica L.</h4>
                  <p className="font-paragraph text-dark-brown">"The convenience of automatic delivery means I never have to worry about running out."</p>
                </div>
              </div>
            </div>

            {/* Join Form */}
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Ready to Join?</h3>
              <form onSubmit={handleJoinClub} className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={membershipData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={membershipData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-dark-brown font-bold mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={membershipData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-dark-brown font-bold mb-3">Membership Plan</label>
                  <select
                    name="plan"
                    value={membershipData.plan}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                  >
                    <option value="starter">Starter - $29.99/month</option>
                    <option value="champion">Champion - $49.99/month</option>
                    <option value="legend">Legend - $89.99/month</option>
                  </select>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-mid-brown text-milk uppercase font-bold text-xl rounded-full py-5 px-16 border-[.3vw] border-milk hover:bg-light-brown hover:text-dark-brown transition-all duration-300 transform hover:scale-105"
                  >
                    Join Chug Club
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

export default ChugClubPage;