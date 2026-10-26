import "../../../features/Common.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Button from "../../../../../components/common/button/Button";
import Input from "../../../../../components/common/input/Input";
import ConfirmPopup from "../../../../../components/common/confirm/ConfirmPopup";
import { toast } from "react-toastify";
import {
  editAiImage,
  generateAiPrompt,
} from "../../../../../services/serbisyosService";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";
import { FiDownload, FiShare2 } from "react-icons/fi";
import FullScreenLoader from "../../../../../components/common/floader/FullScreenLoader";
import { getPrompts } from "../../../../../services/promptService";

const EditImage = () => {
  usePageTitle("AI Image Editing | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);

  const [prompt, setPrompt] = useState("");
  const [prompts, setPrompts] = useState();
  const [expandedOccasion, setExpandedOccasion] = useState(null);
  const [original, setOriginal] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [imageSize, setImageSize] = useState("1024x1024");
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const [promptPopupStyle, setPromptPopupStyle] = useState({});
  const promptsButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const from = location?.state?.from;

  const samplePrompts = [];

  const loadingMessages = [
    "✨ Analyzing your image...",
    "🧠 Understanding your editing instructions...",
    "🎨 Applying your requested changes...",
    "🌈 Adjusting colors and lighting...",
    "🪄 Transforming your image...",
    "🔍 Refining details and textures...",
    "💎 Enhancing image quality...",
    "🎉 Your edited image is almost ready...",
  ];

  useEffect(() => {
    setPrompts([]);
    const getEditPrompts = async () => {
      setFullLoading(true);
      const response = await getPrompts({ operation: "EDIT" });
      setFullLoading(false);
      if (response.success) {
        response.data.push({
          occasion: {
            id: "",
            name: "Generic Prompts",
          },
          prompt: [
            "Replace the background with a beautiful sunset beach, keeping the subject unchanged",
            "Enhance the image with cinematic lighting, rich colors, and professional photo quality",
            "Remove unwanted objects from the background and naturally fill the empty areas",
            "Transform this photo into a futuristic cyberpunk scene with neon lights and rain",
            "Change the background to a lush tropical rainforest with soft sunlight rays",
            "Give this image a luxury editorial look with elegant tones and studio lighting",
            "Convert this photo into a realistic winter scene with falling snow",
            "Improve facial lighting, skin tones, and sharpness while preserving natural features",
            "Turn this image into a dreamy fantasy scene with glowing particles and magical lighting",
            "Make the colors vibrant, enhance details, and create a professional HDR photography look",
          ],
        });
        setPrompts(response.data);
      }
    };

    getEditPrompts();
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

  const editImage = async () => {
    if (user.memberShipStatus === "new") {
      toast.warning("Please subscribe to membership plans");
      return;
    }

    if (!original) {
      toast.error("Please upload an image to edit");
      return;
    }

    if (!prompt || prompt?.trim() === "") {
      toast.error("Please enter/select a prompt to create an image");
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("EDIT_IMAGE");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", prompt);
      formData.append("userId", user._id);
      formData.append("imageSize", imageSize);

      const response = await editAiImage(formData);
      setLoadingButton(null);
      setLoading(false);
      if (response.success) {
        setOriginal(null);
        setImage(response.image_url);
        toast.success("Image edited successfully");
      } else {
        setImage(null);
        toast.success("Failed to create image");
      }
    } catch (error) {
      setImage(null);
      setLoading(false);
      setLoadingButton(null);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        error.message ||
        "Something went wrong while editing the image.";
      toast.error(message);
    }
  };

  const handleFileChange = (event) => {
    setImage(null);
    const file = event.target.files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please upload an image");
      return;
    }

    setOriginal(URL.createObjectURL(file));
    setFile(file);
  };

  const clearEditImage = () => {
    setLoading(false);
    setPrompt("");
    setImage(null);
    setOriginal(null);
    setFile(null);
    setImageSize("1024x1024");
  };

  const downloadImage = async (fileName = "AIEditImage.png") => {
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

          const file = new File([blob], `AIEditImage.${extension}`, {
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

  const togglePromptDropdown = () => {
    const button = dropdownRef.current?.querySelector("button");

    if (!button) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }

    const rect = button.getBoundingClientRect();

    setPromptPopupStyle({
      position: "fixed",
      bottom: `${window.innerHeight - rect.top + 12}px`,
      right: "16px",
      left: "auto",
      width: `${Math.min(800, window.innerWidth - 32)}px`,
      height: `${Math.min(560, window.innerHeight - 32)}px`,
    });

    setExpandedOccasion(null);
    setShowPromptSuggestions((prev) => !prev);
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
              headingText="Editing Your Image"
            />
          ) : image || original ? (
            <>
              <div className="image-preview">
                {original && <img src={original} alt="Generated" />}

                {image && <img src={image} alt="Generated" />}

                {image && (
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
                )}
              </div>
            </>
          ) : (
            <div className="placeholder">
              <div className="placeholder-icon">🖌️</div>
              <h2>Turn Ordinary Into Extraordinary</h2>
              <p>
                Upload your image, describe your edits, and let AI transform it.
              </p>
            </div>
          )}
        </div>
        <div className="prompt-card" style={{ paddingTop: "2rem" }}>
          <Input
            textarea={true}
            rows={isMobile ? 10 : isTablet ? 10 : 19}
            id="prompt"
            name="prompt"
            label="Prompt for Editing Image"
            placeholder="Describe how you want to edit your image..."
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
          <div className="edit-button-row">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            <Button
              onClick={() => fileInputRef.current.click()}
              disabled={loadingButton !== null}
              style={{ padding: ".9rem" }}
            >
              Upload
            </Button>
            <div className="dropdown" ref={dropdownRef}>
              <Button
                ref={promptsButtonRef}
                onClick={togglePromptDropdown}
                disabled={loadingButton !== null}
                style={{ padding: ".9rem" }}
              >
                Prompts
              </Button>
              {showPromptSuggestions && (
                <div className="dropdown-menu custom-scrollbar" style={promptPopupStyle}>
                  <h4 className="dropdown-heading">✨ Please select prompt</h4>
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
                              <h3>{item.occasion.name}</h3>
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
              onClick={editImage}
              loading={loadingButton === "EDIT_IMAGE"}
              disabled={loadingButton !== null}
              style={{ padding: ".9rem" }}
            >
              Edit Image
            </Button>
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
              onClick={() => clearEditImage()}
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
      {fullLoading && <FullScreenLoader />}
    </section>
  );
};

export default EditImage;