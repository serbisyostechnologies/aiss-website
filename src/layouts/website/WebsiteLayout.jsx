import { Outlet } from "react-router-dom";

import FloatingNavbar from "../../components/layout/FloatingNavbar/FloatingNavbar";
import CTASection from "../../components/layout/cta/CTASection";
import Footer from "../../components/layout/footer/Footer";
import MoveToTop from "../../components/common/movetotop/MoveToTop";
import ScrollToTop from "../../utils/ScrollToTop";

import "./WebsiteLayout.css";

const WebsiteLayout = () => {
  return (
    <div className="website-layout">
      <div className="website-layout__navbar">
        <FloatingNavbar />
      </div>

      <ScrollToTop />

      <main
        id="website-scroll-container"
        className="website-layout__main"
      >
        <div className="website-layout__content">
          <Outlet />

          <CTASection />
          <Footer />
        </div>
      </main>

      <MoveToTop />
    </div>
  );
};

export default WebsiteLayout;