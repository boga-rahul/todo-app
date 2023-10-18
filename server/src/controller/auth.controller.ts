import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prismaClient from "../lib/db.config";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, email, password } = await req.body;

  const emailExists = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (emailExists != null) {
    res.status(400).json({ message: "Email already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user: Prisma.UserCreateInput = {
    username,
    email,
    password: hashedPassword,
  };

  try {
    await prismaClient.user.create({
      data: user,
    });

    const createdUser = await prismaClient.user.findMany({
      where: {
        email: user.email,
      },
    });

    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (user == null) {
      return res.status(400).json({ message: "incorrect email ID" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "incorrect password" });

    if (process.env.TOKEN_SECRET) {
      const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);

      return res.header("auth-token", token).json({ token: token });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const authController = { register, login };

export default authController;
