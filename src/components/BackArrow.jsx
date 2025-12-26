import { useNavigate } from 'react-router-dom';

const BackArrow = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div 
      className={`fixed top-20 left-5 md:top-24 md:left-9 z-40 cursor-pointer hover:scale-110 transition-transform ${className}`}
      onClick={handleBack}
    >
      <div className="bg-light-brown rounded-full p-3 border-[.3vw] border-milk shadow-lg hover:bg-mid-brown transition-colors">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-dark-brown"
        >
          <path 
            d="M19 12H5M5 12L12 19M5 12L12 5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default BackArrow;