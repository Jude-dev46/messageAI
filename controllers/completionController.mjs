import Openai from "openai";

import User from "../model/user.js";

const API_KEY = process.env.API_KEY;
const client = new Openai({ apiKey: API_KEY });

const completionsController = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.user });
    if (foundUser.prompts >= 5) {
      return res.status(400).json({
        status: false,
        message: "You have reached the maximum number of prompts!",
      });
    }

    const response = await client.responses.create({
      model: "gpt-4",
      input: req.body.message,
    });

    foundUser.prompts += 1;
    await foundUser.save();

    res.json({ status: true, message: response.output_text });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default completionsController;
