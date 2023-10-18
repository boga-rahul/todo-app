import express, { NextFunction, Request, Response } from "express";
import todosRouter from "./routes/todos.route";
import authRouter from "./routes/auth.route";
import listsRouter from "./routes/lists.router";
import cors, { CorsOptions } from "cors";

const app = express();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/todos", todosRouter);
app.use("/lists", listsRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
