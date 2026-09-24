import "../../../features/Common.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import ConfirmPopup from "../../../../../components/common/confirm/ConfirmPopup";
import Input from "../../../../../components/common/input/Input";
import Button from "../../../../../components/common/button/Button";
import {
  generateAiPrompt,
  generateAiVideo,
} from "../../../../../services/serbisyosService";
import { toast } from "react-toastify";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";

const CreateVideo = () => {
  usePageTitle("AI Video Creation | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);

  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("8");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const dropdownRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const from = location?.state?.from;

  const samplePrompts = [
    "A futuristic cyberpunk city glowing under neon rain, flying cars moving between towering skyscrapers, reflections shimmering on wet streets, cinematic camera slowly moving forward through the city, dynamic neon lighting, ultra-detailed, photorealistic, cinematic 4K",
    "A majestic dragon sleeping around a crystal castle on top of snowy mountains, its wings gently moving as snow falls around it, magical glowing crystals illuminating the castle, cinematic camera slowly orbiting the scene, epic fantasy atmosphere, ultra realistic, cinematic 4K",
    "A hidden tropical waterfall surrounded by lush rainforest, crystal-clear water flowing into a natural pool, leaves gently moving in the breeze, sunlight rays passing through the trees, cinematic camera slowly approaching the waterfall, photorealistic, cinematic 4K",
    "A luxury glass villa built into a cliff overlooking the ocean during sunset, waves moving below the villa, palm trees gently swaying, warm sunlight reflecting across the glass walls, cinematic drone camera slowly flying around the architecture, realistic, cinematic 4K",
    "A futuristic electric supercar parked under neon city lights after rain, water droplets sliding across its surface, glowing reflections on the wet road, headlights turning on, cinematic camera slowly tracking around the car, dramatic lighting, ultra-detailed, photorealistic, cinematic 4K",
    "A majestic white tiger walking slowly through a glowing bamboo forest at night, soft mist drifting between the trees, glowing particles floating in the air, the tiger's fur moving gently as it walks, cinematic camera tracking alongside the tiger, ultra realistic, cinematic 4K",
    "A gourmet cheeseburger with melted cheese, crispy fries and fresh ingredients on a wooden table, steam rising from the hot burger, cheese slowly stretching as the burger is opened, dramatic studio lighting, cinematic camera slowly rotating around the food, commercial food photography, ultra realistic",
    "A confident young woman wearing futuristic cyberpunk fashion walking through a neon-lit city at night, glowing signs reflecting on her face, her hair moving gently in the wind, cinematic camera slowly pushing toward her as she looks into the camera, neon lighting, ultra realistic portrait, cinematic 4K",
    "A dreamlike floating island above the clouds, waterfalls flowing from the edges into the sky, giant trees gently moving in the wind, birds flying around the island, magical glowing particles floating through the air, cinematic camera slowly orbiting the island, surreal fantasy style, cinematic 4K",
    "Santorini cliffside during sunset with beautiful white buildings and blue domes, warm sunlight reflecting across the Aegean Sea, clouds slowly moving across the sky, people walking along the narrow streets, cinematic drone camera slowly flying over the coastline, ultra realistic, cinematic 4K",
  ];

  const loadingMessages = [
    "✨ Understanding your prompt...",
    "🧠 Imagining the perfect scene...",
    "🎬 Planning your video...",
    "🎨 Creating visuals and scenes...",
    "🌈 Adding colors, lighting & atmosphere...",
    "🎞️ Animating every frame...",
    "🔊 Adding motion and cinematic effects...",
    "🔍 Refining every detail...",
    "💎 Enhancing video quality...",
    "🚀 Rendering your final video...",
    "🎉 Your video is almost ready...",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowPromptSuggestions(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const handlePromptSelect = (prompt) => {
    setPrompt(prompt);
    setShowPromptSuggestions(false);
  };

  const generatePrompt = () => {
    if (user.memberShipStatus === "new") {
      toast.warning("Please subscribe to membership plans");
      return;
    }

    if (!prompt) {
      toast.error("Please enter a prompt to generate an improved prompt");
      return;
    }

    setShowPromptConfirm(true);
  };

  const isWholeNumber = (value) => {
    return /^\d+$/.test(value);
  };

  const generateVideo = async () => {
    if (user.memberShipStatus === "new") {
      toast.warning("Please subscribe to membership plans");
      return;
    }

    if (!prompt) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }

    if (!isWholeNumber(duration)) {
      toast.warning("Duration should be number");
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("GENERATE_VIDEO");
      const response = await generateAiVideo({
        prompt,
        userId: user._id,
        duration: parseInt(duration ?? "8"),
      });
      setLoadingButton(null);
      setLoading(false);
      if (response.success) {
        setVideo(response.video_url);
        toast.success("Video created successfully");
      } else {
        setVideo(null);
        toast.success("Failed to create video");
      }
    } catch (error) {
      console.log(error);
      setVideo(null);
      setLoading(false);
      setLoadingButton(null);
      toast.error("Failed to create video");
    }
  };

  const callGeneratePromptApi = async () => {
    setShowPromptConfirm(false);
    try {
      setLoadingButton("GENERATE_PROMPT");
      const response = await generateAiPrompt({ prompt, userId: user._id });
      setLoadingButton(null);
      if (response.success) {
        setPrompt(response.prompt);
        toast.success("Prompt generated successfully");
      } else {
        toast.error(response.message || "Failed to generate prompt");
      }
    } catch (error) {
      console.log(error);
      setLoadingButton(null);
      toast.error(error.response?.data?.message || "Failed to generate prompt");
    }
  };

  const clearCreateImage = () => {
    setLoading(false);
    setPrompt("");
    setImage(null);
  };

  const downloadImage = async (fileName = "AICreatedImage.png") => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const shareImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const file = new File([blob], "AICreatedImage.png", {
        type: blob.type,
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "AI Generated Image",
          text: "Check out this image!",
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: "AI Generated Image",
          text: "Check out this image!",
          url: image,
        });
      } else {
        await navigator.clipboard.writeText(image);
        alert("Sharing is not supported. Image URL copied to clipboard.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <section className="create-image">
      <Link to={from ? from : "/"} className="back-home">
        <IoArrowBack />
        <span>Back</span>
      </Link>
      <div className="image-page">
        <div className="preview-card">
          {loading ? (
            <LoadingStatus
              loadingMessages={loadingMessages}
              headingText="Creating Your Image"
            />
          ) : video ? (
            <>
              <div className="image-preview">
                <video src={video} controls playsInline />
                <div className="image-actions">
                  <button
                    className="image-action-btn"
                    onClick={() => downloadImage()}
                  >
                    <FiDownload />
                  </button>

                  <button
                    className="image-action-btn"
                    onClick={() => shareImage()}
                  >
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="placeholder">
              <div className="placeholder-icon">📹</div>
              <h2>Create Amazing AI Videos</h2>
              <p>Describe your vision, and let AI create it for you.</p>
            </div>
          )}
        </div>
        <div className="prompt-card" style={{ paddingTop: "2rem" }}>
          <Input
            textarea={true}
            rows={isMobile ? 10 : isTablet ? 10 : 19}
            id="prompt"
            name="prompt"
            label="Prompt for Creating Image"
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />

          <Input
            id="duration"
            name="duration"
            label="Duration"
            placeholder="Please enter duration in second(s)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            disabled={loading}
            style={{ border: "none" }}
            normalInput="Y"
          />

          <div className="button-row">
            <div className="dropdown" ref={dropdownRef}>
              <Button
                onClick={generateVideo}
                loading={loadingButton === "GENERATE_VIDEO"}
                disabled={loadingButton !== null}
                style={{ padding: ".9rem" }}
              >
                Create Video
              </Button>
              {showPromptSuggestions && (
                <div className="dropdown-menu custom-scrollbar">
                  <h4 className="dropdown-heading">
                    ✨ Please select a prompt
                  </h4>
                  {samplePrompts.map((item) => (
                    <button key={item} onClick={() => handlePromptSelect(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              style={{ padding: ".9rem" }}
              loading={loadingButton === "GENERATE_PROMPT"}
              disabled={loadingButton !== null}
              onClick={generatePrompt}
            >
              Generate Prompt
            </Button>
            <Button
              disabled={loadingButton !== null}
              style={{ padding: ".9rem" }}
              onClick={() => clearCreateImage()}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      <ConfirmPopup
        isOpen={showPromptConfirm}
        message="Generating an AI prompt will consume 50 credits from your available balance. Do you want to continue?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => callGeneratePromptApi()}
        onCancel={() => setShowPromptConfirm(false)}
      />
    </section>
  );
};

export default CreateVideo;