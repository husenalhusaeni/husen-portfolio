const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Bersihkan data lama jika ada
  await prisma.experience.deleteMany({});

  console.log('Seeding initial experiences...');

  const experiences = [
    {
      title: 'Customer Service Supervisor',
      company: 'PT Jasa Marga (Persero) Tbk',
      location: 'Jakarta',
      startDate: 'Januari 2023',
      endDate: 'Sekarang',
      description: '• Memimpin tim pelayanan pelanggan di gerbang tol wilayah Jakarta untuk memastikan kelancaran transaksi dan kepuasan pengguna jalan tol.\n• Mengelola operasional harian, termasuk koordinasi dengan tim lapangan dan penyelesaian cepat serta taktis atas keluhan pelanggan.\n• Menganalisis laporan harian volume kendaraan dan efisiensi waktu transaksi tol menggunakan aplikasi internal dan Ms. Office.',
      imageUrl: '/avatar.jpg' // Logo default / placeholder (avatar pengguna)
    },
    {
      title: 'Toll Road Operations Staff',
      company: 'PT Citra Marga Nusaphala Persada Tbk (CMNP)',
      location: 'Jakarta',
      startDate: 'Juli 2021',
      endDate: 'Desember 2022',
      description: '• Melakukan pengawasan langsung terhadap kondisi lalu lintas jalan tol, kesiapan gardu transaksi, serta penanganan gangguan lalu lintas (mobil derek & tim rescue).\n• Berkomunikasi secara efektif dengan Sentral Komunikasi (Senkom) untuk koordinasi cepat saat terjadi insiden di lapangan.\n• Menyusun laporan administrasi operasional jalan tol secara rutin dengan akurasi dan ketelitian tinggi menggunakan komputer.',
      imageUrl: '/avatar.jpg'
    }
  ];

  for (const exp of experiences) {
    const created = await prisma.experience.create({
      data: exp
    });
    console.log(`Created experience: ${created.title} at ${created.company}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
