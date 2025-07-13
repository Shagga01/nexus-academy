import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.$transaction(async (tx) => {
    // 1. USERS
    const usersData = Array.from({ length: 20 }).map((_, i) => ({
      name: faker.person.fullName(),
      role: i < 2 ? 'admin' : 'student',
      email: faker.internet.email(),
      hashed_password: faker.internet.password(),
    }));
    await tx.users.createMany({ data: usersData, skipDuplicates: true });
    const users = await tx.users.findMany();
    console.log(`✅ Seeded ${users.length} users`);

    // 2. STUDENTS
    const studentsData = users
      .filter(u => u.role === 'student')
      .map(u => ({
        student_code: `STU-${faker.string.alphanumeric(6).toUpperCase()}`,
        name: u.name,
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        dob: faker.date.birthdate({ min: 10, max: 18, mode: 'age' }),
        address: faker.location.streetAddress(),
        class_level: `Grade ${faker.number.int({ min: 1, max: 12 })}`
      }));
    await tx.students.createMany({ data: studentsData, skipDuplicates: true });
    const students = await tx.students.findMany();
    console.log(`✅ Seeded ${students.length} students`);

    // 3. PARENTS
    const parentsData = students.flatMap(student =>
      Array.from({ length: 2 }).map(() => ({
        student_id: student.id,
        name: faker.person.fullName(),
        phone: faker.phone.number('+23480#######'),
        email: faker.internet.email(),
        address: faker.location.city()
      }))
    );
    await tx.parents.createMany({ data: parentsData, skipDuplicates: true });
    console.log(`✅ Seeded parents`);

    // ...repeat similarly for subjects, topics, lessons, fees, academic_records
  });

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected Prisma client");
  });