const userService = require("../services/userService");


// @desc Get logged-in user profile
// @route GET /api/users/me
// @access Private
const getMe = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update logged-in user profile
// @route PUT /api/users/me
// @access Private
const updateMe = async (req, res) => {

  try {
    const updatedUser = await userService.updateUser(req.user._id, req.body);
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error in updateMe:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update user account status
// @route PATCH /api/users/me/status
// @access Private (Admin only if you add role check later)
const updateUserStatus = async (req, res) => {
  try {

    const { status } = req.body;
//     console.log(status);
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedUser = await userService.updateUserStatus(req.user._id, status);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error in updateUserStatus:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMe,
  updateMe,
  updateUserStatus,
};
