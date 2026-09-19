import "../Common.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Input from "../../../../../components/common/input/Input";
import Button from "../../../../../components/common/button/Button";
import ConfirmPopup from "../../../../../components/common/confirm/ConfirmPopup";
import { toast } from "react-toastify";
import { generateAiPrompt, generateAiImage } from "../../../../../services/serbisyosService";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";
import { FiDownload, FiShare2 } from "react-icons/fi";

const CreateImage = () => {
  usePageTitle("Create AI Image | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
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
    "A futuristic cyberpunk city glowing under neon rain, flying cars, cinematic lighting, ultra-detailed, photorealistic, 8K",
    "A majestic dragon sleeping around a crystal castle on top of snowy mountains, magical atmosphere, ultra realistic",
    "A hidden tropical waterfall surrounded by lush rainforest, sunlight rays, crystal-clear water, photorealistic",
    "A luxury glass villa built into a cliff overlooking the ocean during sunset, modern architecture, realistic",
    "A futuristic electric supercar parked under neon city lights after rain, cinematic reflections",
    "A majestic white tiger walking through a glowing bamboo forest at night, ultra realistic",
    "A gourmet cheeseburger with melted cheese, crispy fries, dramatic studio lighting, commercial food photography",
    "A confident young woman wearing futuristic cyberpunk fashion with neon lighting, ultra realistic portrait",
    "A dreamlike floating island above the clouds painted in surreal fantasy style",
    "Santorini cliffside during sunset with white buildings and blue domes, ultra realistic",
  ];

  const loadingMessages = [
    "✨ Understanding your prompt...",
    "🧠 Imagining the perfect scene...",
    "🎨 Creating your artwork...",
    "🌈 Adding colors and lighting...",
    "🔍 Refining every detail...",
    "💎 Enhancing image quality...",
    "🚀 Rendering the final image...",
    "🎉 Your masterpiece is almost ready...",
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
    if( user.memberShipStatus === "new" ) {
      toast.warning("Please subscribe to membership plans");
      return;
    }
    
    if (!prompt) {
      toast.error("Please enter a prompt to generate an improved prompt");
      return;
    }

    setShowPromptConfirm(true);
  };

  const generateImage = async () => {
    if( user.memberShipStatus === "new" ) {
      toast.warning("Please subscribe to membership plans");
      return;
    }

    if (!prompt) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("GENERATE_IMAGE");
      const response = await generateAiImage({
        prompt,
        userId: user._id,
      });
      setLoadingButton(null);
      setLoading(false);
      if (response.success) {
        setImage(response.image_url);
        toast.success("Image created successfully");
      } else {
        setImage(null);
        toast.success("Failed to create image");
      }
    } catch (error) {
      console.log(error);
      setImage(null);
      setLoading(false);
      setLoadingButton(null);
      toast.error("Failed to create image");
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
          ) : image ? (
            <>
              <div className="image-preview">
                <img src={image} alt="Generated" />

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
              <div className="placeholder-icon">🎨</div>
              <h2>Create Amazing AI Images</h2>
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

          <div className="button-row">
            <div className="dropdown" ref={dropdownRef}>
              <Button
                onClick={generateImage}
                loading={loadingButton === "GENERATE_IMAGE"}
                disabled={loadingButton !== null}
                style={{ padding: ".9rem" }}
              >
                Create Image
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

export default CreateImage;