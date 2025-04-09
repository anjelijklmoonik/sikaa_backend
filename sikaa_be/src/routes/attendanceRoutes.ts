import { Hono } from "hono";
import {
  authenticate,
  authorizeAdmin,
  authorizeStudent,
  authorizeParent,
} from "./../middleware/restrict";

// import {
//   createAttendance,
//   getAllAttendance,
//   getAttendanceById,
//   updateAttendance,
//   deleteAttendance,
// } from "../features/attendances/controllers/attendance";
import * as attendanceController from "../features/attendances/controllers/attendance";
const attendance = new Hono();

// attendance.post("/", authenticate, authorizeAdmin, createAttendance);
// attendance.get("/", authenticate, authorizeAdmin, getAllAttendance);
// attendance.get("/:id", authenticate, authorizeAdmin, getAttendanceById);
// attendance.put("/:id", authenticate, authorizeAdmin, updateAttendance);
// attendance.delete("/:id", authenticate, authorizeAdmin, deleteAttendance);

attendance.post(
  "/",
  authenticate,
  authorizeAdmin,
  attendanceController.createAttendanceHandler
);
attendance.get(
  "/parent",
  authenticate,
  authorizeParent,
  attendanceController.getStudentAbsensiByParent
);
attendance.get(
  "/student",
  authenticate,
  authorizeStudent,
  attendanceController.getStudentAbsensi
);

attendance.get(
  "/summary/:studentId",
  authenticate,
  authorizeAdmin,
  attendanceController.getAttendanceSummary
);

attendance.get(
  "/form",
  authenticate,
  authorizeAdmin,
  attendanceController.getFormDataAbsensi
);

export default attendance;
