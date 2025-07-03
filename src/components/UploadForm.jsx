import React, { useState } from "react";

import "../css/UploadForm.css";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    const res = await fetch(
      "http://localhost/Reactphoto/backend/api/photo_upload.php",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const data = await res.json();
    if (data.success) {
      alert("Upload successful!");
      onUpload(); // refresh or route
      setFile(null);
      setTitle("");
      setDescription("");
    } else {
      alert(data.error || "Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
