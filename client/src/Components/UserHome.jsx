import React from 'react'

const UserHome = () => {
  return (
    <div className="container bg-no-repeat bg-cover " style={{backgroundImage: "url('https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">
        Welcome to Your Dashboard
      </h1>
      <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
        <p className="text-lg text-gray-700 mb-4">
          You are logged in as a user.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-300">
          Explore Dashboard
        </button>
      </div>
    </div>
  </div>    
  
  )
}

export default UserHome
