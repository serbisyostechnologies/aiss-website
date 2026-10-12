import "../../../features/Common.css";
import "./EditImage.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const EditImage = () => {
  usePageTitle("AI Image Editing | AISerbisyosStudio");
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const from = location?.state?.from;

  return (
    <section className="image-section">
      <Link to={from ? from : "/"} className="back-home">
        <IoArrowBack />
        <span>Back</span>
      </Link>
    </section>
  );
};

export default EditImage;