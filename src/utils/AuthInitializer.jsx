import { useDispatch, useSelector } from "react-redux";
import FullScreenLoader from "../components/common/floader/FullScreenLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/userService";
import { setUser, setUserPlan, setUserUsage } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      navigate("/", { replace: true });
      return;
    }
    const initializeAuth = async () => {
      try {
        const response = await getProfile({ userId: user._id });
        setLoading(false);
        if (response.success) {
          dispatch(setUser(response.profile.user));
          dispatch(setUserPlan(response.profile.plan));
          dispatch(setUserUsage(response.profile.usage));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        setLoading(false);
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (loading) {
    return <FullScreenLoader />;
  }
  return children;
};

export default AuthInitializer;