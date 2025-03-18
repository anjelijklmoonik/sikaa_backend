import { Hono } from "hono";
import { cors } from "hono/cors";
// import studentProfile from "./studentProfileService";
// import academicYear from "./academicYearService";
// import keuangan from "./keuanganService";
// import absensi from "./absensiService";
// import pencapaian from "./pencapaianService";
// import mapel from "./mapelService";
// import user from "./userService";
// import admin from "./adminService";
// import auth from "./authService";
// import nilai from "./nilaiService";
import routes from "./routes/index";

const app = new Hono();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// app.route("", auth);
// app.route("", studentProfile);
// app.route("", academicYear);
// app.route("", keuangan);
// app.route("", absensi);
// app.route("", pencapaian);
// app.route("", mapel);
// app.route("", user);
// app.route("", admin);
// app.route("", nilai);
app.route("/api/v1", routes);

export default {
  port: 3001,
  fetch: app.fetch,
};
