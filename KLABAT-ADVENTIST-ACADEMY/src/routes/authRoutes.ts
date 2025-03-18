import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "./../middleware/restrict";
import {
  // loginController,
  loginAdminController,
  loginStudentController,
  loginParentController,
  whoamiController,
} from "../features/auth/controllers/auth";

const auth = new Hono();

// auth.post("/login", loginController);
auth.post("/admin/login", loginAdminController);
auth.post("/student/login", loginStudentController);
auth.post("/ortu/login", loginParentController);
auth.get("/whoami", authenticate, whoamiController);

export default auth;
