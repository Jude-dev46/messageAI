import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./model/user.js";
import verifyJWT from "./middleware/verifyJWT.js";
import InitiateMongoServer from "./config/db.js";

const PORT = 8001;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

InitiateMongoServer();

const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_KEY = process.env.REFRESH_KEY;

app.post("/auth/signUp", async (req, res) => {
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
      });

      await newUser.save();
      res
        .status(201)
        .json({ status: true, message: "User successfully registered!" });
    }
  } catch (error) {
    console.log("Error", error);
    res.sendStatus(500);
  }
});

app.post("/auth/login", async (req, res) => {
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

    const token = jwt.sign({ userId: existingUser.username }, SECRET_KEY, {
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
    console.log(error);
    res.sendStatus(500);
  }
});

app.use(verifyJWT);
app.post("/completions", async (req, res) => {
  try {
    const gpt = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: req.body.message,
          },
        ],
      }),
    });
    const response = await gpt.json();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log("Your server is running on port " + PORT));
