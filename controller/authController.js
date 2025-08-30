const authService = require("../services/authService");

const Signup = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;
    const user = await authService.registerUser(fullName, email, password, role);

    return res.status(201).json({
      msg: "User registered successfully",
      email: user.email,
      token: user.token
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    return res.status(400).json({ msg: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);

    return res.status(200).json({
      msg: "User logged in successfully",
      token: user.token,
      user: {
        email: user.email,
        id: user._id
      }
    });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  Signup,
  login
};
