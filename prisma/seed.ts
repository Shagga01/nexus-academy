// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting expert seeding...')

  const hashedPassword = await bcrypt.hash('password123', 10)

  // Ensure Admin, Teacher, Student exist
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      firstName: 'Super',
      lastName: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: hashedPassword,
      role: 'TEACHER',
    },
  })

  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      password: hashedPassword,
      role: 'STUDENT',
    },
  })

  console.log('✅ Users ensured in DB.')

  // === Expert multi-course data
  const courses = [
    { title: "Mathematics", desc: "Logical reasoning & numeracy with VR cooking & budgeting.", price: 120 },
    { title: "Science", desc: "Physics, chemistry, biology in VR labs.", price: 140 },
    { title: "English Language & Literacy", desc: "Comprehension, poetry, VR story analyzers.", price: 100 },
    { title: "History & Civics", desc: "VR tours of historical sites & civic reflections.", price: 90 },
    { title: "Information & Communication Tech", desc: "Digital literacy, coding bots in VR.", price: 130 },
    { title: "Cognitive Abilities Skills", desc: "CAT4-style puzzles with ITS scaling.", price: 85 },
    { title: "Vocational Skills", desc: "Basic electricals, culinary in VR workshops.", price: 75 },
    { title: "Music & Creative Arts", desc: "VR galleries, sound labs, instruments.", price: 95 },
    { title: "Financial Literacy & Entrepreneurship", desc: "Budgeting, micro-business VR.", price: 115 },
    { title: "Psychomotor & Physical", desc: "Reflex games, VR sports arenas.", price: 70 },
    { title: "Social & Emotional Learning", desc: "Empathy, teamwork VR stories.", price: 80 },
    { title: "Religious & Moral Education", desc: "Ethics, comparative religion VR.", price: 60 },
    { title: "Geography & Environment", desc: "Climate, ecosystems in VR.", price: 100 },
    { title: "Health & Wellbeing", desc: "Nutrition, mental health VR micro-games.", price: 90 },
    { title: "Foreign Languages", desc: "French, Spanish VR immersion rooms.", price: 110 },
    { title: "Critical Thinking & Innovation", desc: "Logic, VR invention labs.", price: 125 },
  ]

  for (const course of courses) {
    const createdCourse = await prisma.course.upsert({
      where: { title: course.title },
      update: {},
      create: {
        title: course.title,
        description: course.desc,
        price: course.price,
        durationHours: faker.number.int({ min: 20, max: 50 }),
        isPublished: true,
        status: 'PUBLISHED',
        teacherId: teacher.id,
        modules: {
          create: [
            {
              title: "Intro Level (Ages 4-6)",
              description: `VR playful scenarios in ${course.title}`,
              order: 1,
              lessons: {
                create: [
                  {
                    title: `Basics of ${course.title}`,
                    content: `Simple VR stories introducing ${course.title}`,
                    order: 1,
                    videoUrl: faker.internet.url(),
                    learningObjectives: JSON.stringify({ goals: [`Identify basics of ${course.title}`]}),
                    autoQuizJson: JSON.stringify({ questions: [`What is ${course.title}?`], type: "MCQ" }),
                  }
                ]
              }
            },
            {
              title: "Exploratory Level (Ages 7-9)",
              description: `Hands-on VR experiences linking ${course.title} with other skills.`,
              order: 2,
              lessons: {
                create: [
                  {
                    title: `Exploring ${course.title}`,
                    content: `Explore ${course.title} through VR cooking, music, civic scenarios.`,
                    order: 1,
                    videoUrl: faker.internet.url(),
                    learningObjectives: JSON.stringify({ goals: [`Apply ${course.title} in life tasks`]}),
                    autoQuizJson: JSON.stringify({ questions: [`Give a real-life use of ${course.title}`], type: "Short Answer" }),
                  }
                ]
              }
            },
            {
              title: "Developing Level (Ages 10-12)",
              description: `Complex VR tasks: budgeting, science labs, historical tours connecting ${course.title}.`,
              order: 3,
              lessons: {
                create: [
                  {
                    title: `Deep Dive into ${course.title}`,
                    content: `Use VR labs cross-linking ${course.title} with Financial Literacy, SEL, Geography.`,
                    order: 1,
                    videoUrl: faker.internet.url(),
                    learningObjectives: JSON.stringify({ goals: [`Solve problems using ${course.title}`]}),
                    autoQuizJson: JSON.stringify({ questions: [`Explain how ${course.title} relates to budgeting`], type: "Essay" }),
                  }
                ]
              }
            },
            {
              title: "Advanced Level (Ages 13-16)",
              description: `Higher order thinking, VR entrepreneurship, AI-backed challenges in ${course.title}.`,
              order: 4,
              lessons: {
                create: [
                  {
                    title: `Mastering ${course.title}`,
                    content: `VR invention labs, global case studies cross-tied with Innovation & ICT.`,
                    order: 1,
                    videoUrl: faker.internet.url(),
                    learningObjectives: JSON.stringify({ goals: [`Innovate with ${course.title}`]}),
                    autoQuizJson: JSON.stringify({ questions: [`Design a project using ${course.title}`], type: "Project" }),
                  }
                ]
              }
            }
          ]
        }
      },
    })

    await prisma.enrollment.upsert({
      where: { studentId_courseId: { studentId: student.id, courseId: createdCourse.id }},
      update: {},
      create: {
        studentId: student.id,
        courseId: createdCourse.id,
      }
    })

    console.log(`✅ Course seeded: ${createdCourse.title}`)
  }

  console.log('🌱 Expert seeding complete.')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Error during expert seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
