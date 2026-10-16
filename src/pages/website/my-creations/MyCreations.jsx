import { useEffect, useMemo, useState } from "react";
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
import { useSelector } from "react-redux";
import Loader from "../../../components/common/loader/Loader";
import { toast } from "react-toastify";
import { getUserCreations } from "../../../services/userService";
import ConfirmPopup from "../../../components/common/confirm/ConfirmPopup";

const MyCreations = () => {
  usePageTitle("My Creations | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);

  const [activeFilter, setActiveFilter] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);

  useEffect(() => {
    const getCreations = async () => {
      setLoading(true);
      const response = await getUserCreations({ userId: user._id });
      setLoading(false);
      setCreations(response.success ? response.creations : []);
    };

    getCreations();
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
    { label: "Edited", value: "edite" },
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
        : [...previous, id]
    );
  };

  const toggleFavorite = (id) => {
    setItems((previous) =>
      previous.map((item) =>
        item._id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const selectAllVisible = () => {
    const visibleIds = filtered.map((item) => item._id);
    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((_id) => selectedIds.includes(_id));

    setSelectedIds((previous) =>
      allSelected
        ? previous.filter((id) => !visibleIds.includes(id))
        : [...new Set([...previous, ...visibleIds])]
    );
  };

  const deleteCreation = (id) => {
    const item = items.find((creation) => creation._id === id);
    if (!item || !window.confirm(`Delete "${item.title}"?`)) return;

    onDelete?.(item);
    setItems((previous) => previous.filter((creation) => creation._id !== id));
    setSelectedIds((previous) => previous.filter((selectedId) => selectedId !== id));
    setMenuId(null);
    setPreview(null);
  };

  const deleteSelected = () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected creations?`)) {
      return;
    }

    const deletedItems = items.filter((item) => selectedIds.includes(item._id));
    deletedItems.forEach((item) => onDelete?.(item));
    setItems((previous) =>
      previous.filter((item) => !selectedIds.includes(item._id))
    );
    setSelectedIds([]);
  };

  const downloadCreation = async (item) => {
    try {
      const response = await fetch(item.result);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      const fileName = new URL(item.result).pathname.split("/").pop();
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch(error) {
      console.log(error);
      window.open(item.image, "_blank", "noopener,noreferrer");
    }
  };

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
            <button onClick={selectAllVisible}>Select all visible</button>
            <button onClick={() => setSelectedIds([])}>Clear selection</button>
            <button className="danger-button" onClick={() => setShowPromptConfirm(!showPromptConfirm)}>
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
                    aria-label={`More actions for ${item.title}`}
                    onClick={() =>
                      setMenuId(menuId === item._id ? null : item._id)
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
                        onClick={() => setShowPromptConfirm(!showPromptConfirm)}
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
            <h2>No creations found</h2>
            <button className="create-button" onClick={() => onCreateNew?.()}>
              Create your first image <HiOutlinePlus />
            </button>
          </div>
        )}

        <div className="results-footer">
          Showing {filtered.length} of {creations.length} creations
        </div>
      </div>

      {loading && <Loader fullScreen={true} />}
      <ConfirmPopup
        isOpen={showPromptConfirm}
        message="Selected creations will be deleted permanently. Do you want to continue?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => deleteSelected()}
        onCancel={() => setShowPromptConfirm(false)}
      />
    </>
  );
};

export default MyCreations;