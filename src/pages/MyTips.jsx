import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { FaLeaf } from "react-icons/fa";


const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [myTips, setMyTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMyTips = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://eden-garden-server.vercel.app/tips?uid=${user.uid}`
        );
        if (!res.ok) throw new Error("Failed to fetch your tips");
        const data = await res.json();
        setMyTips(data);
      } catch (error) {
        toast.error("Error loading your tips");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTips();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://eden-garden-server.vercel.app/tips/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) throw new Error("Delete failed");
        toast.success("Tip deleted successfully!");
        setMyTips(myTips.filter((tip) => tip._id !== id));
      } catch (error) {
        toast.error("Failed to delete tip");
        console.error(error);
      }
    }
  };
  

  if (!user) return <p>Please log in to see your tips.</p>;
  if (loading) return <Loader/>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-green-100 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 flex gap-2 items-center justify-center"><FaLeaf/> My Gardening Tips</h2>
      {myTips.length === 0 ? (
        <p>You have not shared any tips yet.</p>
      ) : (
        <ul className="space-y-4">
          {myTips.map((tip) => (
            <li
              key={tip._id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.category}</p>
              </div>
              <div className="space-x-2">
                <Link
                  to={`/edit-tip/${tip._id}`}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(tip._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTips;
