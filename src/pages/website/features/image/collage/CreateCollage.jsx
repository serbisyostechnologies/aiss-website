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
  ];

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

    if (!prompt) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }

    if (originals.length == 0) {
      toast.error("Please upload an images to create collage");
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
        setOriginals(null);
        setImage(response.image_url);
        toast.success("Image edited successfully");
      } else {
        setImage(null);
        toast.success("Failed to create image");
      }
    } catch (error) {
      console.log(error);
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
      uploadedImages.map((file) => {
        setOriginals((prev) => [...prev, URL.createObjectURL(file)]);
      });
      setFiles((files) => [...files, ...uploadedImages]);
    }
  };

  const clearEditImage = () => {
    setLoading(false);
    setPrompt("");
    setImage(null);
    setOriginals([]);
    setFile(null);
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
                onClick={editImage}
                loading={loadingButton === "EDIT_IMAGE"}
                disabled={loadingButton !== null}
                style={{ padding: ".9rem" }}
              >
                Edit Image
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
              onClick={() => clearEditImage()}
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

export default CreateCollage;