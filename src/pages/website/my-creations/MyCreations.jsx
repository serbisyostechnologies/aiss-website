import { useEffect, useMemo, useRef, useState } from "react";
import usePageTitle from "../../../hooks/usePageTitle";
import "./MyCreations.css";
import {
  HiOutlineSquares2X2,
  HiOutlinePhoto,
  HiOutlineHeart,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineEllipsisHorizontal,
  HiOutlineArrowDownTray,
  HiOutlineCheck,
  HiOutlineArrowsPointingOut,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineClock,
  HiOutlineEye,
  HiHeart,
  HiOutlineXMark
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import Loader from "../../../components/common/loader/Loader";
import { toast } from "react-toastify";
import {
  getUserCreations,
  deleteUserCreations,
} from "../../../services/userService";
import ConfirmPopup from "../../../components/common/confirm/ConfirmPopup";
import { useNavigate } from "react-router-dom";

const MyCreations = () => {
  usePageTitle("My Creations | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const getCreations = async () => {
      setLoading(true);
      const response = await getUserCreations({ userId: user._id });
      setLoading(false);
      setCreations(response.success ? response.creations : []);
    };

    getCreations();
  }, [refresh]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(".card-more")) return;
      if (event.target.closest(".action-menu")) return;
      setMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const counts = useMemo(
    () => ({
      all: creations.length,
      create: creations.filter((item) => item.operation === "create").length,
      edit: creations.filter((item) => item.operation === "edit").length,
      collage: creations.filter((item) => item.operation === "collage").length,
    }),
    [creations],
  );

  const filtered = useMemo(() => {
    setSelectedIds([]);
    return creations
      .filter((item) => {
        const matchesType =
          activeFilter === "all" || item.operation === activeFilter;
        const matchesFavorite = !favoritesOnly || item.favorite;

        return matchesType && matchesFavorite;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [creations, activeFilter, sortBy, favoritesOnly]);

  const filters = [
    { label: "All", value: "all" },
    { label: "Created", value: "create" },
    { label: "Edited", value: "edit" },
    { label: "Collage", value: "collage" },
  ];

  const typeLabels = {
    create: "Created",
    edit: "Edited",
    collage: "Collage",
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const toggleSelected = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id],
    );
  };

  const toggleFavorite = (id) => {
    
  };

  const selectAllVisible = () => {
    const visibleIds = filtered.map((item) => item._id);
    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((_id) => selectedIds.includes(_id));

    setSelectedIds((previous) =>
      allSelected
        ? previous.filter((id) => !visibleIds.includes(id))
        : [...new Set([...previous, ...visibleIds])],
    );
  };

  const deleteSelected = async () => {
    setShowPromptConfirm(false);

    if (selectedIds.length === 0) {
      toast.error("Please select creations to delete");
      return;
    }

    try {
      setLoading(true);
      const response = await deleteUserCreations({
        generationIds: selectedIds,
      });
      setLoading(false);
      setSelectedIds([]);
      if (response.success) {
        toast.success("Creation(s) delete successfully");
        setRefresh(!refresh);
      } else {
        toast.error("Unable to delete creations. Please try again later");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Unable to delete creations. Please try again later");
    }
  };

  const downloadCreation = async (item) => {
    try {
      if (!item?.result) {
        throw new Error("Image URL is missing.");
      }

      const imageUrl = item.result;

      // Extract filename from URL, including Cloudinary URLs.
      const url = new URL(imageUrl);
      const urlFileName = decodeURIComponent(
        url.pathname.split("/").pop() || "",
      );

      const fileName = urlFileName || `${item.title || "AICreatedImage"}.png`;

      // Native Android WebView download.
      if (window.Android?.downloadImage) {
        window.Android.downloadImage(imageUrl, fileName);
        return;
      }

      // Browser fallback.
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = fileName;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      // Revoke after the browser has had time to process the download.
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      console.error("Download failed:", error);

      // Optional fallback: open the image URL if downloading fails.
      if (item?.result) {
        window.open(item.result, "_blank", "noopener,noreferrer");
      }

      toast.error("Unable to download image. Please try again.");
    }
  };

  const headingMessage = filtered.length == 0 && (activeFilter == "all" || activeFilter == "create") ? "No images found" : filtered.length == 0 && activeFilter == "edit" ? "No edited images found" : "No image collages found";
  const buttonText = filtered.length == 0 && (activeFilter == "all" || activeFilter == "create") ? "Create Image" : filtered.length == 0 && activeFilter == "edit" ? "Edit Image" : "Create Image Collage";

  const navigateToFeatures = () => {
    switch(buttonText) {
      case 'Create Image': navigate('/features/image/create'); break;
      case 'Edit Image': navigate('/features/image/edit'); break;
      case 'Create Image Collage': navigate('/features/image/collage'); break;
    }
  }

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
                <span>{counts[filter.value]}</span>
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

        {selectedIds.length > 0 && (
          <div className="bulk-bar">
            <span>{selectedIds.length} selected</span>
            <button onClick={selectAllVisible}>Select All</button>
            <button onClick={() => setSelectedIds([])}>Unselect All</button>
            <button
              className="danger-button"
              onClick={() => setShowPromptConfirm(!showPromptConfirm)}
            >
              <HiOutlineTrash /> Delete selected
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className={`creations ${view === "list" ? "is-list" : ""}`}>
            {filtered.map((item) => (
              <article
                className={`card ${
                  selectedIds.includes(item._id) ? "is-selected" : ""
                }`}
                key={item._id}
              >
                <div className="card-image">
                  <img
                    src={item.result}
                    alt={item.result}
                    loading="lazy"
                    onClick={() => setPreview(item)}
                  />

                  <label className="select-control" title="Select creation">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item._id)}
                      onChange={() => toggleSelected(item._id)}
                      aria-label={`Select ${item.title}`}
                    />
                    <span>
                      <HiOutlineCheck />
                    </span>
                  </label>

                  <button
                    className="card-more"
                    aria-label={`More actions for ${item._id}`}
                    aria-expanded={menuId === item._id}
                    onClick={() =>
                      setMenuId((currentId) =>
                        currentId === item._id ? null : item._id,
                      )
                    }
                  >
                    <HiOutlineEllipsisHorizontal />
                  </button>

                  {menuId === item._id && (
                    <div className="action-menu">
                      <button
                        onClick={() => {
                          setPreview(item);
                          setMenuId(null);
                        }}
                      >
                        <HiOutlineEye /> Preview
                      </button>
                      <button
                        onClick={() => {
                          toggleFavorite(item._id);
                          setMenuId(null);
                        }}
                      >
                        <HiOutlineHeart />
                        {item.favorite ? "Remove favorite" : "Add favorite"}
                      </button>
                      <button onClick={() => downloadCreation(item)}>
                        <HiOutlineArrowDownTray /> Download
                      </button>
                      <button
                        className="menu-danger"
                        onClick={() => {
                          setShowPromptConfirm(!showPromptConfirm);
                          setSelectedIds([item._id]);
                        }}
                      >
                        <HiOutlineTrash /> Delete
                      </button>
                    </div>
                  )}

                  <span className={`type-badge type-${item.operation}`}>
                    {typeLabels[item.operation]}
                  </span>

                  <button
                    className={`preview-button`}
                    aria-label={`Preview ${item.title}`}
                    onClick={() => setPreview(item)}
                  >
                    <HiOutlineArrowsPointingOut />
                  </button>
                </div>

                <div className="card-details">
                  <div className="card-text">
                    <h2 title={item.title}>{item.title}</h2>
                    <p>
                      <HiOutlineClock />
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <div className="card-actions">
                    <button
                      className={`icon-button favorite ${
                        item.favorite ? "is-favorite" : ""
                      }`}
                      onClick={() => toggleFavorite(item._id)}
                      aria-label={
                        item.favorite ? "Remove favorite" : "Add favorite"
                      }
                    >
                      <HiOutlineHeart />
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => downloadCreation(item)}
                      aria-label={`Download ${item.title}`}
                    >
                      <HiOutlineArrowDownTray />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <HiOutlinePhoto />
            </div>
            <h2>{headingMessage}</h2>
            <button className="create-button" onClick={() => navigateToFeatures()}>
              {buttonText} <HiOutlinePlus />
            </button>
          </div>
        )}

        <div className="results-footer">
          Showing {filtered.length} of {creations.length} creations
        </div>

        {preview && (
          <div
            className="modal-backdrop"
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) setPreview(null);
            }}
          >
            <section
              className="preview-modal"
              role="dialog"
              aria-modal="true"
              aria-label={preview._id}
            >
              <header className="modal-header">
                <div>
                  <span className={`type-badge type-${preview.operation}`}>
                    {typeLabels[preview.operation]}
                  </span>
                  <p>{formatDate(preview.createdAt)}</p>
                </div>
                <button
                  className="icon-button"
                  onClick={() => setPreview(null)}
                  aria-label="Close preview"
                >
                  <HiOutlineXMark />
                </button>
              </header>
              <div className="modal-image">
                <img src={preview.result} alt={preview.result} />
              </div>
              <footer className="modal-footer">
                <button
                  className="secondary-button"
                  onClick={() => toggleFavorite(preview._id)}
                >
                  <HiOutlineHeart />
                  {preview.favorite ? "Favorited" : "Add to favorites"}
                </button>
                <button
                  className="create-button"
                  onClick={() => downloadCreation(preview)}
                >
                  <HiOutlineArrowDownTray /> Download image
                </button>
              </footer>
            </section>
          </div>
        )}
      </div>

      {loading && <Loader fullScreen={true} />}
      <ConfirmPopup
        isOpen={showPromptConfirm}
        message={
          "Selected creations will be deleted permanently.\nDo you want to continue?"
        }
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => deleteSelected()}
        onCancel={() => {
          setSelectedIds([]);
          setShowPromptConfirm(false);
        }}
      />
    </>
  );
};

export default MyCreations;