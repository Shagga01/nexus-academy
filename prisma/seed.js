// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs'; // For hashing passwords

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding users...');

  // Clear existing data (optional, but good for clean resets)
  await prisma.user.deleteMany({});
  await prisma.studentProfile.deleteMany({});
  await prisma.teacherProfile.deleteMany({});
  await prisma.parentProfile.deleteMany({});
  await prisma.adminProfile.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.transaction.deleteMany({});

  const hashedPassword = await bcrypt.hash('password123', 10); // Hash a default password

  // Create Admin Users
  const admins = [];
  for (let i = 0; i < 5; i++) {
    const fullName = faker.person.fullName();
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    admins.push(
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: hashedPassword,
          firstName: firstName || 'Admin', // Fallback if name split fails
          lastName: lastName || 'User',
          role: 'ADMIN',
          adminProfile: {
            create: {} // Create an empty admin profile
          }
        },
      })
    );
  }
  await Promise.all(admins);
  console.log(`Created ${admins.length} admin users.`);

  // Create Student Users
  const students = [];
  for (let i = 0; i < 50; i++) {
    const fullName = faker.person.fullName();
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    students.push(
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: hashedPassword,
          firstName: firstName || 'Student',
          lastName: lastName || 'User',
          role: 'STUDENT',
          studentProfile: {
            create: {
              dateOfBirth: faker.date.past({ years: 18 }),
              address: faker.location.streetAddress(),
              phoneNumber: faker.phone.number(),
            }
          }
        },
      })
    );
  }
  await Promise.all(students);
  console.log(`Created ${students.length} student users.`);

  // Create Teacher Users
  const teachers = [];
  for (let i = 0; i < 10; i++) {
    const fullName = faker.person.fullName();
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    teachers.push(
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: hashedPassword,
          firstName: firstName || 'Teacher',
          lastName: lastName || 'User',
          role: 'TEACHER',
          teacherProfile: {
            create: {
              bio: faker.lorem.paragraph(),
              qualifications: faker.lorem.sentence(),
            }
          }
        },
      })
    );
  }
  await Promise.all(teachers);
  console.log(`Created ${teachers.length} teacher users.`);

  // Create Parent Users
  const parents = [];
  for (let i = 0; i < 20; i++) {
    const fullName = faker.person.fullName();
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    parents.push(
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: hashedPassword,
          firstName: firstName || 'Parent',
          lastName: lastName || 'User',
          role: 'PARENT',
          parentProfile: {
            create: {}
          }
        },
      })
    );
  }
  await Promise.all(parents);
  console.log(`Created ${parents.length} parent users.`);


  // Add more seeding for Courses, Modules, Lessons, etc. here later
  // For now, focus on getting users seeded correctly.

}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });