import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "./../middleware/restrict";
import {
  createMemberKelasController,
  deleteMemberKelasByIdController,
  getAllMemberKelasController,
  getMemberKelasByIdController,
  updateMemberKelasByIdController,
} from "../features/classMembers/controllers/classMember";

const classMember = new Hono();

classMember.post(
  "/",
  authenticate,
  authorizeAdmin,
  createMemberKelasController
);
classMember.get("/", authenticate, authorizeAdmin, getAllMemberKelasController);
classMember.get(
  "/:id",
  authenticate,
  authorizeAdmin,
  getMemberKelasByIdController
);
classMember.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateMemberKelasByIdController
);
classMember.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteMemberKelasByIdController
);

export default classMember;
