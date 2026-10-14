import "./ImageGrid.css"
import { FaTimes } from "react-icons/fa";

export default function ImageGrid({ images, setImages, previews, setPreviews }) {
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div className="image-grid-item" key={`${image.name}-${index}`}>
          <img
            src={previews[index]}
            alt={image.name}
            className="image-grid-preview"
          />

          <button
            type="button"
            className="image-grid-remove"
            onClick={() => removeImage(index)}
            aria-label={`Remove ${image.name}`}
          >
            <FaTimes />
          </button>

          <div className="image-grid-caption">{image.name}</div>
        </div>
      ))}
    </div>
  );
}