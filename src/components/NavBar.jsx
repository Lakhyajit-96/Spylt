import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    // Refresh the page to reset all animations
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 z-50 md:p-9 p-3">
      <img 
        src="/images/nav-logo.svg" 
        alt="nav-logo" 
        className="md:w-24 w-20 cursor-pointer hover:scale-105 transition-transform" 
        onClick={handleLogoClick}
      />
    </nav>
  );
};

export default NavBar;
