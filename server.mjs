import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "./model/user";
import InitiateMongoServer from "./config/db";

const PORT = 8000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

InitiateMongoServer();

const API_KEY = process.env.API_KEY;

app.post("/signUp", cors(), async (req, res) => {
  const { email, confirmPassword, username } = req.body;
  console.log(email, confirmPassword, username);

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
        .status(200)
        .json({ status: true, message: "User successfully registered!" });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

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
