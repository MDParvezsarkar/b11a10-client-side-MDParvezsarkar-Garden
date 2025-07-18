import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { LuLeaf } from "react-icons/lu";

const ShareTip = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficulty: "Easy",
    description: "",
    imageUrl: "",
    category: "Plant Care",
    availability: "Public",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.plantType.trim()) errors.plantType = "Plant Type is required";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (
      formData.imageUrl &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.imageUrl)
    ) {
      errors.imageUrl = "Please enter a valid image URL (jpg, png, gif)";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("❌ You must be logged in to share a tip.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.warning("⚠️ Please fix the errors in the form.");
      return;
    }

    const tip = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      userId: user.uid, 
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      const res = await fetch("https://eden-garden-server.vercel.app/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tip),
      });

      if (!res.ok) throw new Error("Failed to share tip");

      toast.success("🌱 Tip shared successfully!");
      setFormData({
        title: "",
        plantType: "",
        difficulty: "Easy",
        description: "",
        imageUrl: "",
        category: "Plant Care",
        availability: "Public",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to share tip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-green-100 rounded shadow mt-10">
      <h2 className="text-2xl font-bold flex gap-3 text-green-700 mb-4">
        <LuLeaf/> Share a Gardening Tip
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Tip Title"
          className={`w-full p-2 border rounded ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && <p className="text-red-600">{errors.title}</p>}

        <input
          type="text"
          name="plantType"
          value={formData.plantType}
          onChange={handleChange}
          placeholder="Plant Type / Topic"
          className={`w-full p-2 border rounded ${
            errors.plantType ? "border-red-500" : ""
          }`}
        />
        {errors.plantType && <p className="text-red-600">{errors.plantType}</p>}

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your gardening tip..."
          rows={4}
          className={`w-full p-2 border rounded ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-600">{errors.description}</p>
        )}

        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Optional Image URL"
          className={`w-full p-2 border rounded ${
            errors.imageUrl ? "border-red-500" : ""
          }`}
        />
        {errors.imageUrl && <p className="text-red-600">{errors.imageUrl}</p>}

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Plant Care</option>
          <option>Composting</option>
          <option>Vertical Gardening</option>
        </select>

        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Public</option>
          <option>Hidden</option>
        </select>

        <input
          type="text"
          value={user?.displayName || ""}
          disabled
          className="w-full p-2 border bg-gray-100 rounded"
        />
        <input
          type="email"
          value={user?.email || ""}
          disabled
          className="w-full p-2 border bg-gray-100 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Sharing..." : "➕ Share Tip"}
        </button>
      </form>
    </div>
  );
};

export default ShareTip;
