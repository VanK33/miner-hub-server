import express from "express";
import cors from "cors";
import fs from "fs";
import yaml from "js-yaml";

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// loading YAML file
const loadYamlFile = (path: string) => {
  try {
    const fileContents = fs.readFileSync(path, "utf8");
    const data = yaml.load(fileContents);
    return data;
  } catch (error) {
    console.error("Error reading YAML file: ", error);
    return null
  }
}

const yaml = loadYamlFile(`./public/typeIDs.yaml`);


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
