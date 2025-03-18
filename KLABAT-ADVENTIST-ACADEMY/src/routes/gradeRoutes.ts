import { Hono } from "hono";
import {
  authenticate,
  authorizeAdmin,
  authorizeStudent,
  authorizeParent,
} from "./../middleware/restrict";
import * as nilaiController from "../features/grades/controllers/grade";

const grade = new Hono();

// grade.post("/", authenticate, authorizeAdmin, nilaiController.create);
// grade.get("/", authenticate, authorizeAdmin, nilaiController.getAll);
// grade.get("/:id", authenticate, authorizeAdmin, nilaiController.getById);
// grade.put("/:id", authenticate, authorizeAdmin, nilaiController.update);
// grade.delete("/:id", authenticate, authorizeAdmin, nilaiController.delete);

grade.post(
  "/",
  authenticate,
  authorizeAdmin,
  nilaiController.addNilaiController
);
grade.get(
  "/:kelasId/:semester",
  authenticate,
  authorizeAdmin,
  nilaiController.getNilaiByKelasDanSemesterController
);
grade.get(
  "/student",
  authenticate,
  authorizeStudent,
  nilaiController.getGradesLessonByStudentHandler
);

grade.get(
  "/parent",
  authenticate,
  authorizeParent,
  nilaiController.getGradesLessonByStudentFromParentHandler
);
grade.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  nilaiController.updateNilaiController
);

grade.get("/form", authenticate, authorizeAdmin, nilaiController.getFormDataHandler);

export default grade;
