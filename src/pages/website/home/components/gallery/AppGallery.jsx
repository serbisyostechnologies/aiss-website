import { useState } from "react";
import "./AppGallery.css";

const filters = ["All", "Images", "Videos", "Collages"];
const items = [
  {
    id: 2,
    image: "/gallery/image1.png",
  },
  {
    id: 4,
    image: "/gallery/image2.png",
  },
  {
    id: 5,
    image: "/gallery/image3.png",
  },
  {
    id: 6,
    image: "/gallery/image4.png",
  },
  {
    id: 7,
    image: "/gallery/image5.png",
  },
  {
    id: 8,
    image: "/gallery/image6.png",
  },
];

const AppGallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <section className="workflow-section glass" style={{ marginTop: "5rem" }}>
      <div className="workflow-container">
        <div className="workflow-content">
          <span className="workflow-badge">✨ Community Creations</span>

          <h2 className="inspiring-title">
            Inspiring <span>Creations</span>
            <br />
            Made with AI
          </h2>

          <p>Explore amazing creations from our community of of creators.</p>
        </div>

        <div className="community-right">
          <div className="community-tabs">
            {filters.map((item, index) => (
              <button
                key={item}
                className={selectedFilter === item ? "active" : ""}
                onClick={() => setSelectedFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {items.map((item) => (
              <div className="gallery-card" key={item.id}>
                <img src={item.image} alt="" />

                {item.video && (
                  <div className="play-btn">
                    <HiOutlinePlay />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppGallery;