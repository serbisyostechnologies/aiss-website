import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h3 className="footer-logo">AISerbisyosStudio</h3>
          <p className="footer-description">Generate stunning visuals, edit content instantly, and transform your creative ideas into reality with next-generation AI tools.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/help-support">Help & Support</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/privacy-policy"state={{ from: location.pathname }}>Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-conditions" state={{ from: location.pathname }}>Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact-section">
          <h4>Contact</h4>
          <p>Email: info@aiserbisyosstudio.com</p>
          <p>Phone: +91 63668 48488</p>
          <p>Place: Kaggod, Vijayapura, Karnataka, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-left">
          <p>© {currentYear} AISerbisyosStudio. All Rights Reserved.</p>
        </div>

        <div className="footer-right">
          <p>Designed, developed and maintained by Serbisyos Technologies.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;