import "../../../features/Common.css";
import "./EditImage.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Button from "../../../../../components/common/button/Button";
import Input from "../../../../../components/common/input/Input";
import ConfirmPopup from "../../../../../components/common/confirm/ConfirmPopup";

const EditImage = () => {
  usePageTitle("AI Image Editing | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);

  const [prompt, setPrompt] = useState("");
  const [original, setOriginal] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
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

  const editImage = () => {
    if (user.memberShipStatus === "new") {
      toast.warning("Please subscribe to membership plans");
      return;
    }

    if (!prompt) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setOriginal(URL.createObjectURL(file));
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
              headingText="Creating Your Image"
            />
          ) : image || original ? (
            <>
              <div className="image-preview">
                <img src={original} alt="Generated" />

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

          <div className="button-row">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            <Button
              onClick={() => fileInputRef.current.click()}
              loading={loadingButton === "GENERATE_IMAGE"}
              disabled={loadingButton !== null}
              style={{ padding: ".9rem" }}
            >
              Upload
            </Button>
            <div className="dropdown" ref={dropdownRef}>
              <Button
                onClick={editImage}
                loading={loadingButton === "GENERATE_IMAGE"}
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

export default EditImage;