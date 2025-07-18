import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://eden-garden-server.vercel.app/tips/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Tip not found");
        return res.json();
      })
      .then((data) => {
        setTip(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-green-100 rounded shadow my-20">
      <h1 className="text-3xl font-bold mb-4">{tip.title}</h1>
      <p>
        <strong>Category:</strong> {tip.category}
      </p>
      <p>
        <strong>Difficulty:</strong> {tip.difficulty}
      </p>
      {tip.imageUrl && (
        <img
          src={tip.imageUrl}
          alt={tip.title}
          className="my-4 w-full max-h-64 object-cover rounded"
        />
      )}
      <p className="whitespace-pre-wrap">{tip.description}</p>
      
    </div>
  );
};

export default TipDetails;
