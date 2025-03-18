import * as mapelService from "../services/course";
import { Context } from "hono";

// Mendapatkan semua Mapel
export const getAllCourseController = async (c: Context) => {
  try {
    const mapels = await mapelService.getAllCourseService();
    return c.json(mapels);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Mendapatkan Mapel berdasarkan ID
export const getCourseByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    const mapel = await mapelService.getCourseByIdService(id);
    return c.json(mapel);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 404);
  }
};

// Menambahkan Mapel baru
export const createCourseController = async (c: Context) => {
  try {
    const data = await c.req.json();
    console.log(data);

    if (!data.type || !data.namaMapel) {
      return c.json({ message: "Type dan namaMapel wajib diisi" }, 400);
    }

    const newMapel = await mapelService.createCourseService(data);
    return c.json(newMapel, 201);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Memperbarui Mapel berdasarkan ID
export const updateCourseByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  try {
    const updatedMapel = await mapelService.updateCourseByIdService(id, data);
    return c.json(updatedMapel);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Menghapus Mapel berdasarkan ID
export const deleteCourseController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    await mapelService.deleteCourseService(id);
    return c.json({ message: "Mapel berhasil dihapus" });
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};
