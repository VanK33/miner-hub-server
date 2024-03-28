import express from "express";
import cors from "cors";

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



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
