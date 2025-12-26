import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import FooterSection from '../sections/FooterSection';

const ContactsPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".contacts-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".contacts-content", {
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
        ".contact-cards",
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

        <div className="contacts-content opacity-0 translate-y-10 relative z-10 w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="contacts-title general-title text-dark-brown mb-8">
                CONTACT US
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  WE'RE HERE TO HELP
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-3xl mx-auto md:text-lg leading-[115%]">
              Have questions, feedback, or just want to say hello? We'd love to hear from you! 
              Choose the best way to reach our team below.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="contact-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">General Inquiries</h3>
              <p className="font-paragraph text-dark-brown text-sm mb-4">
                Questions about our products, orders, or general information
              </p>
              <a href="mailto:hello@spylt.com" className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors">
                hello@spylt.com
              </a>
            </div>

            <div className="contact-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,18C15.89,18 15,18.89 15,20A3,3 0 0,1 12,23C10.11,23 8.5,21.5 8.5,19.5V18.5C8.5,17.67 7.83,17 7,17H4A2,2 0 0,1 2,15V10C2,8.89 2.89,8 4,8H7C7.83,8 8.5,7.33 8.5,6.5V5.5C8.5,3.5 10.11,2 12,2C13.89,2 15.5,3.5 15.5,5.5V6.5C15.5,7.33 16.17,8 17,8H20A2,2 0 0,1 22,10V15A2,2 0 0,1 20,17H17V18Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">Customer Support</h3>
              <p className="font-paragraph text-dark-brown text-sm mb-4">
                Order issues, returns, or account help
              </p>
              <a href="mailto:support@spylt.com" className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors">
                support@spylt.com
              </a>
            </div>

            <div className="contact-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16,4C18.209,4 20,5.791 20,8C20,10.209 18.209,12 16,12C13.791,12 12,10.209 12,8C12,5.791 13.791,4 16,4M16,14C18.7,14 24,15.35 24,18V20H8V18C8,15.35 13.3,14 16,14M8,4C10.209,4 12,5.791 12,8C12,8.81 11.707,9.548 11.22,10.142C10.537,10.693 9.849,11 9,11C6.791,11 5,9.209 5,7C5,4.791 6.791,3 9,3C9.849,3 10.537,3.307 11.22,3.858C11.707,4.452 12,5.19 12,6H10C10,5.448 9.552,5 9,5C7.895,5 7,5.895 7,7C7,8.105 7.895,9 9,9C9.552,9 10,8.552 10,8H12C12,9.209 10.209,11 8,11C5.791,11 4,9.209 4,7C4,4.791 5.791,3 8,3M8,13C10.7,13 16,14.35 16,17V19H0V17C0,14.35 5.3,13 8,13Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">Business Partnerships</h3>
              <p className="font-paragraph text-dark-brown text-sm mb-4">
                Wholesale, retail, or collaboration opportunities
              </p>
              <a href="mailto:partnerships@spylt.com" className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors">
                partnerships@spylt.com
              </a>
            </div>

            <div className="contact-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-xl mb-3">Media & Press</h3>
              <p className="font-paragraph text-dark-brown text-sm mb-4">
                Press inquiries, interviews, or media kits
              </p>
              <a href="mailto:press@spylt.com" className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors">
                press@spylt.com
              </a>
            </div>
          </div>

          {/* Office Locations */}
          <div className="space-y-12">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-8 text-center">Our Offices</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,7V3H2V21H22V7H12M6,19H4V17H6V19M6,15H4V13H6V15M6,11H4V9H6V11M6,7H4V5H6V7M10,19H8V17H10V19M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,19H12V17H20V19M20,15H12V13H20V15M20,11H12V9H20V11Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Headquarters</h4>
                  <div className="font-paragraph text-dark-brown space-y-2">
                    <p className="font-bold">SPYLT Beverages Inc.</p>
                    <p>123 Milk Street, Suite 500</p>
                    <p>Dairy Valley, CA 90210</p>
                    <p className="font-bold mt-4">Phone: +1 (555) 123-SPYLT</p>
                    <p>Hours: Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Production Facility</h4>
                  <div className="font-paragraph text-dark-brown space-y-2">
                    <p className="font-bold">SPYLT Manufacturing</p>
                    <p>456 Factory Lane</p>
                    <p>Production City, TX 75001</p>
                    <p className="font-bold mt-4">Phone: +1 (555) 456-PROD</p>
                    <p>Hours: 24/7 Operations</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2,10.96C1.5,10.68 1.35,10.07 1.63,9.59L3.13,7C3.24,6.8 3.41,6.66 3.6,6.58L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.66,6.72 20.82,6.88 20.91,7.08L22.36,9.6C22.64,10.08 22.47,10.69 22,10.96L21,11.54V16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V11.54L2,10.96Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Distribution Center</h4>
                  <div className="font-paragraph text-dark-brown space-y-2">
                    <p className="font-bold">SPYLT Logistics</p>
                    <p>789 Warehouse Blvd</p>
                    <p>Shipping Hub, IL 60601</p>
                    <p className="font-bold mt-4">Phone: +1 (555) 789-SHIP</p>
                    <p>Hours: Mon-Sat 6AM-8PM CST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-8 text-center">Follow Us</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Instagram</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-4">
                    Daily content, behind-the-scenes, and community highlights
                  </p>
                  <a 
                    href="https://instagram.com/spylt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors"
                  >
                    @spylt
                  </a>
                </div>

                <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">TikTok</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-4">
                    Fun videos, challenges, and viral SPYLT moments
                  </p>
                  <a 
                    href="https://tiktok.com/@spylt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors"
                  >
                    @spylt
                  </a>
                </div>

                <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">YouTube</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-4">
                    Product launches, tutorials, and brand documentaries
                  </p>
                  <a 
                    href="https://youtube.com/@spylt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors"
                  >
                    SPYLT Official
                  </a>
                </div>

                <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-milk" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">LinkedIn</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-4">
                    Company updates, career opportunities, and industry insights
                  </p>
                  <a 
                    href="https://linkedin.com/company/spylt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors"
                  >
                    SPYLT Beverages
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-8 text-center">Frequently Asked Questions</h3>
              <div className="grid md:grid-cols-2 gap-8 font-paragraph text-dark-brown">
                <div>
                  <h4 className="font-bold text-lg mb-3">How quickly do you respond to emails?</h4>
                  <p className="mb-6">We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our customer support line.</p>

                  <h4 className="font-bold text-lg mb-3">Do you offer phone support?</h4>
                  <p className="mb-6">Yes! Our customer support team is available by phone Monday-Friday, 9AM-6PM PST at +1 (555) 123-SPYLT.</p>

                  <h4 className="font-bold text-lg mb-3">Can I visit your offices?</h4>
                  <p>We welcome visitors by appointment only. Please email hello@spylt.com to schedule a visit to our headquarters.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">How do I report a product issue?</h4>
                  <p className="mb-6">Please contact support@spylt.com with your order number, product details, and photos if applicable. We'll resolve any issues quickly.</p>

                  <h4 className="font-bold text-lg mb-3">Do you respond to social media messages?</h4>
                  <p className="mb-6">Yes! We monitor all our social media channels and respond to messages and comments regularly throughout the day.</p>

                  <h4 className="font-bold text-lg mb-3">How can I suggest new flavors?</h4>
                  <p>We love hearing flavor ideas! Send your suggestions to hello@spylt.com with "Flavor Idea" in the subject line.</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-mid-brown rounded-3xl p-8 border-[.3vw] border-milk text-center">
              <h3 className="text-milk font-bold text-2xl mb-4">Emergency Contact</h3>
              <p className="font-paragraph text-milk mb-4">
                For urgent product safety concerns or media emergencies outside business hours:
              </p>
              <p className="font-paragraph text-light-brown font-bold text-xl">
                +1 (555) 911-SPYLT
              </p>
              <p className="font-paragraph text-milk text-sm mt-2">
                Available 24/7 for critical issues only
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ContactsPage;