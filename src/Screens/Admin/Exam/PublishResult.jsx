import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../../baseUrl";

const PublishResult = () => {
  const adminId = useSelector((state) => state.userData._id);

  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!adminId) {
      toast.error("Admin ID not found");
      return;
    }

    toast.loading("Publishing Results...");
    setIsPublishing(true);

    try {
      console.log(adminId);
      const response = await axios.post(
        `${baseApiURL()}/result/admin/publishAll`,
        {
          publishedBy: adminId,
        });

      if (response.data && response.data.message) {
        toast.dismiss();
        toast.success("Results published successfully!");
      } else {
        toast.dismiss();
        toast.error("Publishing failed.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error publishing results");
      console.error("Publish error:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-center flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Publish Final Results</h1>
      </div>

      <div className="mt-16">
        <button
          className={`bg-green-600 text-white px-6 py-3 rounded ${isPublishing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={handlePublish}
          disabled={isPublishing}
        >
          {isPublishing ? "Publishing..." : "Publish All Results"}
        </button>
      </div>
    </div>
  );
};

export default PublishResult;
