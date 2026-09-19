import "./Profile.css";
import usePageTitle from "../../../hooks/usePageTitle";
import { useSelector } from "react-redux";
import UserProfile from "../../../components/sections/uprofile/UserProfile";
import UserPlan from "../../../components/sections/uplan/UserPlan";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function Profile() {
  usePageTitle("User Profile | SerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);
  const usage = useSelector((state) => state.user.usage);

  const location = useLocation();
  const from = location?.state?.from;

  return (
    <section className="profile">
      <Link to={from ? from : "/"} className="back-home">
        <IoArrowBack />
        <span>Back</span>
      </Link>
      <div className="profile__card">
        <div className="profile__container">
          <UserProfile user={user}/>
          <UserPlan user={user} plan={plan} usage={usage}/>
        </div>
      </div>
    </section>
  );
}