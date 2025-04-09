import {
  createClassService,
  getAllClassesService,
  getClassByIdService,
  updateClassService,
  deleteClassService,
  getClassesByAcademicYearAndSemesterService,
} from "../services/class";

export const getAllClassesController = async (c: any) => {
  try {
    const classes = await getAllClassesService();
    return c.json(classes, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
};

export const getClassByIdController = async (c: any) => {
  try {
    const id = parseInt(c.req.param("id"));
    const classData = await getClassByIdService(id);
    return c.json(classData, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 404);
  }
};

export const createClassController = async (c: any) => {
  try {
    const body = await c.req.json();
    const newClass = await createClassService(body);
    return c.json(newClass, 201);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
};

export const updateClassController = async (c: any) => {
  try {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const updatedClass = await updateClassService(id, body);
    return c.json(updatedClass, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
};

export const deleteClassController = async (c: any) => {
  try {
    const id = parseInt(c.req.param("id"));
    await deleteClassService(id);
    return c.json({ message: "Kelas berhasil dihapus" }, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
};

export const getClassesByAcademicYearAndSemesterController = async (c: any) => {
  try {
    const academicYearId = parseInt(c.req.param("academicYearId"));
    const semester = c.req.param("semester");
    const classes = await getClassesByAcademicYearAndSemesterService(academicYearId, semester);
    return c.json({
      message: `Daftar kelas untuk tahun ajaran ${academicYearId} semester ${semester}`,
      data: classes,
    }, 200);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400);
  }
}