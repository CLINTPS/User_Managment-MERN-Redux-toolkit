import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/features/userSlice";
import Navbar from "../Components/Navbar";
import UserHome from "../Components/UserHome";
import { Navigate } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    axios.get("https://user-managment-mern-redux-toolkit-server.onrender.com/fetchuserdata").then((response) => {
      dispatch(setUserData(response.data));
    });
  }, []);

  if (!userData || !userData.role) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <UserHome />
    </>
  );
};

export default Home;
