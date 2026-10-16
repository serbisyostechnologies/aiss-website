import { useState } from "react";
import usePageTitle from "../../../hooks/usePageTitle";
import "./MyCreations.css";
import {
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlinePencilSquare,
  HiOutlineSquares2X2,
  HiOutlinePhoto,
  HiOutlineHeart,
  HiOutlineTrash,
  HiOutlineCog6Tooth,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineBell,
  HiOutlineEllipsisHorizontal,
  HiOutlineArrowDownTray,
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineArrowsPointingOut,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineTrash as TrashIcon,
  HiHeart,
} from "react-icons/hi2";

const MyCreations = () => {
  usePageTitle("My Creations | AISerbisyosStudio");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");

  const filters = [
    { label: "All creations", value: "all" },
    { label: "Created", value: "created" },
    { label: "Edited", value: "edited" },
    { label: "Collage", value: "collage" },
  ];

  return (
    <>
      <div className="my-creations-page">
        <div className="page-heading">
          <div>
            <h1>
              My <span>Creations</span>
            </h1>
            <p>All your generated, edited and collage images in one place.</p>
          </div>
        </div>

        <div className="toolbar">
          <div className="filters" role="tablist" aria-label="Creation type">
            {filters.map((filter) => (
              <button
                key={filter.value}
                role="tab"
                aria-selected={activeFilter === filter.value}
                className={`filter ${
                  activeFilter === filter.value ? "is-active" : ""
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
                <span>{0}</span>
              </button>
            ))}
          </div>

          <div className="toolbar-right">
            <button
              className={`secondary-button ${favoritesOnly ? "is-toggled" : ""}`}
              onClick={() => setFavoritesOnly((value) => !value)}
              aria-pressed={favoritesOnly}
            >
              {favoritesOnly ? <HiHeart /> : <HiOutlineHeart />} Favorites
            </button>

            <label className="sort">
              <HiOutlineAdjustmentsHorizontal />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort creations"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>

            <div className="view-switch" aria-label="View mode">
              <button
                className={view === "grid" ? "is-active" : ""}
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
              >
                <HiOutlineSquares2X2 />
              </button>
              <button
                className={view === "list" ? "is-active" : ""}
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
              >
                <span className="list-icon">☷</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCreations;