import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiUser,
  HiLogout,
  HiChevronDown,
} from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import ConfirmPopup from "../../common/confirm/ConfirmPopup";
import FullScreenLoader from "../../common/floader/FullScreenLoader";
import { logout as logoutService } from "../../../services/authService";
import { logout as logoutAction } from "../../../redux/slices/authSlice";
import { clearUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);
  const currentPlan =
    plan?.planId?.code ||
    plan?.planName ||
    null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: <HiUser />,
      title: "My Profile",
      action: () => navigate("/profile"),
    },
    {
      icon: <FaHistory />,
      title: "Transaction History",
      action: () => navigate("/transaction-history"),
    },
    {
      icon: <HiLogout />,
      title: "Logout",
      danger: true,
      action: () => setShowConfirm(true),
    },
  ];

  const handleLogout = async () => {
    setShowConfirm(false);
    try {
      setLoading(true);
      const response = await logoutService({ userId: user._id });
      setLoading(false);
      dispatch(logoutAction());
      dispatch(clearUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="profile-menu" ref={menuRef}>
        <motion.button
          className="profile-button"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setOpen(!open)}
        >
          <div className="nav-profile-avatar">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="navbar__profile-image"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>

          <div className="nav-profile-info">
            <span className="profile-name">{user?.name}</span>
            <span className="profile-role">{currentPlan}</span>
          </div>

          <HiChevronDown className={`profile-arrow ${open ? "rotate" : ""}`} />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="profile-dropdown"
              initial={{
                opacity: 0,
                y: -10,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`dropdown-item ${item.danger ? "danger" : ""}`}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                >
                  <span className="dropdown-icon">{item.icon}</span>

                  {item.title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ConfirmPopup
        isOpen={showConfirm}
        message="Are you sure you want to logout?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
      />
      {loading && <FullScreenLoader />}
    </>
  );
};

export default ProfileMenu;