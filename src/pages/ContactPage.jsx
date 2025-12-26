import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from 'react-router-dom';
import FooterSection from '../sections/FooterSection';

const ContactPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    message: "",
    subject: "General Inquiry"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill email if coming from footer
  useEffect(() => {
    if (location.state?.email) {
      setFormData(prev => ({
        ...prev,
        email: location.state.email
      }));
    }
  }, [location.state]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".contact-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".contact-content", {
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
        ".contact-form",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.3"
      );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        company: "",
        message: "",
        subject: "General Inquiry"
      });
    }, 3000);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-milk">
      <nav className="fixed top-0 left-0 z-50 md:p-9 p-3">
        <img 
          src="/images/nav-logo.svg" 
          alt="nav-logo" 
          className="md:w-24 w-20 cursor-pointer hover:scale-105 transition-transform" 
          onClick={handleBackToHome}
        />
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {isMobile ? (
          <img
            src="/images/hero-bg.png"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        ) : (
          <video
            src="/videos/hero-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}

        <div className="contact-content opacity-0 translate-y-10 relative z-10 w-full max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="contact-title general-title text-dark-brown mb-8">
                GET IN TOUCH
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  LET'S CHUG TOGETHER
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-2xl mx-auto md:text-lg leading-[115%]">
              Ready to join the SPYLT family? Whether you're interested in partnerships, 
              have questions about our products, or just want to say hello - we'd love to hear from you!
            </p>
          </div>

          <div className="contact-form opacity-0 translate-y-10 max-w-4xl mx-auto">
            {isSubmitted ? (
              <div className="text-center py-20">
                <div className="bg-light-brown rounded-3xl p-10 border-[.5vw] border-milk">
                  <h3 className="text-dark-brown text-4xl font-bold mb-4">Thank You!</h3>
                  <p className="font-paragraph text-dark-brown text-lg">
                    Your message has been received. We'll get back to you within 24 hours!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3 text-lg">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.3vw] border-milk bg-[#fdebd2] text-dark-brown font-paragraph text-lg placeholder:text-[#865720] focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3 text-lg">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.3vw] border-milk bg-[#fdebd2] text-dark-brown font-paragraph text-lg placeholder:text-[#865720] focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3 text-lg">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.3vw] border-milk bg-[#fdebd2] text-dark-brown font-paragraph text-lg placeholder:text-[#865720] focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3 text-lg">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl border-[.3vw] border-milk bg-[#fdebd2] text-dark-brown font-paragraph text-lg placeholder:text-[#865720] focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3 text-lg">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl border-[.3vw] border-milk bg-[#fdebd2] text-dark-brown font-paragraph text-lg placeholder:text-[#865720] focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3 text-lg">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.3vw] border-milk bg-[#fdebd2] text-dark-brown font-paragraph text-lg focus:outline-none focus:border-mid-brown transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Partnership Opportunity</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Wholesale">Wholesale Inquiry</option>
                      <option value="Marketing">Marketing Collaboration</option>
                      <option value="Support">Customer Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-dark-brown font-bold mb-3 text-lg">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-4 rounded-2xl border-[.3vw] border-milk bg-[#fdebd2] text-dark-brown font-paragraph text-lg placeholder:text-[#865720] focus:outline-none focus:border-mid-brown transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-light-brown text-dark-brown uppercase font-bold text-xl rounded-full py-5 px-16 border-[.3vw] border-milk hover:bg-mid-brown hover:text-milk transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-xl mb-4">Email Us</h3>
              <p className="font-paragraph text-dark-brown">hello@spylt.com</p>
              <p className="font-paragraph text-dark-brown">support@spylt.com</p>
            </div>
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-xl mb-4">Call Us</h3>
              <p className="font-paragraph text-dark-brown">+1 (555) 123-SPYLT</p>
              <p className="font-paragraph text-dark-brown">Mon-Fri 9AM-6PM EST</p>
            </div>
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-xl mb-4">Visit Us</h3>
              <p className="font-paragraph text-dark-brown">123 Milk Street</p>
              <p className="font-paragraph text-dark-brown">Dairy Valley, CA 90210</p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ContactPage;