import React, { useState, useEffect } from "react";
import "./FloatingNavbar.css";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { HiX } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";

const FloatingNavbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`floating-navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Left */}
        <div className="navbar-left">
          <Logo />
        </div>

        {/* Center */}
        <div className="navbar-center">
          <NavLinks />
        </div>

        {/* Right */}
        <div className="navbar-right">
          {isAuthenticated ? <ProfileMenu /> : <AuthButtons />}
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={35}/> : <FiMenu size={35}/>}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenu
        open={menuOpen}
        setOpen={setMenuOpen}
        darkMode={darkMode}
      />
    </>
  );
};

export default FloatingNavbar;