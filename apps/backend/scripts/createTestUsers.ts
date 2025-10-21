import prisma from '../src/db/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const password = await bcrypt.hash('Test@123', 10);
  const email = 'mateo.kris66@ethereal.email';

  // Create USER
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      username: 'mateo_user',
      email,
      password,
      role: 'STUDENT',
      isMailVerified: true,
      contactNumber: 'NOT_PROVIDED',
      provider: 'email',
    },
  });

  // Create ADMIN with different email
  await prisma.user.upsert({
    where: { email: '24f2003068@ds.study.iitm.ac.in' },
    update: {},
    create: {
      username: 'mateo_admin',
      email: '24f2003068@ds.study.iitm.ac.in',
      password,
      role: 'ADMIN',
      isMailVerified: true,
      contactNumber: 'NOT_PROVIDED',
      provider: 'email',
    },
  });

  console.log('User and Admin created/updated successfully.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
