import React, { useEffect, useState } from "react";
import "../css/Gallery.css";

const getImagesPerPage = () => {
  const width = window.innerWidth;
  if (width < 500) return 6;
  if (width < 768) return 8;
  return 10;
};

const Gallery = ({ isAdmin }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(getImagesPerPage());

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/get_images.php`, {
        credentials: "include",
      });
      const data = await res.json();
      setImages(data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setImagesPerPage(getImagesPerPage());
      setCurrentPage(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleImages = isAdmin
    ? images
    : images.filter((img) => img.published === 1);

  useEffect(() => {
    if (currentPage > Math.ceil(visibleImages.length / imagesPerPage)) {
      setCurrentPage(1);
    }
  }, [images, imagesPerPage, visibleImages.length]);

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/delete_image.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Image deleted.");
        fetchImages();
      } else {
        alert(data.error || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete image.");
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/toggle_publish.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, publish: currentStatus ? 0 : 1 }),
      });
      const data = await res.json();
      if (data.success) {
        fetchImages();
      } else {
        alert(data.error || "Failed to toggle publish status.");
      }
    } catch (err) {
      console.error("Toggle error:", err);
      alert("Toggle failed.");
    }
  };

  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = visibleImages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(visibleImages.length / imagesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="gallery">
      <h2>Image Gallery</h2>

      {loading && <p>Loading images...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && visibleImages.length === 0 && <p>No images uploaded yet.</p>}

      <div className="gallery-grid">
        {currentImages.map((img) => (
          <div key={img.id} className="gallery-item">
            <img
              src={`${BACKEND_URL}/uploads/${img.filename}`}
              alt={img.filename}
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
            <p className="timestamp">
              {new Date(img.uploaded_at).toLocaleString()}
            </p>

            <div className="button-row">
              <a
                href={`${BACKEND_URL}/api/download.php?file=${img.filename}`}
                download
                className="btn-download"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⬇️ Download
              </a>

              {isAdmin && (
                <>
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => togglePublish(img.id, img.published)}
                    className="btn-toggle"
                  >
                    {img.published === 1 ? "Unpublish" : "Publish"}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            ◀️ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next ▶️
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
