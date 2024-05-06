import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmpty, isEmailValid } from "../../helper/validation";
import { setUserData } from "../redux/features/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);

  // Rename userData to userCredentials
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailerr: false,
    passworderr: false,
  });

  const [errdefin, seterrdefin] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (eve) => {
    setUserCredentials({
      ...userCredentials,
      [eve.target.name]: eve.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {
      emailerr: false,
      passworderr: false,
    };

    const errmessage = {
      email: "",
      password: "",
    };

    let valid = true;

    if (isEmailValid(userCredentials.email)) {
      errmessage.email = "enter a valid email";
      errors.emailerr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.email)) {
      errmessage.email = "email can't be empty";
      errors.emailerr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.password)) {
      errmessage.password = "password can't be empty";
      errors.passworderr = true;
      valid = false;
    }
    setError(errors);
    seterrdefin(errmessage);
    if (valid) {
      try {
        console.log("Every validation is ok");

        const response = await axios.post(
          "https://user-managment-mern-redux-toolkit-server.onrender.com/login",
          userCredentials
        );
        console.log("userCredentials",userCredentials);

        if (response.data.success) {
          const userDataResponse = await axios.get(
            "https://user-managment-mern-redux-toolkit-server.onrender.com/fetchuserdata"
          );
          console.log("userDataResponse",userDataResponse);
          dispatch(setUserData(userDataResponse.data));
          navigate("/home");
          console.log("user home page");
        } else if (response.data.emailerr) {
          console.log("response.data.emailerr");
          setError((previous) => ({
            ...previous,
            emailerr: true,
          }));
          seterrdefin((previous) => ({
            ...previous,
            email: response.data.emailerr,
          }));
        } else if (response.data.passworderr) {
          setError((previous) => ({
            ...previous,
            passworderr: true,
          }));
          seterrdefin((previous) => ({
            ...previous,
            password: response.data.passworderr,
          }));
        }
      } catch (error) {
        console.log("Login error");
        console.error(error);
      }
    } else {
      console.log("logging");
      
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-gradient-to-br from-blue-500 to-green-500">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image" />
      </div>
      <div className="max-w-md w-full p-6  rounded-lg shadow-md bg-white">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold mb-4">Login</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="email"
              name="email"
              autoComplete="email"
            />
            {error.emailerr && (
              <div className="text-red-500 mt-1">{errdefin.email}</div>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="password"
              name="password"
              autoComplete="new-password"
            />
            {error.passworderr && (
              <div className="text-red-500 mt-1">{errdefin.password}</div>
            )}
            <button
              type="button"
              className="absolute right-2 bottom-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={handleLogin}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
            <p className="mt-2 text-gray-600 cursor-pointer">
              New user?{" "}
              <span
                style={{ color: "blue" }}
                onClick={() => navigate("/signup")}
              >
                signup
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
