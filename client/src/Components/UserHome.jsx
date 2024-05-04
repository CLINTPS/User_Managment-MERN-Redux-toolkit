import React from "react";
import Counter from "./Counter";

const UserHome = () => {
  return (
    <div
      className="container bg-no-repeat bg-cover "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center text-white ">
          Welcome to Your Dashboard
        </h1>
        <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
          <p className="text-lg text-black mb-4">
            You are logged in as a user.
          </p>
          <div className="py-4 bg-black rounded">
            <Counter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
