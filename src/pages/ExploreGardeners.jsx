import { useEffect, useState } from "react";
import axios from "axios";
import { FaLeaf } from "react-icons/fa";

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    axios
      .get("https://eden-garden-server.vercel.app/gardeners") 
      .then((res) => setGardeners(res.data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl flex gap-2 font-bold mb-6 text-center justify-center items-center">
        <FaLeaf /> Explore Gardeners <FaLeaf />
      </h1>

      {gardeners.length === 0 ? (
        <p className="text-center text-gray-600">No active gardeners found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gardeners.map((gardener) => (
            <div
              key={gardener._id}
              className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105"
            >
              <img
                src={gardener.image}
                alt={gardener.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold">{gardener.name}</h2>
              <p className="text-gray-600">Age: {gardener.age}</p>
              <p className="text-gray-600">Gender: {gardener.gender}</p>
              <p className="text-gray-600">Experience: {gardener.experience}</p>
              <p className="text-green-600 font-medium">
                Total Shared Tips: {gardener.totalTips}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreGardeners;
