import { Context } from "hono";
import * as service from "../services/acdemicyear";

// CREATE
export const createAcademicYearController = async (c: Context) => {
  const { year } = await c.req.json();
  try {
    const newYear = await service.createAcademicYearService(year);
    return c.json(newYear, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Tahun akademik baru tidak bisa dibuat" }, 400);
  }
};

// READ ALL
export const getAllAcademicYearsController = async (c: Context) => {
  try {
    const academicYears = await service.getAllAcademicYearsService();
    return c.json(academicYears);
  } catch (error) {
    return c.json({ error: "Tahun akademik tidak terbaca" }, 500);
  }
};

// READ ONE
export const getAcademicYearByIdController = async (c: Context) => {
  const id = String(c.req.param("id"));
  try {
    const academicYear = await service.getAcademicYearByIdService(id);
    return c.json(academicYear);
  } catch (error) {
    return c.json({ error: "Tahun akademik tidak ditemukan" }, 404);
  }
};

// UPDATE
export const updateAcademicYearController = async (c: Context) => {
  const id = String(c.req.param("id"));
  const { year } = await c.req.json();
  try {
    const updatedYear = await service.updateAcademicYearService(id, year);
    return c.json(updatedYear);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
};

// DELETE
export const deleteAcademicYearController = async (c: Context) => {
  const id = String(c.req.param("id"));
  try {
    await service.deleteAcademicYearService(id);
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
};
