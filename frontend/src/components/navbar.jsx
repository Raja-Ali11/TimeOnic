import React from "react";
import { FaTachometerAlt, FaClipboardList, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {


  const handleLogout=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("./login")
  }




  return (
   <nav className="fixed top-0 left-0 w-full flex justify-center bg-gray-200">

      <div className="h-16 w-full max-w-3xl mt-1 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-1 sm:px-3 bg-gray-100 rounded-full border border-gray-300 shadow-sm">

        <Link to="#" className="flex items-center gap-1 sm:gap-2 md:gap-2 text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-700 hover:text-blue-500 font-medium">
          <FaTachometerAlt className="text-[12px] sm:text-sm md:text-base lg:text-lg" />
          Dashboard
        </Link>

        <Link to="#" className="flex items-center gap-1 sm:gap-2 md:gap-2 text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-700 hover:text-blue-500 font-medium">
          <FaClipboardList className="text-[12px] sm:text-sm md:text-base lg:text-lg" />
          My Entries
        </Link>

        <h3 className="text-[12px] sm:text-sm md:text-base lg:text-xl font-bold text-gray-800 mx-1 sm:mx-3 md:mx-6">
          Timeonic
        </h3>

        <Link to="#" className="flex items-center gap-1 sm:gap-2 md:gap-2 text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-700 hover:text-blue-500 font-medium">
          <FaCog className="text-[12px] sm:text-sm md:text-base lg:text-lg" />
          Setting
        </Link>

        <Link to="#"  onClick={handleLogout} className="flex items-center gap-1 sm:gap-2 md:gap-2 text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-700 hover:text-red-500 font-medium">
          <FaSignOutAlt className="text-[12px] sm:text-sm md:text-base lg:text-lg" />
          Logout
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
