import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [pathname]); // Trigger this effect whenever the pathname changes

  return null; // This component does not render any UI
};

export default ScrollToTop;
