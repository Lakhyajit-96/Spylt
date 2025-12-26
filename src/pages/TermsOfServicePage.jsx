import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import FooterSection from '../sections/FooterSection';

const TermsOfServicePage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".terms-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".terms-content", {
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
        ".terms-body",
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

        <div className="terms-content opacity-0 translate-y-10 relative z-10 w-full max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="terms-title general-title text-dark-brown mb-8">
                TERMS OF SERVICE
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-4xl md:text-3xl text-2xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  CHUG RESPONSIBLY
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-2xl mx-auto md:text-lg leading-[115%]">
              Last updated: December 26, 2025
            </p>
          </div>

          {/* Terms of Service Content */}
          <div className="terms-body opacity-0 translate-y-10 space-y-12">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">1. Acceptance of Terms</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>Welcome to SPYLT! These Terms of Service ("Terms") govern your use of our website, products, and services. By accessing or using our website, purchasing our products, or engaging with our services, you agree to be bound by these Terms.</p>
                <p>If you do not agree with any part of these Terms, you may not access or use our services. These Terms constitute a legally binding agreement between you and SPYLT.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">2. Description of Service</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>SPYLT is a premium beverage brand offering high-quality protein and caffeine drinks in various flavors. Our services include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Online sales of SPYLT beverages and merchandise</li>
                  <li>Subscription services for regular deliveries</li>
                  <li>Customer support and product information</li>
                  <li>Marketing communications and promotional offers</li>
                  <li>Community engagement through social media and events</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">3. User Accounts</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>To access certain features of our service, you may be required to create an account. You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
                <p>We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">4. Product Orders and Payment</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p><strong>Order Acceptance:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel orders at our discretion.</p>
                <p><strong>Pricing:</strong> Prices are subject to change without notice. The price charged will be the price in effect at the time of order placement.</p>
                <p><strong>Payment:</strong> Payment is required at the time of purchase. We accept major credit cards, debit cards, and other payment methods as indicated on our website.</p>
                <p><strong>Taxes:</strong> You are responsible for all applicable taxes, duties, and fees related to your purchase.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">5. Shipping and Delivery</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p><strong>Shipping:</strong> We ship to addresses within the United States and select international locations. Shipping costs and delivery times vary by location and shipping method.</p>
                <p><strong>Risk of Loss:</strong> Risk of loss and title for products pass to you upon delivery to the carrier.</p>
                <p><strong>Delivery Issues:</strong> We are not responsible for delays or damages caused by shipping carriers, but we will work with you to resolve any issues.</p>
                <p><strong>Age Verification:</strong> Some products may require age verification upon delivery. You must be 18 years or older to purchase our products.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">6. Returns and Refunds</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p><strong>Return Policy:</strong> Due to the perishable nature of our products, we generally do not accept returns unless the product is defective or damaged.</p>
                <p><strong>Defective Products:</strong> If you receive a defective or damaged product, please contact us within 7 days of delivery for a replacement or refund.</p>
                <p><strong>Refund Process:</strong> Approved refunds will be processed within 5-10 business days to the original payment method.</p>
                <p><strong>Subscription Cancellation:</strong> Subscription services can be cancelled at any time, but changes must be made before the next billing cycle.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">7. Prohibited Uses</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts. Prohibited activities include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Transmitting harmful or malicious code</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Harassing, abusing, or harming other users</li>
                  <li>Impersonating any person or entity</li>
                  <li>Collecting user information without consent</li>
                  <li>Using our service for commercial purposes without authorization</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">8. Intellectual Property Rights</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>All content on our website, including text, graphics, logos, images, videos, and software, is the property of SPYLT or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p>
                <p>You may not reproduce, distribute, modify, or create derivative works of our content without express written permission. The SPYLT name, logo, and all related marks are trademarks of SPYLT.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">9. User-Generated Content</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>If you submit content to our website or social media channels (reviews, comments, photos, etc.), you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and display such content.</p>
                <p>You represent that you own or have the necessary rights to submit such content and that it does not violate any third-party rights or applicable laws.</p>
                <p>We reserve the right to remove any user-generated content that violates these Terms or is otherwise objectionable.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">10. Health and Safety Disclaimers</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p><strong>Dietary Considerations:</strong> Our products contain caffeine and other active ingredients. Please consult with a healthcare professional before consuming if you have any medical conditions or concerns.</p>
                <p><strong>Allergies:</strong> Our products may contain allergens. Please review ingredient lists carefully and contact us with any questions.</p>
                <p><strong>Age Restrictions:</strong> Our products are intended for adults 18 years and older. Not recommended for pregnant or nursing women.</p>
                <p><strong>Responsible Consumption:</strong> Please consume our products responsibly and in moderation. Do not exceed recommended daily caffeine intake.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">11. Limitation of Liability</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>To the fullest extent permitted by law, SPYLT shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our service.</p>
                <p>Our total liability to you for any claim arising out of or relating to these Terms or our service shall not exceed the amount you paid to us in the twelve months preceding the claim.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">12. Indemnification</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>You agree to indemnify, defend, and hold harmless SPYLT and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising out of your use of our service, violation of these Terms, or infringement of any third-party rights.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">13. Termination</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>We may terminate or suspend your access to our service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use our service will cease immediately.</p>
                <p>You may terminate your account at any time by contacting us or using the account settings on our website.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">14. Governing Law and Dispute Resolution</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
                <p>Any disputes arising out of or relating to these Terms or our service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">15. Changes to Terms</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the "Last updated" date.</p>
                <p>Your continued use of our service after such changes constitutes acceptance of the updated Terms.</p>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-2xl mb-6">16. Contact Information</h3>
              <div className="space-y-4 font-paragraph text-dark-brown">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="mt-4">
                  <p><strong>Email:</strong> legal@spylt.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-SPYLT</p>
                  <p><strong>Address:</strong> 123 Milk Street, Dairy Valley, CA 90210</p>
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

export default TermsOfServicePage;