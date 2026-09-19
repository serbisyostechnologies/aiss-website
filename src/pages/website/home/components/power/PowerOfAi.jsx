import { useState, useRef } from "react";
import "./PowerOfAi.css";
import beforeImage from "../../../../../assets/images/hiworks/left.png";
import afterImage from "../../../../../assets/images/hiworks/right.png";

const PowerOfAi = ({ initialPosition = 50 }) => {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef(null);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let newPosition = ((clientX - rect.left) / rect.width) * 100;

    newPosition = Math.max(0, Math.min(100, newPosition));

    setPosition(newPosition);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      updatePosition(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section className="workflow-section glass" style={{ marginTop: "5rem" }}>
      <div className="workflow-container">
        <div className="workflow-content">
          <span className="workflow-badge">✨ Power of AI</span>

          <h2>
            See the Magic
            <br />
            <span>Before & After</span>
          </h2>

          <p>
            Experience the incredible power of AI transformation in real
            results.
          </p>
        </div>

        <div
          className="before-after__comparison"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <img
            src={afterImage}
            alt="After"
            className="before-after__image"
            draggable="false"
          />

          <div
            className="before-after__before"
            style={{
              width: `${position}%`,
            }}
          >
            <img
              src={beforeImage}
              alt="Before"
              className="before-after__image"
              draggable="false"
            />
          </div>

          <span className="before-after__label before-after__label--before">
            Before
          </span>

          <span className="before-after__label before-after__label--after">
            After
          </span>

          {/* Slider */}
          <div
            className="before-after__slider"
            style={{
              left: `${position}%`,
            }}
          >
            <button
              type="button"
              className="before-after__handle"
              onMouseDown={(e) => e.preventDefault()}
              aria-label="Compare before and after"
            >
              <span>‹</span>
              <span>›</span>
            </button>
          </div>

          {/* Invisible range for accessibility */}
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="before-after__range"
            aria-label="Before and after comparison"
          />
        </div>
      </div>
    </section>
  );
};

export default PowerOfAi;