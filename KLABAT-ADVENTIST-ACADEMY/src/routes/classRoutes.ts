import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "./../middleware/restrict";
import {
  createClassController,
  getAllClassesController,
  getClassByIdController,
  updateClassController,
  deleteClassController,
} from "../features/classes/controllers/class";

const classes = new Hono();

classes.post("/", authenticate, authorizeAdmin, createClassController);
classes.get("/", authenticate, authorizeAdmin, getAllClassesController);
classes.get("/:id", authenticate, authorizeAdmin, getClassByIdController);
classes.put("/:id", authenticate, authorizeAdmin, updateClassController);
classes.delete("/:id", authenticate, authorizeAdmin, deleteClassController);

export default classes;
