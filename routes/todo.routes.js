import express from "express";
import {
    deleteAllTodo,
    deleteTodo,
  getTodoList,
  getTodoListByTitle,
  getTodoLists,
  loadReact,
  postTodoList,
  updateTodo,
} from "../controller/todo.controller.js";
const router = express.Router();

router.get("/", getTodoLists);

router.get("/:id", getTodoList);

router.get("/title/:title", getTodoListByTitle);

router.post("/", postTodoList);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

router.delete("/", deleteAllTodo);

export default router;