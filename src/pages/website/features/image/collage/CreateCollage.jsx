import "../../../features/Common.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import Input from "../../../../../components/common/input/Input";
import Button from "../../../../../components/common/button/Button";
import ConfirmPopup from "../../../../../components/common/confirm/ConfirmPopup";
import ImageGrid from "../../../../../components/common/igrid/ImageGrid";
import {
  createAiImageCollage,
  generateAiPrompt,
} from "../../../../../services/serbisyosService";
import { toast } from "react-toastify";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";
import { FiDownload, FiShare2 } from "react-icons/fi";

const CreateCollage = () => {
  usePageTitle("AI Image Collage | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);

  const [prompt, setPrompt] = useState("");
  const [originals, setOriginals] = useState([]);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [imageSize, setImageSize] = useState("1024x1024");
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const from = location?.state?.from;

  const samplePrompts = [
    "Create a stunning Instagram-worthy photo collage with a modern editorial layout, soft neutral tones, elegant typography, and a premium aesthetic",
    "Design a futuristic cyberpunk collage featuring neon lights, electric purple and cyan gradients, cinematic cityscapes, and bold visual compositions",
    "Create a luxury fashion magazine collage with high-end editorial layouts, minimalist typography, sophisticated colors, and premium photography aesthetics",
    "Transform these photos into a dreamy Pinterest-style collage with Polaroid frames, handwritten notes, scrapbook textures, and delicate pastel colors",
    "Create a cinematic travel collage featuring breathtaking landscapes, aesthetic photo grids, film grain, vintage postcards, and immersive storytelling",
    "Design a vibrant Y2K-inspired collage with chrome effects, holographic gradients, retro stickers, bold typography, and playful futuristic elements",
    "Create a beautiful couple memories collage with romantic photo arrangements, warm sunset tones, subtle hearts, handwritten captions, and a timeless aesthetic",
    "Design a modern mood board collage combining minimalist photography, fashion inspiration, color swatches, magazine cutouts, and clean editorial spacing",
    "Create a bold social media collage with dynamic photo layouts, vibrant gradients, oversized typography, layered images, and eye-catching Gen Z aesthetics",
    "Design a premium cinematic photo collage with overlapping images, dramatic lighting, dark luxury tones, subtle textures, and a sophisticated visual hierarchy",
  ];

  const loadingMessages = [
    "✨ Preparing your photos for a stunning collage...",
    "🧠 Understanding your collage style and layout...",
    "🎨 Designing a beautiful visual composition...",
    "🖼️ Arranging your photos into a seamless layout...",
    "🌈 Blending colors, tones, and creative elements...",
    "🪄 Adding artistic touches and modern aesthetics...",
    "💎 Refining image alignment, spacing, and details...",
    "🔥 Giving your collage a premium, polished look...",
    "🔍 Checking composition and visual consistency...",
    "🎉 Your stunning AI collage is almost ready...",
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

  const createCollage = async () => {
    if (user.memberShipStatus === "new") {
      toast.warning("Please subscribe to membership plans");
      return;
    }

    if (!prompt) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }

    if (originals.length == 0) {
      toast.error("Please upload images to create collage");
      return;
    }

    if (originals.length < 2) {
      toast.error("Please select at least 2 images");
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("EDIT_IMAGE");

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("prompt", prompt);
      formData.append("userId", user._id);
      formData.append("imageSize", imageSize);

      const response = await createAiImageCollage(formData);
      setLoadingButton(null);
      setLoading(false);
      if (response.success) {
        setOriginals([]);
        setFiles([]);
        setImage(response.image_url);
        toast.success("Image collage created successfully");
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
    const uploadedImages = Array.from(event.target.files || []);

    if (uploadedImages && uploadedImages.length > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      uploadedImages.map((file) => {
        if (file && allowedTypes.includes(file.type)) {
          setOriginals((prev) => [...prev, URL.createObjectURL(file)]);
          setFiles((files) => [...files, file]);
        }
      });
    }

    if (files.length > 10) {
      toast.error("Please upload only 10 images to create meaningful collage!");

      setFiles((files) => files.slice(0, 10));
      setOriginals((originals) => originals.slice(0, 10));
    }
  };

  const clearImageCollage = () => {
    setLoading(false);
    setPrompt("");
    setImage(null);
    setOriginals([]);
    setFiles([]);
    setImageSize("1024x1024");
  };

  const downloadImage = async (fileName = "AIImageCollage.png") => {
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

          const file = new File([blob], `AIImageCollage.${extension}`, {
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
              headingText="Creating Your Image Collage"
            />
          ) : image || originals.length > 0 ? (
            <>
              <div className="image-preview">
                {originals && (
                  <ImageGrid
                    images={files}
                    setImages={setFiles}
                    previews={originals}
                    setPreviews={setOriginals}
                  />
                )}

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
              <div className="placeholder-icon">🖼️</div>
              <h2>Transform Memories Into Stunning Collages</h2>
              <p>
                Create stunning collages, combine your favorite images, and turn
                them into beautiful visual stories with AI.
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
          <div className="button-row">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              multiple
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
                onClick={createCollage}
                loading={loadingButton === "EDIT_IMAGE"}
                disabled={loadingButton !== null}
                style={{ padding: ".9rem" }}
              >
                Create Collage
              </Button>
              {showPromptSuggestions && (
                <div
                  className="dropdown-menu custom-scrollbar"
                  style={{ right: "0" }}
                >
                  <h4 className="dropdown-heading">
                    ✨ Please select a prompt
                  </h4>
                  {samplePrompts.map((item) => (
                    <button
                      key={item}
                      onClick={() => handlePromptSelect(item)}
                      className="dropdown-menu-button"
                    >
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
              onClick={() => clearImageCollage()}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      <ConfirmPopup
        isOpen={showPromptConfirm}
        message={"Generating an AI prompt will consume 50 credits from your available balance.\nDo you want to continue?"}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => callGeneratePromptApi()}
        onCancel={() => setShowPromptConfirm(false)}
      />
    </section>
  );
};

export default CreateCollage;