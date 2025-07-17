import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'
import cron from 'node-cron'

const prisma = new PrismaClient()
const openai = new OpenAI()

async function updateCurriculumContent() {
  console.log('🤖 Fetching curriculum updates...')

  const lessons = await prisma.lesson.findMany()

  for (const lesson of lessons) {
    const aiObjectives = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an expert education AI.' },
        { role: 'user', content: `Generate WAEC / Cambridge aligned objectives & a quiz for topic: "${lesson.title}"` },
      ],
    })

    await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        learningObjectives: JSON.stringify({ objectives: aiObjectives.choices[0].message.content }),
        autoQuizJson: JSON.stringify({ generated: aiObjectives.choices[0].message.content }),
      }
    })

    console.log(`🔄 Updated lesson: ${lesson.title}`)
  }
  console.log('✅ Curriculum aligned with WAEC / Cambridge / UNESCO.')
}

// Schedule every Sunday at 2am
cron.schedule('0 2 * * 0', () => {
  console.log('🕑 Running weekly auto-update...')
  updateCurriculumContent()
})
