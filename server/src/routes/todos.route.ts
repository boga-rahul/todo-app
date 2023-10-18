import { Router } from "express";
import todosController from "../controller/todos.controller";
import authVerify from "../middleware/authVerify";

const router = Router();

router
  .get("/", todosController.getAllTodos)
  .post("/create", authVerify, todosController.createTodo)
  .post("/update", authVerify, todosController.updateTodoCompleted);

export default router;
