import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
// const cors = require("cors");
// const express = require("express");
// const fetch = require("node-fetch");
const PORT = 8000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

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
