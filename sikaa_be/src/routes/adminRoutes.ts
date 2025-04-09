import { authenticate, authorizeAdmin } from "./../middleware/restrict";
import { Hono } from "hono";
import {
  createAdminController,
  updateAdminController,
  deleteAdminController,
} from "../features/admins/controllers/admin";

const admin = new Hono();

admin.post("/", authenticate, authorizeAdmin, createAdminController);
admin.put("/:id", authenticate, authorizeAdmin, updateAdminController);
admin.delete("/:id", authenticate, authorizeAdmin, deleteAdminController);

export default admin;
