const User = require("../models/User");

// Get user by ID
const getUserById = async (id) => {
  return await User.findById(id).select("-password"); // hide password
};

// Update user profile
const updateUser = async (id, updatedData) => {

  const user = await User.findByIdAndUpdate(id, updatedData, {
    new: true,        // return updated user
    runValidators: true, // validate schema rules
  }).select("-password");

  return user; // will be null if user not found
};

// Update user status
const updateUserStatus = async (id, status) => {
     
  const user = await User.findByIdAndUpdate(
    id,
    { accountstatus: status },
    { new: true, runValidators: true }
  ).select("-password");

  return user; // will be null if user not found
};

module.exports = {
  getUserById,
  updateUser,
  updateUserStatus,
};
