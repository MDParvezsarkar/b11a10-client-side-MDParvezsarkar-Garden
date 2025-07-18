import { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";

const TopTrendingTips = () => {
  const [tips, setTips] = useState([]);
  const [likeInProgress, setLikeInProgress] = useState(null);

  useEffect(() => {
    axios
      .get("https://eden-garden-server.vercel.app/tips?availability=Public")
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.totalLiked - a.totalLiked);
        setTips(sorted.slice(0, 5)); 
      });
  }, []);

  const handleLike = async (id) => {
    if (likeInProgress === id) return;
    setLikeInProgress(id);
    try {
      await axios.patch(
        `https://eden-garden-server.vercel.app/tips/like/${id}`
      );
      setTips((prev) =>
        prev.map((tip) =>
          tip._id === id
            ? { ...tip, totalLiked: (tip.totalLiked || 0) + 1 }
            : tip
        )
      );
    } catch (error) {
      console.error("Error liking tip:", error);
    } finally {
      setLikeInProgress(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {tips.map((tip) => (
        <div key={tip._id} className="border p-4 rounded-xl shadow bg-white">
          <img
            src={tip.imageUrl}
            alt={tip.title}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h2 className="text-lg font-semibold">{tip.title}</h2>
          <p className="text-gray-600 mt-1">
            {tip.description || "No description available."}
          </p>
          <div className="flex items-center mt-3">
            <button
              onClick={() => handleLike(tip._id)}
              disabled={likeInProgress === tip._id}
              className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm transition ${
                likeInProgress === tip._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <FaThumbsUp /> Like
            </button>
            <span className="ml-3 text-sm text-gray-700">
              {tip.totalLiked || 0} likes
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopTrendingTips;
