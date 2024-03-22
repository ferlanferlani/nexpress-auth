import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// import app route
import appRoutes from "../routes/index.js";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app routes
app.use(appRoutes);

app.listen(process.env.APP_PORT, () => {
  const appVersion = "1.0.0";
  const lineLength = 56;
  const line = "\x1b[94m" + "=".repeat(lineLength) + "\x1b[0m";
  const versionPadding = Math.floor((lineLength - 10 - appVersion.length) / 2);

  console.log(
    `${line}\n\x1b[1mNexpress API is running on port http://localhost:${
      process.env.APP_PORT
    }\n\x1b[0m${" ".repeat(
      versionPadding
    )}\x1b[1mVersion: ${appVersion}\x1b[0m\n${line}`
  );
});
