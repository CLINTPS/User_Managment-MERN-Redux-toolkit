import React from "react";
import { setUserData } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiSolidUserPlus } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const AdminNavbar = ({ setAddModalOpen, setSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearch(searchTerm);
  };

  const handleLogout = () => {
    axios.get("https://user-managment-mern-redux-toolkit-server.onrender.com/logout").then(() => {
      dispatch(setUserData(null));
      navigate("/login");
    });
  };

  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-white font-bold text-xl">Admin Dashboard</div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users"
                onChange={handleSearch}
                className="px-3 py-2 mr-4 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-green-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4 focus:outline-none focus:ring focus:border-blue-300 flex items-center"
            >
              Add user <BiSolidUserPlus className="ml-1" />
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-red-300 flex items-center"
              onClick={handleLogout}
            >
              Logout <FiLogOut className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
