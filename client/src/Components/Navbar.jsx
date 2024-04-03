import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/features/userSlice";
import axios from "axios";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const logout = () => {
    axios.get('http://localhost:5000/logout/')
      .then(() => {
        dispatch(setUserData(null));
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
  return (
    <>
      <nav className="bg-gray-800 p-5 flex justify-between items-center">
      <div className="flex items-center">
        
        {userData.profile && (
        <img
          src={userData.profile}
          alt="Profile"
          className="rounded-full h-8 w-8 mr-2"
        />
        )}
        <h1 className="text-white text-2xl font-bold">{userData.name}</h1>
      </div>
      <div className="flex items-center space-x-5">
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center text-white hover:text-gray-300 focus:outline-none"
        >
          <FiHome />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-white hover:text-gray-300 focus:outline-none"
        >
          <FiUser />
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button
          onClick={() =>logout()}
          className="flex flex-col items-center text-white hover:text-gray-300 focus:outline-none"
        >
          <FiLogOut />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
