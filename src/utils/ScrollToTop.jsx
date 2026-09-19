import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollContainer = document.getElementById(
      "website-scroll-container"
    );

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;