import prisma from "../../../configs/database";

export const createJurusan = async (data: {
  nama: string;
  deskripsi?: string;
}) => {
  return prisma.jurusan.create({
    data,
  });
};

export const findAllJurusan = async () => {
  return prisma.jurusan.findMany({
    include: {
      Kelas: {
        include: {
          MemberKelas: {
            include: {
              StudentProfil: true, // Menampilkan student profil dalam setiap kelas
            },
          },
          MapelKelas: {
            include: {
              Mapel: true, // Menampilkan mapel dalam setiap kelas
            },
          },
        },
      },
    },
  }).then(jurusans => {
    return jurusans.map(jurusan => {
      return {
        ...jurusan,
        Kelas: {
          GANJIL: jurusan.Kelas.filter(kelas => kelas.semester === "GANJIL"),
          GENAP: jurusan.Kelas.filter(kelas => kelas.semester === "GENAP"),
        },
      };
    });
  });
};

export const findJurusanById = async (id: number) => {
  return prisma.jurusan.findUnique({
    where: { id },
    include: {
      Kelas: true,
      StudentProfil: true,
      Mapel: true,
    },
  });
};

export const updateJurusanById = async (
  id: number,
  data: {
    nama?: string;
    deskripsi?: string;
  }
) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  return prisma.jurusan.update({
    where: { id },
    data: filteredData,
  });
};

export const deleteJurusanById = async (id: number) => {
  return prisma.jurusan.delete({
    where: { id },
  });
};
