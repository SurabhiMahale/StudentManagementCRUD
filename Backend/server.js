import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import StudentRouter from "./controllers/studentRouter.js";
import cors from "cors";
import authVerify from "./middlewares/authVerify.js";
import authRouter from "./controllers/authRouter.js";
import CollegeRouter from "./controllers/collegeRouter.js";
dotenv.config();
const app = express();
connectDatabase();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api", authVerify, (req, res) => {
  res.send({
    authenticated: true,
    user: req.user,
  });
});

app.use("/api/auth", authRouter);
app.use("/api/student", StudentRouter);
app.use("/api/college", CollegeRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
