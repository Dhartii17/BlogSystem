import express, { Express, json } from "express";
import path from "path";
import router from "./routers/userRouters";
const app: Express = express();

app.use(json());
// Serve static files (uploaded files) from 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", router);

export default app;
