import { Context } from "hono";
import * as mapelKelasService from "../services/classCourse";

// Mendapatkan semua MapelKelas
export const getAllClassCourseController = async (c: Context) => {
  try {
    const mapelKelas = await mapelKelasService.getAllClassCourseService();
    return c.json(mapelKelas);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Mendapatkan MapelKelas berdasarkan MapelId dan KelasId
export const getClassCourseByIdController = async (c: Context) => {
  const mapelId = Number(c.req.param("mapelId"));
  const kelasId = Number(c.req.param("kelasId"));
  try {
    const mapelKelas = await mapelKelasService.getClassCourseByIdService(
      mapelId,
      kelasId
    );
    return c.json(mapelKelas);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 404);
  }
};

// Menambahkan MapelKelas baru
export const createClassCourseController = async (c: Context) => {
  const data = await c.req.json();
  try {
    const newMapelKelas = await mapelKelasService.createClassCourseService(
      data
    );
    return c.json(newMapelKelas, 201);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Menghapus MapelKelas berdasarkan MapelId dan KelasId
export const deleteClassCourseByIdController = async (c: Context) => {
  const mapelId = Number(c.req.param("mapelId"));
  const kelasId = Number(c.req.param("kelasId"));
  try {
    await mapelKelasService.deleteClassCourseByIdService(mapelId, kelasId);
    return c.json({ message: "MapelKelas berhasil dihapus" });
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Memperbarui MapelKelas berdasarkan MapelId dan KelasId
// export const updateClassCourseByIdController = async (c: Context) => {
//   try {
//     const mapelId = parseInt(c.req.param("mapelId"), 10);
//     const kelasId = parseInt(c.req.param("kelasId"), 10);

//     if (isNaN(mapelId) || isNaN(kelasId)) {
//       return c.json({ message: "ID Mapel atau Kelas tidak valid" }, 400);
//     }

//     const data = await c.req.json();
//     if (!data || typeof data.nilai !== "number") {
//       return c.json(
//         { message: "Data tidak valid, pastikan format nilai benar" },
//         400
//       );
//     }

//     const updatedMapelKelas =
//       await mapelKelasService.updateClassCourseByIdService(
//         mapelId,
//         kelasId,
//         data
//       );

//     return c.json(updatedMapelKelas);
//   } catch (error) {
//     return c.json({ message: (error as Error).message }, 400);
//   }
// };
