import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiHome,
  HiSparkles,
  HiSupport,
  HiPhotograph,
  HiCreditCard,
  HiOfficeBuilding,
  HiX,
  HiLogin,
  HiUserAdd,
  HiChevronDown,
  HiChevronRight,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const MobileMenu = ({ open, setOpen }) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    setFeaturesOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      id: 1,
      title: "Home",
      icon: <HiHome />,
      href: "/",
      auth: true,
    },
    {
      id: 2,
      title: "Features",
      icon: <HiSparkles />,
      href: "/features",
      auth: isAuthenticated,
      children: [
        {
          name: "Image",
          children: [
            {
              name: "Create",
              path: "/features/image/create",
            },
            {
              name: "Edit",
              path: "/features/image/edit",
            },
            {
              name: "Collage",
              path: "/features/image/collage",
            },
          ],
        },
        {
          name: "Video",
          children: [
            {
              name: "Create",
              path: "/features/video/create",
            },
            {
              name: "Edit",
              path: "/features/video/edit",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Plans",
      icon: <HiCreditCard />,
      href: "/plans",
      auth: true,
    },
    {
      id: 4,
      title: "Contact",
      icon: <HiOfficeBuilding />,
      href: "/contact",
      auth: true,
    },
    {
      id: 5,
      title: "Help & Support",
      icon: <HiSupport />,
      href: "/help-support",
      auth: isAuthenticated,
    },
    {
      id: 6,
      title: "Gallery",
      icon: <HiPhotograph />,
      href: "/gallery",
      auth: isAuthenticated,
    },
  ];

  const handleCloseMenu = () => {
    setOpen(false);
    setFeaturesOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseMenu}
          />

          {/* Drawer */}
          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
          >
            {/* Header */}
            <div className="mobile-header">
              <h2>AISerbisyosStudio</h2>

              <button className="mobile-close" onClick={handleCloseMenu}>
                <HiX />
              </button>
            </div>

            {/* Navigation */}
            <div className="mobile-links">
              {navItems
                .filter((item) => item.auth)
                .map((item) => {
                  /* Features with children */
                  if (item.children) {
                    return (
                      <div className="mobile-menu-group" key={item.title}>
                        <button
                          type="button"
                          className={`mobile-link mobile-link-parent ${
                            featuresOpen ? "active" : ""
                          }`}
                          onClick={() => setFeaturesOpen((prev) => !prev)}
                        >
                          <span className="mobile-link-left">
                            <span className="mobile-link-icon">
                              {item.icon}
                            </span>

                            <span>{item.title}</span>
                          </span>

                          <HiChevronDown
                            className={`mobile-chevron ${
                              featuresOpen ? "rotate" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {featuresOpen && (
                            <motion.div
                              className="mobile-submenu"
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                            >
                              {item.children.map((group) => (
                                <div
                                  className="mobile-submenu-group"
                                  key={group.name}
                                >
                                  {/* Image / Video */}
                                  <div className="mobile-submenu-title">
                                    {group.name}
                                  </div>

                                  {group.children.map((child) => (
                                    <NavLink
                                      key={child.path}
                                      to={child.path}
                                      className={({ isActive }) =>
                                        `mobile-submenu-link ${
                                          isActive ? "active" : ""
                                        }`
                                      }
                                      onClick={handleCloseMenu}
                                    >
                                      <HiChevronRight />

                                      <span>{child.name}</span>
                                    </NavLink>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  /* Normal menu items */
                  return (
                    <NavLink
                      key={item.title}
                      to={item.href}
                      className={({ isActive }) =>
                        `mobile-link ${isActive ? "active" : ""}`
                      }
                      onClick={handleCloseMenu}
                    >
                      <span className="mobile-link-icon">{item.icon}</span>

                      {item.title}
                    </NavLink>
                  );
                })}
            </div>

            {/* Auth Buttons */}
            {!isAuthenticated && (
              <div className="mobile-auth">
                <button
                  className="mobile-auth-btn mobile-login-btn"
                  onClick={() => {
                    handleCloseMenu();
                    navigate("/auth", {
                      state: { open: "LOGIN" },
                    });
                  }}
                >
                  <HiLogin />
                  <span>Login</span>
                </button>

                <button
                  className="mobile-auth-btn signup-btn"
                  onClick={() => {
                    handleCloseMenu();
                    navigate("/auth", {
                      state: { open: "REGISTER" },
                    });
                  }}
                >
                  <HiUserAdd />
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="mobile-footer">
              <p>Version 1.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;