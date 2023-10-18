import { Router } from "express";
import authVerify from "../middleware/authVerify";
import listsController from "../controller/lists.controller";

const router = Router();

router
  .get("/", listsController.getAllLists)
  .post("/create", authVerify, listsController.createList);

export default router;
