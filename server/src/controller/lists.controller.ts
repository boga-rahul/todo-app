import { Request, Response } from "express";
import prismaClient from "../lib/db.config";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const getAllLists = async (req: Request, res: Response) => {
  const lists = await prismaClient.list.findMany();
  return res.status(200).json(lists);
};

const createList = async (req: Request, res: Response) => {
  const user = await prismaClient.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  console.log(user);

  if (!user) return res.status(401).json({ message: "Invalid user" });

  if (!req.body.name)
    return res.status(401).json({ message: "List name is mandatory" });

  const listItem: Prisma.ListCreateInput = {
    name: req.body.name,
    color: req.body.color,
  };

  await prismaClient.list.create({
    data: listItem,
  });

  const createdList = await prismaClient.list.findMany();

  res.status(200).json(createdList);
};

const listsController = { getAllLists, createList };

export default listsController;
