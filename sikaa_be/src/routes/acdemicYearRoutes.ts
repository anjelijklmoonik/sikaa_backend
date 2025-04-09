import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "./../middleware/restrict";
import {
  createAcademicYearController,
  getAllAcademicYearsController,
  getAcademicYearByIdController,
  updateAcademicYearController,
  deleteAcademicYearController,
} from "../features/academicYears/controllers/acdemicyear";

const academicYear = new Hono();

academicYear.post(
  "/",
  authenticate,
  authorizeAdmin,
  createAcademicYearController
);
academicYear.get(
  "/",
  authenticate,
  authorizeAdmin,
  getAllAcademicYearsController
);
academicYear.get(
  "/:id",
  authenticate,
  authorizeAdmin,
  getAcademicYearByIdController
);
academicYear.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateAcademicYearController
);
academicYear.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteAcademicYearController
);

export default academicYear;
