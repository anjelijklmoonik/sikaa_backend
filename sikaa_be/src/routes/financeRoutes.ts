import { Hono } from "hono";
import {
  authenticate,
  authorizeAdmin,
  authorizeStudent,
  authorizeParent,
} from "./../middleware/restrict";
import {
  createTransactionHandler,
  getTransactionByIdHandler,
  getAllTransactionsHandler,
  getTransaksiByTokenController,
  getTransaksiByTokenFromParentController,
} from "../features/finances/controllers/finance";

const finance = new Hono();

finance.get(
  "/student",
  authenticate,
  authorizeStudent,
  getTransaksiByTokenController
);
finance.get(
  "/parent",
  authenticate,
  authorizeParent,
  getTransaksiByTokenFromParentController
);
finance.post("/", authenticate, authorizeAdmin, createTransactionHandler);
finance.get("/:id", authenticate, authorizeAdmin, getTransactionByIdHandler);
finance.get("/", authenticate, authorizeAdmin, getAllTransactionsHandler);

export default finance;
