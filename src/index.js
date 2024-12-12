// const express = require("express");
import express from "express";
import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
// express.json();

// middleware
// Middleware to parse JSON
app.use(express.json());

config();

const PORT = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  res.json("HElooow Learning GEMINI");
});

app.get("/api/gemini", async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Tell about Nodejs";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
});
app.post("/api/generate-data", async (req, res) => {
  const { prompt } = req.body;

  // console.log("prompt :>> ", prompt);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // const prompt = "Tell about Nodejs";

  const result = await model.generateContent(prompt);
  // console.log();
  const promptResult = result.response.text();
  res.json({ data: promptResult, status: 200 });
});

app.listen(PORT, () => {
  console.log(`App is Running on PORT ${PORT}`);
});

// GET
// POST
// PATCH --> UPDATE
// DELETE
