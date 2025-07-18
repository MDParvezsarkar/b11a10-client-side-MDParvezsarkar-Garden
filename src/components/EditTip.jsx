import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const EditTip = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficulty: "Easy",
    description: "",
    imageUrl: "",
    category: "Plant Care",
    availability: "Public",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 
  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await fetch(
          `https://eden-garden-server.vercel.app/tips/${id}`
        );
        if (!res.ok) throw new Error("Tip not found");
        const data = await res.json();
        setFormData({
          title: data.title || "",
          plantType: data.plantType || "",
          difficulty: data.difficulty || "Easy",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          category: data.category || "Plant Care",
          availability: data.availability || "Public",
        });
      } catch (error) {
        toast.error("Failed to load tip");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to update a tip");
      return;
    }
    setSaving(true);

    try {
      const res = await fetch(
        `https://eden-garden-server.vercel.app/tips/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Failed to update tip");
      toast.success("Tip updated successfully!");
      navigate("/my-tips"); 
    } catch (error) {
      toast.error("Error updating tip. Try again.");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading tip data...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-green-100 rounded shadow mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Edit Your Tip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Tip Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="plantType"
          value={formData.plantType}
          onChange={handleChange}
          placeholder="Plant Type / Topic"
          className="w-full p-2 border rounded"
          required
        />
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
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Optional Image URL"
          className="w-full p-2 border rounded"
        />
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

        {/* User info (read-only) */}
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
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition"
        >
          {saving ? "Saving..." : "Update Tip"}
        </button>
      </form>
    </div>
  );
};

export default EditTip;
