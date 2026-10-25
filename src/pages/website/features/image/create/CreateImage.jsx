import "../../../features/Common.css";
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
import {
  generateAiPrompt,
  generateAiImage,
} from "../../../../../services/serbisyosService";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { getPrompts } from "../../../../../services/promptService";

const CreateImage = () => {
  usePageTitle("Create AI Image | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);

  const [prompt, setPrompt] = useState("");
  const [prompts, setPrompts] = useState();
  const [expandedOccasion, setExpandedOccasion] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [imageSize, setImageSize] = useState("1024x1024");
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const dropdownRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const from = location?.state?.from;

  const samplePrompts = [
    
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
    setPrompts([]);
    const getCreatePrompts = async () => {
      const response = await getPrompts({ operation: "CREATE" });
      if (response.success) {
        response.data.push({
          occasion: {
            id: "",
            name: "Generic Prompts"
          },
          prompt: [
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
          ]
        })
        setPrompts(response.data);
      }
    };

    setLoading(true);
    getCreatePrompts();
    setLoading(false);
  }, []);

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

  const generateImage = async () => {
    setExpandedOccasion(null);
    if (user.memberShipStatus === "new") {
      toast.warning("Please subscribe to membership plans");
      return;
    }

    if( !prompt || prompt?.trim() === "" ) {
      toast.error("Please enter/select a prompt to create an image");
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("GENERATE_IMAGE");
      const response = await generateAiImage({
        prompt,
        userId: user._id,
        imageSize,
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
      setImage(null);
      setLoading(false);
      setLoadingButton(null);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later.",
      );
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
    setImageSize("1024x1024");
  };

  const downloadImage = async (fileName = "AICreatedImage.png") => {
    try {
      if (!image) {
        throw new Error("Image URL is missing.");
      }

      // Use native Android download when running inside WebView.
      if (window.Android?.downloadImage) {
        window.Android.downloadImage(image, fileName);
        return;
      }

      // Browser fallback.
      const response = await fetch(image);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const shareImage = async () => {
    if (!image) {
      alert("Image not found.");
      return;
    }

    try {
      // Android WebView can expose a native bridge.
      if (window.Android?.shareImage) {
        window.Android.shareImage(image);
        return;
      }

      // Prefer sharing the actual image file when supported.
      if (navigator.share && navigator.canShare) {
        try {
          const response = await fetch(image);

          if (!response.ok) {
            throw new Error(`Image request failed: ${response.status}`);
          }

          const blob = await response.blob();

          const mimeType = blob.type || "image/png";
          const extension = mimeType.includes("jpeg")
            ? "jpg"
            : mimeType.includes("webp")
              ? "webp"
              : mimeType.includes("png")
                ? "png"
                : "png";

          const file = new File([blob], `AICreatedImage.${extension}`, {
            type: mimeType,
          });

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "AI Generated Image",
              text: "Check out this image!",
              files: [file],
            });
            return;
          }
        } catch (error) {
          console.warn("Image file sharing unavailable:", error);
        }

        // Fallback: share the image URL.
        await navigator.share({
          title: "AI Generated Image",
          text: "Check out this image!",
          url: image,
        });

        return;
      }

      // Last fallback: copy the URL.
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(image);
        alert("Image URL copied to clipboard.");
      } else {
        window.prompt("Copy this image URL:", image);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error.name, error.message);
        alert(`Unable to share image: ${error.message}`);
      }
    }
  };

  const toggleOccasion = (id) => {
    setExpandedOccasion((prev) => (prev === id ? null : id));
  };

  return (
    <section className="image-section">
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
        <div className="prompt-card">
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
          <div className="image-size-section">
            <div
              className={imageSize == "1024x1024" ? "size-selected" : ""}
              onClick={() => setImageSize("1024x1024")}
            >
              Square
            </div>
            <div
              className={imageSize == "1536x1024" ? "size-selected" : ""}
              onClick={() => setImageSize("1536x1024")}
            >
              Landscape
            </div>
            <div
              className={imageSize == "1024x1536" ? "size-selected" : ""}
              onClick={() => setImageSize("1024x1536")}
            >
              Portrait
            </div>
          </div>
          <div className="button-row">
            <div className="dropdown" ref={dropdownRef}>
              <Button
                onClick={() => setShowPromptSuggestions((prev) => !prev)}
                loading={loadingButton === "GENERATE_IMAGE"}
                disabled={loadingButton !== null}
                className="btn button-row-button"
              >
                Prompts
              </Button>
              {showPromptSuggestions && (
                <div
                  className="dropdown-menu custom-scrollbar">
                  <h4 className="dropdown-heading">
                    ✨ Please select a prompt
                  </h4>
                  {prompts.map((item) => {
                    const occasionId = item._id;
                    const isExpanded = expandedOccasion === occasionId;
                    return (
                      <div className="occasion-panel" key={occasionId}>
                        <button
                          type="button"
                          className={`occasion-header ${
                            isExpanded ? "active" : ""
                          }`}
                          onClick={() => toggleOccasion(occasionId)}
                          aria-expanded={isExpanded}
                        >
                          <div className="occasion-info">
                            <div>
                              <h3>
                                {item.occasion.name}
                              </h3>
                            </div>
                          </div>

                          <span
                            className={`accordion-arrow ${
                              isExpanded ? "rotated" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </button>
                        <div
                          className={`occasion-content ${
                            isExpanded ? "expanded" : ""
                          }`}
                        >
                          <div className="prompt-list">
                            {item.prompt.map((item, index) => (
                              <button
                                key={`${occasionId}-${index}`}
                                onClick={() => handlePromptSelect(item)}
                                className="dropdown-menu-button"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <Button
                onClick={generateImage}
                loading={loadingButton === "GENERATE_IMAGE"}
                disabled={loadingButton !== null}
                className="btn button-row-button"
              >
                Create Image
              </Button>
            <Button
              loading={loadingButton === "GENERATE_PROMPT"}
              disabled={loadingButton !== null}
              onClick={generatePrompt}
              className="btn button-row-button"
            >
              Generate Prompt
            </Button>
            <Button
              disabled={loadingButton !== null}
              onClick={() => clearCreateImage()}
              className="btn button-row-button"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      <ConfirmPopup
        isOpen={showPromptConfirm}
        message={
          "Generating an AI prompt will consume 50 credits from your available balance.\n\nDo you want to continue?"
        }
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => callGeneratePromptApi()}
        onCancel={() => setShowPromptConfirm(false)}
      />
    </section>
  );
};

export default CreateImage;