import express, { Express, json } from "express";
import router from "./routers/userRouters";
const app: Express = express();

app.use(json());
app.use("/api", router);

export default app;
