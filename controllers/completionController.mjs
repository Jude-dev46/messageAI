import fetch from "node-fetch";

const API_KEY = process.env.API_KEY;

const completionsController = async (req, res) => {
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
    throw new Error(error);
  }
};

export default completionsController;
