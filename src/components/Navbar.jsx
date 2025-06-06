import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();

  return (
    <div className="shadow-sm px-6 py-4 bg-indigo-700">
      <div className="max-w-7xl flex justify-between items-center mx-auto">
        
        {/* Title */}
        <p
          className="text-white text-2xl font-semibold flex items-center cursor-pointer hover:text-indigo-200 transition"
          onClick={() => navigate("/")}
        >
          <RxDashboard className="mr-2 text-3xl" />
          {router.state && router.state.type} Dashboard
        </p>

        {/* Logout */}
        <button
          className="flex items-center gap-2 text-white border border-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-red-600 transition"
          onClick={() => navigate("/")}
        >
          Logout
          <FiLogOut className="text-lg" />
        </button>

      </div>
    </div>
  );
};

export default Navbar;
