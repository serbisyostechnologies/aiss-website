import "./FullScreenLoader.css";
import logo from "../../../assets/images/logos/tab-logo.png";

const FullScreenLoader = () => {
  return (
    <div className="fullscreen-loader">
      <div className="floader-wrapper">
        <img src={logo} alt="Loading" className="loader-logo" />
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;