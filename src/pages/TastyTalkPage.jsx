import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import FooterSection from '../sections/FooterSection';
import { useState } from 'react';

const TastyTalkPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [blogFilter, setBlogFilter] = useState('all');

  useGSAP(() => {
    const titleSplit = SplitText.create(".blog-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.to(".blog-content", {
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
        ".blog-cards",
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

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind SPYLT: How We Perfected Protein + Caffeine",
      excerpt: "Discover the research and development process that led to our unique formulation combining high-quality protein with natural caffeine.",
      category: "science",
      date: "December 20, 2024",
      readTime: "5 min read",
      image: "/images/brown-drink.webp"
    },
    {
      id: 2,
      title: "5 Pre-Workout Mistakes That Are Sabotaging Your Gains",
      excerpt: "Learn about common pre-workout nutrition mistakes and how SPYLT can help optimize your training sessions.",
      category: "fitness",
      date: "December 18, 2024",
      readTime: "7 min read",
      image: "/images/red-drink.webp"
    },
    {
      id: 3,
      title: "From Idea to Shelf: The SPYLT Creation Story",
      excerpt: "Go behind the scenes of how SPYLT went from a simple idea to the award-winning beverage brand it is today.",
      category: "company",
      date: "December 15, 2024",
      readTime: "8 min read",
      image: "/images/blue-drink.webp"
    },
    {
      id: 4,
      title: "Sustainable Packaging: Our Journey to Carbon Neutrality",
      excerpt: "Learn about SPYLT's commitment to environmental responsibility and our innovative sustainable packaging solutions.",
      category: "sustainability",
      date: "December 12, 2024",
      readTime: "6 min read",
      image: "/images/white-drink.webp"
    },
    {
      id: 5,
      title: "The Ultimate Guide to Post-Workout Recovery",
      excerpt: "Maximize your recovery with proper nutrition, hydration, and the right combination of protein and caffeine.",
      category: "fitness",
      date: "December 10, 2024",
      readTime: "9 min read",
      image: "/images/orange-drink.webp"
    },
    {
      id: 6,
      title: "Flavor Innovation: How We Create New SPYLT Varieties",
      excerpt: "Take a peek into our flavor lab and discover the creative process behind developing new SPYLT flavors.",
      category: "innovation",
      date: "December 8, 2024",
      readTime: "4 min read",
      image: "/images/black-drink.webp"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'science', name: 'Science' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'company', name: 'Company' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'innovation', name: 'Innovation' }
  ];

  const filteredPosts = blogFilter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === blogFilter);

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

        <div className="blog-content opacity-0 translate-y-10 relative z-10 w-full max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="blog-title general-title text-dark-brown mb-8">
                TASTY TALK
              </h1>
            </div>
            <div className="rotate-[-2deg] border-[.5vw] border-milk mb-8">
              <div className="bg-mid-brown">
                <h2 className="uppercase 2xl:text-6xl md:text-5xl text-3xl font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                  OUR BLOG
                </h2>
              </div>
            </div>
            <p className="font-paragraph text-dark-brown text-center max-w-3xl mx-auto md:text-lg leading-[115%]">
              Dive into the world of SPYLT with our blog featuring nutrition science, fitness tips, 
              company updates, and everything you need to fuel your lifestyle.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setBlogFilter(category.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  blogFilter === category.id
                    ? 'bg-mid-brown text-milk border-[.2vw] border-milk'
                    : 'bg-[#fdebd2] text-dark-brown border-[.2vw] border-milk hover:bg-light-brown'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="blog-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-mid-brown text-milk px-4 py-2 rounded-full text-sm font-bold">FEATURED</span>
                  <span className="font-paragraph text-dark-brown text-sm">{blogPosts[0].date}</span>
                </div>
                <h3 className="text-dark-brown font-bold text-3xl mb-4">{blogPosts[0].title}</h3>
                <p className="font-paragraph text-dark-brown mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-paragraph text-mid-brown font-bold">{blogPosts[0].readTime}</span>
                  <button className="bg-light-brown text-dark-brown font-bold py-3 px-8 rounded-full border-[.2vw] border-milk hover:bg-mid-brown hover:text-milk transition-all duration-300">
                    Read More
                  </button>
                </div>
              </div>
              <div>
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-64 object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredPosts.slice(1).map((post) => (
              <div 
                key={post.id}
                className="blog-cards opacity-0 translate-y-10 bg-[#fdebd2] rounded-3xl p-6 border-[.3vw] border-milk hover:scale-105 transition-all duration-300 group overflow-hidden hover:shadow-2xl"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-contain rounded-2xl mb-6 transition-all duration-500 hover:scale-110 hover:rotate-2 group-hover:shadow-2xl"
                />
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-light-brown text-dark-brown px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {post.category}
                  </span>
                  <span className="font-paragraph text-dark-brown text-sm">{post.date}</span>
                </div>
                <h3 className="text-dark-brown font-bold text-xl mb-3">{post.title}</h3>
                <p className="font-paragraph text-dark-brown text-sm mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-paragraph text-mid-brown font-bold text-sm">{post.readTime}</span>
                  <button className="bg-light-brown text-dark-brown font-bold py-2 px-6 rounded-full border-[.2vw] border-milk hover:bg-mid-brown hover:text-milk transition-all duration-300 text-sm">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-mid-brown rounded-3xl p-8 border-[.3vw] border-milk text-center mb-12">
            <h3 className="text-milk font-bold text-3xl mb-4">Stay Updated</h3>
            <p className="font-paragraph text-milk mb-6 max-w-2xl mx-auto">
              Subscribe to Tasty Talk and never miss our latest posts about nutrition, fitness, and the SPYLT lifestyle.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-4 rounded-2xl border-[.2vw] border-milk bg-milk text-dark-brown font-paragraph focus:outline-none focus:border-light-brown transition-colors"
              />
              <button className="bg-light-brown text-dark-brown font-bold py-4 px-8 rounded-2xl border-[.2vw] border-milk hover:bg-milk transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk">
            <h3 className="text-dark-brown font-bold text-3xl mb-8 text-center">Popular Topics</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-3 text-dark-brown">Nutrition Science</h4>
                <p className="font-paragraph text-dark-brown text-sm">
                  Deep dives into the science behind functional beverages and optimal nutrition.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,4A0,0 0 0,0 12,4A0,0 0 0,0 12,4M7,10A1,1 0 0,0 6,11A1,1 0 0,0 7,12A1,1 0 0,0 8,11A1,1 0 0,0 7,10M17,10A1,1 0 0,0 16,11A1,1 0 0,0 17,12A1,1 0 0,0 18,11A1,1 0 0,0 17,10Z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-3 text-dark-brown">Fitness Tips</h4>
                <p className="font-paragraph text-dark-brown text-sm">
                  Workout routines, recovery strategies, and performance optimization guides.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,7V3H2V21H22V7H12M6,19H4V17H6V19M6,15H4V13H6V15M6,11H4V9H6V11M6,7H4V5H6V7M10,19H8V17H10V19M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,19H12V17H20V19M20,15H12V13H20V15M20,11H12V9H20V11Z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-3 text-dark-brown">Company News</h4>
                <p className="font-paragraph text-dark-brown text-sm">
                  Updates on new products, partnerships, and behind-the-scenes content.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-mid-brown rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-milk" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-3 text-dark-brown">Sustainability</h4>
                <p className="font-paragraph text-dark-brown text-sm">
                  Our environmental initiatives and tips for living more sustainably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default TastyTalkPage;