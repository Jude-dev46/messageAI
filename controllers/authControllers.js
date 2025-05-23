const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_KEY = process.env.REFRESH_KEY;

const signUpController = async (req, res) => {
  const { email, confirmPassword, username } = req.body;

  const hashPassword = await bcrypt.hash(confirmPassword, 10);

  try {
    if (!email || !username || !confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Request body cannot be empty!" });
    }

    const existingUser = await User.findOne({ email, username });

    if (existingUser) {
      return res.status(409).json({ message: "This user already exists!" });
    } else {
      const newUser = await User({
        email: email,
        username: username,
        password: hashPassword,
        prompts: 0,
      });

      await newUser.save();
      res
        .status(201)
        .json({ status: true, message: "User successfully registered!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Could not access server!",
      error: error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).json({
        status: false,
        message: "Email, username and password are required!",
      });

    const existingUser = await User.findOne({ email, username });

    if (!existingUser)
      return res
        .status(404)
        .json({ status: false, message: "This user is not registered!" });

    const passwordIsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordIsMatch) {
      return res
        .status(404)
        .json({ status: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: existingUser.email }, SECRET_KEY, {
      expiresIn: "2h",
    });

    const refreshToken = jwt.sign(
      { userId: existingUser.username },
      REFRESH_KEY,
      {
        expiresIn: "1d",
      }
    );

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(200).json({
      status: true,
      message: "Login Successful!",
      token: token,
      username: username,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Could not access server!",
      error: error,
    });
  }
};

module.exports = { signUpController, loginController };
