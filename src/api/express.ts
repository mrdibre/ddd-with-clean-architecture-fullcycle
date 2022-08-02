import express, { Express } from "express";
import { customerRoute } from "./routes/customer.route";

export const app: Express = express();
app.use(express.json());

app.use("/customer", customerRoute)
