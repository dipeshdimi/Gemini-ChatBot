import express from "express";
import { geminiModel } from "./geminiAI.js";

const router = express.Router();

router.get("/stream", async (req, res) => {
  const { prompt } = req.query;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();
    let chunkedResponse = "";

    for (let i = 0; i < responseText.length; i++) {
      chunkedResponse += responseText[i];
      res.write(`data: ${chunkedResponse}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error generating response:", error);
    res.write("data: Error occurred\n\n");
    res.end();
  }
});

export default router;
