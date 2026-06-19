
import express from "express";
import apiRouter from "./routes/api.route.ts";
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json({ limit: "5mb" })); // requête JSON
app.use(cookieParser());
app.use('/api',apiRouter)

export default app;