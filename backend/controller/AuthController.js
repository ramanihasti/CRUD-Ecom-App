const {
  sendErrorResponse,
  sendSuccessReaponse,
  sendDataResponse,
} = require("../helper/resHelper");
const ExpiredToken = require("../modules/ExpiredToken");

// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User1 = require("../modules/User");

const getUser = async (req, res) => {
  try {
    sendDataResponse(res, req.user, 200);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim()) {
      return sendErrorResponse(res, "All field aare require.", 400);
    }

    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //   return sendErrorResponse(res, "Invalid email address.", 400);
    // }

    const existingUser = await User1.findOne({ email });

    if (existingUser) {
      return sendErrorResponse(
        res,
        "User with this email already exists.",
        400
      );
    }

    if (password.length < 6) {
      return sendErrorResponse(
        res,
        "Password must be at least 6 characters long.",
        400
      );
    }

    const numberOfUsers = await User1.countDocuments();
    const isAdmin = numberOfUsers === 0;

    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    await User1.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user",
    });

    sendSuccessReaponse(res, "User rsegistered successfully.", 200);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return sendErrorResponse(res, "All field are require.", 400);
    }

    const user = await User1.findOne({ email });

    if (!user) {
      return sendErrorResponse(res, "User not found.", 404);
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user.password !== password) {
      return sendErrorResponse(res, "Invalid password.", 400);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECERT,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    sendDataResponse(
      res,
      {
        token,
        user: {
          id: user._id,
          fullName: user.fname + " " + user.lname,
          email: user.email,
          role: user.role,
        },
      },
      200
    );
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await ExpiredToken.create({ token });
    sendSuccessReaponse(res, "Logged out successfully.", 200);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { register, login, logout, getUser };
