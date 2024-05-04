import React, { useState, useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import DeleteConfirmationModal from "./DeleteConfirm";
import axios from "axios";
import {
  isEmpty,
  isPasswordValid,
  isEmailValid,
} from "../../helper/validation";
import { useSelector } from "react-redux";

export const AdminDash = () => {
  const [user, setUser] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [editerr, setEditerr] = useState(false);
  const [editerrdef, setEditerrdef] = useState("");

  const [open, setOpen] = useState(false);

  const usersdata = useSelector((state) => state.user.userData);

  const [editname, setEditname] = useState({
    name: "",
    id: "",
    value: "",
    user_id: usersdata._id,
  });
  const [error, setError] = useState({
    emailred: false,
    namered: false,
    passwordred: false,
    confirmpasswordred: false,
  });
  const [errordef, seterrordef] = useState({
    emailerr: "",
    nameerr: "",
    passworderr: "",
  });

  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    Password: "",
  });

  const [deluser, setDelUser] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [delid, setDelid] = useState(null);

  //add user modal close
  const closeAddModal = () => {
    setNewUserData({
      name: "",
      email: "",
      Password: "",
    });
    setAddModalOpen(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    // console.log(newUserData);
  };

  const addUser = () => {
    let errors = {
      emailred: false,
      namered: false,
      passwordred: false,
      confirmpasswordred: false,
    };

    let errorMessages = {
      emailerr: "",
      nameerr: "",
      passworderr: "",
      confirmpassworderr: "",
    };

    if (isEmpty(newUserData.email)) {
      // console.log("Email empty check");
      errors.emailred = true;
      errorMessages.emailerr = "Email can't be empty";
    } else if (isEmailValid(newUserData.email)) {
      errors.emailred = true;
      errorMessages.emailerr = "Enter a valid email";
    }

    // Validate name
    if (isEmpty(newUserData.name)) {
      // console.log("Email validation check");
      errors.namered = true;
      errorMessages.nameerr = "Name can't be empty";
    }

    // Password validation
    if (isEmpty(newUserData.Password)) {
      console.log("Admin password validation");
      errors.passwordred = true;
      errorMessages.passworderr = "Password can't be empty";
    } else if (isPasswordValid(newUserData.Password)) {
      errors.passwordred = true;
      errorMessages.passworderr = "Password is too weak";
    }

    setError(errors);
    seterrordef(errorMessages);

    if (!errors.emailred && !errors.namered && !errors.passwordred) {
      async function register() {
        try {
          await axios
            .post("https://user-managment-mern-redux-toolkit-server.onrender.com/admin/AdminAddUser/", newUserData)
            .then((response) => {
              if (response.data.success) {
                closeAddModal();
                axios
                  .get("https://user-managment-mern-redux-toolkit-server.onrender.com/admin/AdminFetchToUser")
                  .then((response) => {
                    const fetchedUsers = response.data.data;
                    const usersWithId = fetchedUsers.map((user, index) => ({
                      ...user,
                      id: index + 1,
                    }));

                    setUser(usersWithId);
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                  });
              } else if (response.data.error) {
                setError((previous) => ({
                  ...previous,
                  emailred: true,
                }));
                seterrordef((previous) => ({
                  ...previous,
                  emailerr: response.data.error,
                }));
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
      register();
    }
  };

  //Admin edit modal
  const openEditModal = (id) => {
    const userToEdit = user.find((item) => item.id === id);
    setEditModalOpen(true);
    setEditname({
      name: userToEdit.name,
      id: userToEdit.id,
      value: "",
      user_id: userToEdit._id,
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditname("");
  };

  const editvalue = (event) => {
    const value = event.target.value;
    setEditname((previous) => ({
      ...previous,
      value: value,
    }));
  };

  //Admin delete modal
  const handleDelete = async (id) => {
    const userToDelete = user.find((item) => item.id === id);
    setDelUser(userToDelete.name);
    setDeleteModalOpen(true);
    setDelid(id);
  };
  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    deleteUser(delid);
  };

  ///Admin delete user
  const deleteUser = (id) => {
    const userToDelete = user.find((item) => item.id == id);
    axios
      .delete("https://user-managment-mern-redux-toolkit-server.onrender.com/admin/AdminDeleteUser", {
        data: { id: userToDelete._id },
      })
      .then(() => {
        axios
          .get("https://user-managment-mern-redux-toolkit-server.onrender.com/admin/AdminFetchToUser")
          .then((response) => {
            const fetchedUsers = response.data.data;
            const usersWithId = fetchedUsers.map((user, index) => ({
              ...user,
              id: index + 1,
            }));

            setUser(usersWithId);
            setIsLoading(false);
            setDelUser("");
            setDeleteModalOpen(false);
            setDelid(null);
          })
          .catch((err) => {
            console.error("Error fetching users after deletion:", err);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  ///edit user
  const handleEdit = () => {
    let valid = true;
    console.log(editname, "editname");
    if (isEmpty(editname.value)) {
      valid = false;
      setEditerr(true);
      setEditerrdef("field can't be empty");
    }

    if (valid) {
      setEditerr(false);
      setEditerrdef("");

      axios
        .post("https://user-managment-mern-redux-toolkit-server.onrender.com/admin/AdminEditUser", editname)
        .then(() => {
          setOpen(false);
          axios
            .get("https://user-managment-mern-redux-toolkit-server.onrender.com/admin/AdminFetchToUser")
            .then((response) => {
              const fetchedUsers = response.data.data;
              const usersWithId = fetchedUsers.map((user, index) => ({
                ...user,
                id: index + 1,
              }));

              setUser(usersWithId);
              setIsLoading(false);
              setEditname({
                name: "",
                id: "",
                value: "",
              });
              setEditModalOpen(false);
            })
            .catch((err) => {
              console.error("User fetching error :", err);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };
  
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://user-managment-mern-redux-toolkit-server.onrender.com/admin/AdminFetchToUser${
          search ? `?search=${search}` : ""
        }`
      )
      .then((response) => {
        const fetchedUsers = response.data.data;
        const usersWithId = fetchedUsers.map((user, index) => ({
          ...user,
          id: index + 1,
        }));

        setUser(usersWithId);
        setIsLoading(false);
      })

      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [search]);

  return (
    <>
      <AdminNavbar setAddModalOpen={setAddModalOpen} setSearch={setSearch} />

      <div className="container mx-auto mt-8 p-4 max-w-6xl bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>
        <div className="overflow-x-auto">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.map((user) => (
                  <tr key={user.id} className="bg-white hover:bg-gray-100">
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openEditModal(user.id)}
                        className="text-indigo-600 hover:bg-indigo-600 py-2 px-4 rounded hover:text-white mr-10 focus:outline-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:bg-red-600 py-2 px-4 rounded hover:text-white focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* User Delete to admin modal */}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* User Name editing modal */}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Edit User Name
            </h2>
            <input
              id="newName"
              type="text"
              value={editname.value}
              onChange={editvalue}
              className="border-b border-gray-300 focus:outline-none w-full py-2 mb-4"
              placeholder="New Name"
            />
            {editerr && (
              <p className="text-red-500 text-sm mb-4">{editerrdef}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-green-400 text-black rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-red-400 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/*New User adding to admin modal */}

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
          <div
            className="bg-white p-8 rounded-lg z-10"
            style={{ width: "500px" }}
          >
            <h2 className="text-2xl font-bold mb-4">Add User</h2>

            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={newUserData.name}
                onChange={handleAddChange}
                className={`border px-4 py-2 w-full ${
                  error.namered ? "border-red-500" : ""
                }`}
              />
              {error.namered && (
                <p className="text-red-500 mt-2">{errordef.nameerr}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleAddChange}
                className={`border px-4 py-2 w-full ${
                  error.emailred ? "border-red-500" : ""
                }`}
              />
              {error.emailred && (
                <p className="text-red-500 mt-2">{errordef.emailerr}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Password:</label>
              <input
                type="password"
                name="Password"
                value={newUserData.Password}
                onChange={handleAddChange}
                className={`border px-4 py-2 w-full ${
                  error.passwordred ? "border-red-500" : ""
                }`}
              />
              {error.passwordred && (
                <p className="text-red-500 mt-2">{errordef.passworderr}</p>
              )}
            </div>

            <div className="flex">
              <button
                onClick={addUser}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
              >
                Add User
              </button>
              <button
                onClick={closeAddModal}
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
