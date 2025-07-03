import React, { useEffect, useState } from "react";
import "../css/AdminImages.css";

const AdminImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost/Reactphoto/backend/api/get_all_images.php",
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.error || "Failed to fetch images.");
        setImages([]);
      } else {
        setImages(data);
        setError(null);
      }
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

  const togglePublish = async (id, currentStatus) => {
    try {
      const res = await fetch(
        "http://localhost/Reactphoto/backend/api/toggle_publish.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id, publish: currentStatus ? 0 : 1 }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, published: currentStatus ? 0 : 1 } : img
          )
        );
      } else {
        alert(data.error || "Failed to toggle publish status.");
      }
    } catch (err) {
      console.error("Toggle error", err);
      alert("Toggle failed.");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(
        "http://localhost/Reactphoto/backend/api/delete_image.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        alert(data.error || "Failed to delete image.");
      }
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="admin-container">
      <h2>📂 Admin Image Management</h2>

      {loading && <p>Loading images...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && images.length === 0 && <p>No images found.</p>}

      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img.id} className="gallery-item">
            <img src={img.url} alt="uploaded" />
            <p>{new Date(img.uploaded_at).toLocaleString()}</p>
            <p className="status-text">
              {img.published ? "✅ Published" : "📂 Unpublished"}
            </p>
            <div className="button-row">
              <button
                className="btn-publish"
                onClick={() => togglePublish(img.id, img.published)}
              >
                {img.published ? "Unpublish" : "Publish"}
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteImage(img.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Correct placement of export after defining the component
export default AdminImages;
