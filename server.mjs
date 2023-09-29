import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const PORT = 8000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.post("/signUp", (req, res) => {
  try {
    const { email, confirmPassword, password, username } = req.body;
    console.log(email, password, confirmPassword);

    if (!email || !password || !username || !confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Request body cannot be empty!" });
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
