// Utility function to handle smooth navigation
export const smoothNavigate = (navigate, path, options = {}) => {
  // Scroll to top smoothly before navigation
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Navigate after a short delay to allow scroll animation
  setTimeout(() => {
    navigate(path, options);
  }, 300);
};

// Function to handle page refresh for logo clicks
export const refreshPage = () => {
  window.location.reload();
};