// NavLinks.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiHome,
  HiSparkles,
  HiSupport,
  HiPhotograph,
  HiCreditCard,
  HiOfficeBuilding,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const featureRoutes = [
    "/features/image/create",
    "/features/image/edit",
    "/features/image/collage",
    "/features/video/create",
    "/features/video/edit",
  ];

  const isFeaturesActive = featureRoutes.includes(location.pathname);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

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

  return (
    <ul className="nav-links">
      {navItems
        .filter((item) => item.auth)
        .map((item) => (
          <li key={item.id} className="nav-item" onMouseLeave={() => setFeaturesOpen(false)}>
            {item.href === "/features" ? (
              <span
                className={`nav-link ${isFeaturesActive ? "active" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setFeaturesOpen(!featuresOpen)}
                onMouseEnter={() => setFeaturesOpen(true)}
              >
                <span className="nav-link-icon">{item.icon}</span>
                <span>{item.title}</span>
              </span>
            ) : (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <span className="nav-link-icon">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            )}

            {item.children && (
              <div
                className={`mega-menu ${featuresOpen ? "mega-menu-open" : ""}`}
              >
                {item.children.map((section) => (
                  <div className="mega-column" key={section.name}>
                    <h4>{section.name}</h4>

                    {section.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className="mega-link"
                        onClick={() => {
                          setFeaturesOpen(false);
                        }}
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default NavLinks;