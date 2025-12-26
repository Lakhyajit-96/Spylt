import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FooterSection from '../sections/FooterSection';

const StudentMarketingPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    university: '',
    major: '',
    year: '',
    experience: '',
    motivation: ''
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".student-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".student-content", {
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
        ".program-cards",
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
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    console.log('Student Marketing Application:', applicationData);
    alert('Application submitted! We\'ll review your application and get back to you within 5 business days.');
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

        <div className="student-content opacity-0 translate-y-10 relative z-10 w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="student-title general-title text-dark-brown mb-8">
                STUDENT MARKETING
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  FUEL YOUR FUTURE
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-3xl mx-auto md:text-lg leading-[115%]">
              Join the SPYLT Student Marketing Program and gain real-world experience while representing 
              the most exciting beverage brand on campus. Build your resume, earn money, and fuel your ambitions.
            </p>
          </div>

          {/* Program Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="program-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,7V3H2V21H22V7H12M6,19H4V17H6V19M6,15H4V13H6V15M6,11H4V9H6V11M6,7H4V5H6V7M10,19H8V17H10V19M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,19H12V17H20V19M20,15H12V13H20V15M20,11H12V9H20V11Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-2xl mb-4">Real Experience</h3>
              <p className="font-paragraph text-dark-brown">
                Gain hands-on marketing experience with a growing brand. Perfect for your resume and future career.
              </p>
            </div>

            <div className="program-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-2xl mb-4">Earn Money</h3>
              <p className="font-paragraph text-dark-brown">
                Competitive compensation plus performance bonuses. Turn your passion into profit.
              </p>
            </div>

            <div className="program-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-mid-brown rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-milk" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
              </div>
              <h3 className="text-dark-brown font-bold text-2xl mb-4">Flexible Schedule</h3>
              <p className="font-paragraph text-dark-brown">
                Work around your class schedule. We understand that education comes first.
              </p>
            </div>
          </div>

          {/* Program Details */}
          <div className="space-y-12">
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">What You'll Do</h3>
              <div className="grid md:grid-cols-2 gap-8 font-paragraph text-dark-brown">
                <div>
                  <h4 className="font-bold text-xl mb-4">Campus Events</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Organize and host SPYLT sampling events</li>
                    <li>Set up booths at campus activities</li>
                    <li>Coordinate with student organizations</li>
                    <li>Manage event logistics and supplies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Social Media</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Create engaging content for social platforms</li>
                    <li>Share your SPYLT experiences</li>
                    <li>Build brand awareness among students</li>
                    <li>Collaborate with influencers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Brand Ambassador</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Represent SPYLT at university events</li>
                    <li>Educate students about our products</li>
                    <li>Collect feedback and insights</li>
                    <li>Build relationships with potential customers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Market Research</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Conduct surveys and focus groups</li>
                    <li>Analyze campus trends and preferences</li>
                    <li>Report on competitor activities</li>
                    <li>Provide strategic recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Program Requirements</h3>
              <div className="grid md:grid-cols-2 gap-8 font-paragraph text-dark-brown">
                <div>
                  <h4 className="font-bold text-xl mb-4">Eligibility</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Currently enrolled college student</li>
                    <li>Minimum 3.0 GPA</li>
                    <li>Sophomore, Junior, or Senior standing</li>
                    <li>Marketing, Business, or Communications major preferred</li>
                    <li>Strong communication skills</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Commitment</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>10-15 hours per week</li>
                    <li>Minimum one semester commitment</li>
                    <li>Attend monthly training sessions</li>
                    <li>Submit weekly activity reports</li>
                    <li>Maintain professional appearance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Success Stories</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <img src="/images/p4.png" alt="Alex Chen" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Alex Chen</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-2">UCLA - Marketing Major</p>
                  <p className="font-paragraph text-dark-brown">"The SPYLT program helped me land my dream internship at a Fortune 500 company!"</p>
                </div>
                <div className="text-center">
                  <img src="/images/p5.png" alt="Maria Rodriguez" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Maria Rodriguez</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-2">NYU - Communications</p>
                  <p className="font-paragraph text-dark-brown">"I learned more in one semester with SPYLT than in all my marketing classes combined."</p>
                </div>
                <div className="text-center">
                  <img src="/images/p6.png" alt="Jordan Smith" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="font-bold text-xl mb-3 text-dark-brown">Jordan Smith</h4>
                  <p className="font-paragraph text-dark-brown text-sm mb-2">Stanford - Business</p>
                  <p className="font-paragraph text-dark-brown">"The experience and connections I made through SPYLT were invaluable for my career."</p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
              <h3 className="text-dark-brown font-bold text-3xl mb-6 text-center">Apply Now</h3>
              <form onSubmit={handleSubmitApplication} className="max-w-4xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={applicationData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={applicationData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">University *</label>
                    <input
                      type="text"
                      name="university"
                      value={applicationData.university}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your university name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Major *</label>
                    <input
                      type="text"
                      name="major"
                      value={applicationData.major}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                      placeholder="Enter your major"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-brown font-bold mb-3">Year *</label>
                    <select
                      name="year"
                      value={applicationData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors"
                    >
                      <option value="">Select your year</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate Student</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-dark-brown font-bold mb-3">Previous Marketing Experience</label>
                  <textarea
                    name="experience"
                    value={applicationData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors resize-none"
                    placeholder="Describe any previous marketing, sales, or promotional experience..."
                  />
                </div>

                <div>
                  <label className="block text-dark-brown font-bold mb-3">Why do you want to join SPYLT? *</label>
                  <textarea
                    name="motivation"
                    value={applicationData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-mid-brown transition-colors resize-none"
                    placeholder="Tell us why you're interested in the SPYLT Student Marketing Program..."
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

export default StudentMarketingPage;