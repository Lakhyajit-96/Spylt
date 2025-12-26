import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FooterSection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  const handlePrivacyClick = () => {
    navigate('/privacy-policy');
  };

  const handleTermsClick = () => {
    navigate('/terms-of-service');
  };

  // Social media handlers
  const handleYouTubeClick = () => {
    window.open('https://youtube.com/@spylt', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/spylt', '_blank');
  };

  const handleTikTokClick = () => {
    window.open('https://tiktok.com/@spylt', '_blank');
  };

  const handleSpyltFlavorsClick = () => {
    console.log('SPYLT Flavors clicked');
    navigate('/spylt-flavors');
  };

  const handleChugClubClick = () => {
    console.log('Chug Club clicked');
    navigate('/chug-club');
  };

  const handleStudentMarketingClick = () => {
    console.log('Student Marketing clicked');
    navigate('/student-marketing');
  };

  const handleDairyDealersClick = () => {
    console.log('Dairy Dealers clicked');
    navigate('/dairy-dealers');
  };

  const handleCompanyClick = () => {
    console.log('Company clicked');
    navigate('/company');
  };

  const handleContactsClick = () => {
    console.log('Contacts clicked');
    navigate('/contacts');
  };

  const handleTastyTalkClick = () => {
    console.log('Tasty Talk clicked');
    navigate('/tasty-talk');
  };

  const handleEmailSubmit = () => {
    console.log('Email submit clicked', email);
    if (email.trim()) {
      navigate('/contact', { state: { email: email } });
    }
  };

  return (
    <section className="footer-section">
      <img
        src="/images/footer-dip.png"
        alt=""
        className="w-full object-cover -translate-y-1"
      />

      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
        <div className="overflow-hidden z-20 relative">
          <h1 className="general-title text-center text-milk py-5">
            #CHUGRESPONSIBLY
          </h1>
        </div>

        {isMobile ? (
          <img
            src="/images/footer-drink.png"
            className="absolute top-0 object-contain z-0"
          />
        ) : (
          <video
            src="/videos/splash.mp4"
            autoPlay
            playsInline
            muted
            className="absolute top-0 object-contain mix-blend-lighten z-0"
          />
        )}

        <div className="flex-center gap-5 relative z-20 md:mt-20 mt-5">
          <div className="social-btn" onClick={handleYouTubeClick}>
            <img src="./images/yt.svg" alt="YouTube" />
          </div>
          <div className="social-btn" onClick={handleInstagramClick}>
            <img src="./images/insta.svg" alt="Instagram" />
          </div>
          <div className="social-btn" onClick={handleTikTokClick}>
            <img src="./images/tiktok.svg" alt="TikTok" />
          </div>
        </div>

        <div className="mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium relative z-20">
          <div className="flex items-center md:gap-16 gap-5" style={{ pointerEvents: 'auto' }}>
            <div>
              <p 
                className="cursor-pointer hover:text-light-brown transition-colors"
                onClick={handleSpyltFlavorsClick}
                style={{ pointerEvents: 'auto' }}
              >
                SPYLT Flavors
              </p>
            </div>
            <div>
              <p 
                className="cursor-pointer hover:text-light-brown transition-colors"
                onClick={handleChugClubClick}
                style={{ pointerEvents: 'auto' }}
              >
                Chug Club
              </p>
              <p 
                className="cursor-pointer hover:text-light-brown transition-colors"
                onClick={handleStudentMarketingClick}
                style={{ pointerEvents: 'auto' }}
              >
                Student Marketing
              </p>
              <p 
                className="cursor-pointer hover:text-light-brown transition-colors"
                onClick={handleDairyDealersClick}
                style={{ pointerEvents: 'auto' }}
              >
                Dairy Dealers
              </p>
            </div>
            <div>
              <p 
                className="cursor-pointer hover:text-light-brown transition-colors"
                onClick={handleCompanyClick}
                style={{ pointerEvents: 'auto' }}
              >
                Company
              </p>
              <p 
                className="cursor-pointer hover:text-light-brown transition-colors"
                onClick={handleContactsClick}
                style={{ pointerEvents: 'auto' }}
              >
                Contacts
              </p>
              <p 
                className="cursor-pointer hover:text-light-brown transition-colors"
                onClick={handleTastyTalkClick}
                style={{ pointerEvents: 'auto' }}
              >
                Tasty Talk
              </p>
            </div>
          </div>

          <div className="md:max-w-lg" style={{ pointerEvents: 'auto' }}>
            <p>
              Get Exclusive Early Access and Stay Informed About Product
              Updates, Events, and More!
            </p>
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10" style={{ pointerEvents: 'auto' }}>
              {/* The input field and arrow icon for newsletter signup. */}{" "}
              {/* A
          border at the bottom for a clean, modern look. */}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full placeholder:font-sans placeholder:text-[#999999] bg-transparent text-milk outline-none"
                style={{ pointerEvents: 'auto' }}
              />
              <img 
                src="/images/arrow.svg" 
                alt="arrow" 
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={handleEmailSubmit}
                style={{ pointerEvents: 'auto' }}
              />
            </div>
          </div>
        </div>

        <div className="copyright-box relative z-20">
          {/* The final row with copyright and legal links. */}
          <p>Copyright © 2025 Spylt - All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p 
              className="cursor-pointer hover:text-light-brown transition-colors"
              onClick={handlePrivacyClick}
            >
              Privacy Policy
            </p>
            <p 
              className="cursor-pointer hover:text-light-brown transition-colors"
              onClick={handleTermsClick}
            >
              Terms of Sеrvice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
