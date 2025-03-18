import * as attendanceRepository from "../repositories/attendance";

interface Attendance {
  tanggal: string;
  status: string;
  memberKelasId: number;
  mapelKelasId: number;
}

// export const createAttendance = async (attendance: Attendance) => {
//   return await attendanceRepository.createAttendance(attendance);
// };

// export const getAllAttendance = async () => {
//   return await attendanceRepository.getAllAttendance();
// };

// export const getAttendanceById = async (id: number) => {
//   return await attendanceRepository.getAttendanceById(id);
// };

// export const updateAttendance = async (id: number, attendance: Attendance) => {
//   return await attendanceRepository.updateAttendance(id, attendance);
// };

// export const deleteAttendance = async (id: number) => {
//   return await attendanceRepository.deleteAttendance(id);
// };

export const createAttendance = async (attendance: any) => {
  if (
    !attendance.tanggal ||
    !attendance.status ||
    !attendance.studentProfileId ||
    !attendance.mapelKelasId
  ) {
    throw new Error("Semua field wajib diisi.");
  }

  return await attendanceRepository.addAttendance(attendance);
};

export const getStudentAttendanceSummary = async (studentId: number) => {
  return await attendanceRepository.countAttendanceByStudent(studentId);
};

export const getStudentAbsensi = async (userId: number) => {
  return await attendanceRepository.getAbsensiByStudent(userId);
};

export const getFormDataAbsensi = async () => {
  return await attendanceRepository.getFormData();
};
