import "./Features.css";
import {
  IoImageOutline,
  IoColorWandOutline,
  IoImagesOutline,
  IoVideocamOutline,
  IoFilmOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Features() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const features = [
    {
      id: 101,
      icon: <IoImageOutline />,
      title: "AI Image Creation",
      description: "Generate stunning AI images from text prompts in seconds.",
      tooltip:
        "Click here to start creating stunning AI images from text prompts.\n\n50 credits = ~1 image creation",
      color: "#8b5cf6",
      path: "/features/image/create",
    },
    {
      id: 102,
      icon: <IoColorWandOutline />,
      title: "AI Image Editing",
      description:
        "Enhance, retouch, and transform images with AI-powered tools.",
      tooltip:
        "Click here to start editing, enhancing, and transforming your images.\n\n100 credits = ~1 image editing",
      color: "#ec4899",
      path: "/features/image/edit",
    },
    {
      id: 103,
      icon: <IoImagesOutline />,
      title: "AI Image Collage",
      description:
        "Combine multiple photos into beautiful AI-generated collages.",
      tooltip:
        "Click here to start combining multiple photos into beautiful collages.\n\n100 credits = ~1 image collage",
      color: "#3b82f6",
      path: "/features/image/collage",
    },
    {
      id: 104,
      icon: <IoVideocamOutline />,
      title: "AI Video Creation",
      description: "Create engaging videos from text, images, or AI prompts.",
      tooltip:
        "Click here to start creating engaging AI videos from text or images.\n\n100 credits = ~1 video creation",
      color: "#10b981",
      path: "/features/video/create",
    },
    {
      id: 105,
      icon: <IoFilmOutline />,
      title: "AI Video Editing",
      description:
        "Edit videos effortlessly with smart AI-powered enhancements.",
      tooltip:
        "Click here to start improving, modifying, and enhancing your videos using AI.\n\n100 credits = ~1 video editing",
      color: "#ef4444",
      path: "/features/image/edit",
    },
  ];

  const navigateTo = (pageUrl) => {
    if (!isLoggedIn) return;
    navigate(pageUrl, { replace: true });
  };

  return (
    <>
      <section className="features-section glass">
        <span className="workflow-badge" style={{ marginBottom: "1rem" }}>
          ✨ Powerful AI Tools
        </span>

        <div className="features-grid">
          {features.map((item) => (
            <div
              className="feature-cards"
              key={item.id}
              onClick={() => navigateTo(item.path)}
            >
              {isLoggedIn && (
                <button className="info-icon">
                  <IoInformationCircleOutline size={20} />
                </button>
              )}

              <span className="tooltip">
                {isLoggedIn ? item.tooltip : "Please login to use the feature"}
              </span>
              <div
                className="feature-icon"
                style={{
                  color: item.color,
                  background: `${item.color}15`,
                }}
              >
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}