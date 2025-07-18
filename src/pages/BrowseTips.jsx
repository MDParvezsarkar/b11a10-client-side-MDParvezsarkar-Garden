import React, { useEffect, useState } from "react";
import { GiLeafSkeleton } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

  
    const baseUrl = "https://eden-garden-server.vercel.app"; 
    let url = `${baseUrl}/tips`;

   
    if (difficultyFilter) {
      url += `?difficulty=${difficultyFilter}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tips");
        return res.json();
      })
      .then((data) => {
       
        const publicTips = data.filter((tip) => tip.availability === "Public");
        setTips(publicTips);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [difficultyFilter]);

  if (loading) return <Loader/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold my-6 flex gap-2 justify-center items-center"> <GiLeafSkeleton/> Browse Garden Tips</h1>

      <div className="mb-4">
        <label htmlFor="difficulty" className="mr-2 font-semibold">
          Filter by Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border border-gray-400 rounded p-2"
        >
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-green-200">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Difficulty</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">See More</th>
          </tr>
        </thead>
        <tbody>
          {tips.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No public tips found.
              </td>
            </tr>
          ) : (
            tips.map((tip) => (
              <tr
                key={tip._id}
                className="text-center hover:bg-green-50 cursor-pointer"
              >
                <td className="border px-4 py-2">{tip.title}</td>
                <td className="border px-4 py-2">{tip.category}</td>
                <td className="border px-4 py-2">{tip.difficulty}</td>
                <td className="border px-4 py-2">
                  {tip.imageUrl ? (
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      className="w-20 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => navigate(`/tip/${tip._id}`)}
                    aria-label={`See more about ${tip.title}`}
                  >
                    👁️ See More
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseTips;
