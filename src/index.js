import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import app route
import appRoutes from "./routes/index.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app routes
app.use(appRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`App running on port http://localhost:${process.env.APP_PORT}`);
});
