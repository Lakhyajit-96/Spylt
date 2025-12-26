import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import FooterSection from '../sections/FooterSection';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".privacy-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".privacy-content", {
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
        ".privacy-body",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
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

        <div className="privacy-content opacity-0 translate-y-10 relative z-10 w-full max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="privacy-title general-title text-dark-brown mb-8">
                PRIVACY POLICY
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-4xl md:text-3xl text-2xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  YOUR PRIVACY MATTERS
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-2xl mx-auto md:text-lg leading-[115%]">
              Last updated: December 26, 2025
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="privacy-body opacity-0 translate-y-10 space-y-12">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">1. Information We Collect</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p><strong>Personal Information:</strong> When you visit our website, subscribe to our newsletter, make a purchase, or contact us, we may collect personal information such as your name, email address, phone number, mailing address, and payment information.</p>
                <p><strong>Usage Data:</strong> We automatically collect information about how you interact with our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits.</p>
                <p><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content.</p>
                <p><strong>Social Media Information:</strong> If you interact with us on social media platforms, we may collect information from your public profiles in accordance with the platform's terms of service.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">2. How We Use Your Information</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>We use the information we collect for various purposes, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Processing and fulfilling your orders and transactions</li>
                  <li>Providing customer service and support</li>
                  <li>Sending you promotional emails and newsletters (with your consent)</li>
                  <li>Improving our website, products, and services</li>
                  <li>Analyzing website usage and trends</li>
                  <li>Preventing fraud and ensuring website security</li>
                  <li>Complying with legal obligations</li>
                  <li>Personalizing your experience on our website</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">3. Information Sharing and Disclosure</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or serving you.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or government regulation.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</li>
                  <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of our users or others.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">4. Data Security</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and employee training</li>
                  <li>Incident response procedures</li>
                </ul>
                <p>However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">5. Your Rights and Choices</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Cookie Control:</strong> Manage cookie preferences through your browser settings</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">6. Cookies and Tracking Technologies</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>We use various types of cookies and tracking technologies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us analyze website usage and performance</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
                <p>You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">7. Third-Party Links</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">8. Children's Privacy</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">9. International Data Transfers</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>If you are located outside the United States, please note that your information may be transferred to, stored, and processed in the United States or other countries where our service providers are located. By using our website, you consent to such transfers.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">10. Changes to This Privacy Policy</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our website after such changes constitutes acceptance of the updated policy.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">11. Contact Us</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                <div className="mt-4">
                  <p><strong>Email:</strong> privacy@spylt.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-SPYLT</p>
                  <p><strong>Address:</strong> 123 Milk Street, Dairy Valley, CA 90210</p>
                </div>
                <p>We will respond to your inquiries within 30 days of receipt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default PrivacyPolicyPage;