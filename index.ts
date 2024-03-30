import express from "express";
import cors from "cors";
import { generateSecureRandomString } from "./utility";

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.post("/api/auth", (req, res) => {
  // const { code, state } = req.body;
  // if (code && state) {
  //   res.status(200).json({ message: "Authentication successful" });
});

app.get("/api/generate-state", (_req, res) => {
  const state = generateSecureRandomString(16);
  res.status(200).json({ state });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
