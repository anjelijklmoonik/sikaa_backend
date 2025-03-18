import { Hono } from "hono";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import studentProfileRoutes from "./studentProfileRoutes";
import finance from "./financeRoutes";
import academicYear from "./acdemicYearRoutes";
import classes from "./classRoutes";
import major from "./majorRoutes";
import course from "./courseRotes";
import classCourse from "./classCourseRoutes";
import classMember from "./classMemberRoutes";
import grades from "./gradeRoutes";
import attendance from "./attendanceRoutes";
import achievement from "./achievementRoutes";

const app = new Hono();

app.route("/admin", adminRoutes);
app.route("/auth", authRoutes);
app.route("/academic-year", academicYear);
app.route("/admin/student-profile", studentProfileRoutes);
app.route("/finances", finance);
app.route("/class", classes);
app.route("/major", major);
app.route("/course", course);
app.route("/class-course", classCourse);
app.route("/class-member", classMember);
app.route("/grades", grades);
app.route("/attendances", attendance);
app.route("/achievements", achievement);

export default app;
