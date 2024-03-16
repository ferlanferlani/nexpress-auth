import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sendEmailRoute from "./routes/sendEmail.js";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(sendEmailRoute);
app.listen(process.env.APP_PORT, () => {
  console.log(`App running on port http://localhost:${process.env.APP_PORT}`);
});

app.get("/", (req, res) => {
  res.send("Nodejs Nodemailer App!");
});
