import { Request, Response } from "express";
import prismaClient from "../lib/db.config";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const getAllTodos = async (req: Request, res: Response) => {
  const todos = await prismaClient.todo.findMany({
    include: {
      list: true,
    },
  });
  return res.status(200).json({ todos });
};

const updateTodoCompleted = async (req: Request, res: Response) => {
  const user = await prismaClient.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(401).json({ message: "Invalid user" });

  const todoFromDB = await prismaClient.todo.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (!todoFromDB) {
    return res.status(401).json({ message: "Invalid Todo Item" });
  }

  const updated = await prismaClient.todo.update({
    where: {
      id: todoFromDB.id,
    },
    data: {
      completed: req.body.completed,
    },
  });
  return res.status(200).json(updated);
};

const createTodo = async (req: Request, res: Response) => {
  const user = await prismaClient.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(401).json({ message: "Invalid user" });

  if (!req.body.title)
    return res.status(401).json({ message: "Title is mandatory" });

  const todo: Prisma.TodoCreateInput = {
    title: req.body.title,
    description: req.body.description,
    user: {
      connect: {
        id: user?.id,
      },
    },
    list: {
      connect: {
        id: req.body.list.id,
      },
    },
  };

  await prismaClient.todo.create({
    data: todo,
  });

  const createdTodo = await prismaClient.todo.findMany();

  res.status(200).json(createdTodo);
};

const todosController = { getAllTodos, createTodo, updateTodoCompleted };

export default todosController;
