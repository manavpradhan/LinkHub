import express from "express";
import AuthRouter from "./routers/authRouter.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", AuthRouter);

export default app;
