const User = require("../models/user");
const bcrypt = require("bcrypt");
// const mongoose = require('mongoose');


const AdminFetchToUser = async (req, res) => {
  try {
    // console.log("check AdminFetchToUser");
    const { search } = req.query;
    let query = { role: { $ne: "admin" } };
    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }
    // console.log("Query data",query);
    const data = await User.find(query);
    // console.log("Query data 01",data);
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};


const AdminDeleteUser = async (req, res) => {
  try {
    // console.log("Check AdminDeleteUser");
    const id = req.body.id;
    // console.log(id);
    if (!id) {
      return res
        .status(400)
        .json({ error: "User not required" });
    }
    await User.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const AdminEditUser = async (req, res) => {
  try {
    // console.log("Check AdminEditUser");
    if (req.body.value.length) {
      const id = req.body.user_id;
      console.log(id);
      const newvalue = req.body.value;
      await User.updateOne({ _id: id }, { $set: { name: newvalue } });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
 

const AdminAddNewUsers = async (req, res) => {
  try {
    // console.log("Check addUser");
    const ExistuserCheck = await User.findOne({ email: req.body.email });
    if (ExistuserCheck) {
      return res.json({ error: "user already exist please using another E-mail" });
    }
    const salt = await bcrypt.genSalt();

    const AdminAddNewUserPassword = await bcrypt.hash(req.body.Password, salt);
    const AdminAddNewUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: "user",
      password: AdminAddNewUserPassword,
      profile: "./src/assets/profileimg.jpg",
    });
    const savedUser = await AdminAddNewUser.save();
    // console.log("Admin add new user",savedUser);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};


module.exports = { 
  AdminFetchToUser, 
  AdminDeleteUser, 
  AdminEditUser, 
  AdminAddNewUsers 
};
