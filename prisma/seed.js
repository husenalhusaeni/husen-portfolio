const { PrismaClient } = require('@prisma/client');

// Hapus adapter SQLite, langsung inisiasi Prisma standar
const prisma = new PrismaClient();

async function main() {
  // Bersihkan data lama jika ada
  await prisma.experience.deleteMany({});

  console.log('Seeding initial experiences, projects, and training in English...');

  const data = [
    // 1. WORK EXPERIENCES (WORK)
    {
      type: 'WORK',
      title: 'Customer Service Supervisor',
      company: 'PT Jasa Marga (Persero) Tbk',
      location: 'Jakarta',
      startDate: 'January 2023',
      endDate: 'Present',
      description: '• Led a customer service team at toll gates in the Jakarta area to ensure smooth transactions and toll road user satisfaction.\n• Managed daily operations, including coordination with field teams and quick, tactical resolution of customer complaints.\n• Analyzed daily traffic volume reports and toll transaction time efficiency using internal applications and Ms. Office.',
      imageUrl: '/avatar.jpg'
    },
    {
      type: 'WORK',
      title: 'Toll Road Operations Staff',
      company: 'PT Citra Marga Nusaphala Persada Tbk (CMNP)',
      location: 'Jakarta',
      startDate: 'July 2021',
      endDate: 'December 2022',
      description: '• Performed direct supervision of toll road traffic conditions, toll booth readiness, and road disturbance response (towing & rescue teams).\n• Communicated effectively with the Communication Center (Senkom) for rapid field coordination during incidents.\n• Prepared routine toll road operational administrative reports with high accuracy and attention to detail using computers.',
      imageUrl: '/avatar.jpg'
    },

    // 2. PROJECTS (PROJECT)
    {
      type: 'PROJECT',
      title: 'Digitalization of Toll Transaction Reporting',
      company: 'PT Jasa Marga (Persero) Tbk',
      location: 'Jakarta',
      startDate: '2023',
      endDate: '2024',
      description: '• Developed an automated spreadsheet-based digital reporting system to compile daily toll gate volume and revenue reports.\n• Reduced daily administrative report processing time from 3 hours to 45 minutes with 100% data accuracy.\n• Increased toll gate operational team efficiency through standardization of report input flows.',
      imageUrl: '/avatar.jpg'
    },
    {
      type: 'PROJECT',
      title: 'Toll Gate Flow Optimization',
      company: 'PT Citra Marga Nusaphala Persada Tbk (CMNP)',
      location: 'Jakarta',
      startDate: '2022',
      endDate: '2022',
      description: '• Redesigned the layout of guide signs and road markings at toll gates to increase visibility and speed of automatic toll booth transactions.\n• Successfully reduced average vehicle queue times by 15% during afternoon rush hours.\n• Collaborated with engineering teams and highway patrol to ensure traffic safety and smooth flow.',
      imageUrl: '/avatar.jpg'
    },

    // 3. TRAINING & CERTIFICATIONS (TRAINING)
    {
      type: 'TRAINING',
      title: 'Excellent Service Management Certification',
      company: 'MarkPlus Institute',
      location: 'Jakarta',
      startDate: 'August 2023',
      endDate: 'August 2023',
      description: '• Professional certification in customer complaint handling, assertive communication techniques, and service industry psychology.\n• Studied peaceful and tactical conflict resolution strategies in high-speed operational environments.',
      imageUrl: '/avatar.jpg'
    },
    {
      type: 'TRAINING',
      title: 'Toll Road Incident Response & Rescue Readiness',
      company: 'Badan Pengatur Jalan Tol (BPJT)',
      location: 'Jakarta',
      startDate: 'March 2022',
      endDate: 'March 2022',
      description: '• Training certificate in emergency incident handling, toll road traffic accidents, rescue team coordination, and safe fast-lane closures.\n• Developed mental and physical resilience for field readiness in various weather conditions.',
      imageUrl: '/avatar.jpg'
    }
  ];

  for (const item of data) {
    const created = await prisma.experience.create({
      data: item
    });
    console.log(`Created [${created.type}] ${created.title} at ${created.company}`);
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