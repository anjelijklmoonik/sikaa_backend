import prisma from "../../../configs/database";

export const createStudentProfile = async (data: {
  nama: string;
  kelas: string;
  jurusanId?: number;
  alamat: string;
  ttl: string;
  jenisKelamin: string;
  noIndukSiswa: string;
  sekolah: string;
  foto?: string | null;
  noTelp?: string | null;
  email?: string | null;
  namaAyah?: string | null;
  namaIbu?: string | null;
  noTelpAyah?: string | null;
  noTelpIbu?: string | null;
  namaWali?: string | null;
  noTelpWali?: string | null;
  agama?: string | null;
}) => {
  return await prisma.studentProfil.create({
    data: {
      nama: data.nama,
      kelas: data.kelas,
      Jurusan: data.jurusanId
        ? {
            connect: { id: data.jurusanId },
          }
        : undefined,
      alamat: data.alamat,
      ttl: data.ttl,
      jenisKelamin: data.jenisKelamin,
      noIndukSiswa: data.noIndukSiswa,
      sekolah: data.sekolah,
      foto: data.foto ?? null,
      noTelp: data.noTelp ?? null,
      email: data.email ?? null,
      namaAyah: data.namaAyah ?? null,
      namaIbu: data.namaIbu ?? null,
      noTelpAyah: data.noTelpAyah ?? null,
      noTelpIbu: data.noTelpIbu ?? null,
      namaWali: data.namaWali ?? null,
      noTelpWali: data.noTelpWali ?? null,
      agama: data.agama ?? null,
    },
    include: {
      Jurusan: true,
      users: true,
      Keuangan: true,
    },
  });
};

export const findAllStudentProfiles = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  // Query untuk mengambil data dengan include
  const profiles = await prisma.studentProfil.findMany({
    skip,
    take: limit,
    include: {
      Jurusan: true,
      users: true,
      Keuangan: true,
    },
    orderBy: { id: "asc" }, // Tambahkan agar hasil selalu konsisten
  });

  // Hitung total data
  const totalProfiles = await prisma.studentProfil.count();

  return {
    data: profiles,
    total: totalProfiles,
    page,
    limit,
    totalPages: Math.ceil(totalProfiles / limit),
  };
};

export const findStudentProfileById = async (id: number) => {
  return await prisma.studentProfil.findUnique({
    where: { id },
    include: { Jurusan: true },
  });
};

export const updateStudentProfileById = async (id: number, data: any) => {
  if (!id) {
    throw new Error("ID tidak valid, update gagal.");
  }

  // Ambil data lama dari database
  const existingProfile = await prisma.studentProfil.findUnique({
    where: { id },
  });

  if (!existingProfile) {
    throw new Error("Profil tidak ditemukan.");
  }

  // Gabungkan data baru dengan data lama
  const updatedData = {
    nama: data.nama ?? existingProfile.nama,
    noIndukSiswa: data.noIndukSiswa ?? existingProfile.noIndukSiswa,
    sekolah: data.sekolah ?? existingProfile.sekolah,
    kelas: data.kelas ?? existingProfile.kelas,
    jurusanId: data.jurusanId ?? existingProfile.jurusanId,
    alamat: data.alamat ?? existingProfile.alamat,
    ttl: data.ttl ?? existingProfile.ttl,
    jenisKelamin: data.jenisKelamin ?? existingProfile.jenisKelamin,
    noTelp: data.noTelp ?? existingProfile.noTelp,
    email: data.email ?? existingProfile.email,
    namaAyah: data.namaAyah ?? existingProfile.namaAyah,
    namaIbu: data.namaIbu ?? existingProfile.namaIbu,
    noTelpAyah: data.noTelpAyah ?? existingProfile.noTelpAyah,
    noTelpIbu: data.noTelpIbu ?? existingProfile.noTelpIbu,
    namaWali: data.namaWali ?? existingProfile.namaWali,
    noTelpWali: data.noTelpWali ?? existingProfile.noTelpWali,
    agama: data.agama ?? existingProfile.agama,
    academicYearId: data.academicYearId ?? existingProfile.academicYearId,
  };

  // Lakukan update ke database
  return await prisma.studentProfil.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteStudentProfileById = async (id: number) => {
  return await prisma.studentProfil.delete({
    where: { id },
  });
};

export const countStudentSMA = async () => {
  return await prisma.studentProfil.count({
    where: {
      sekolah: { equals: "SMA", mode: "insensitive" },
    },
  });
};

export const countStudentSMK = async () => {
  return await prisma.studentProfil.count({
    where: {
      sekolah: { equals: "SMK", mode: "insensitive" },
    },
  });
};
