import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const motivationalMessages = [
  // Positive messages
  { moodType: 'positive', content: '🌟 Keep shining! Your positive energy is contagious!' },
  { moodType: 'positive', content: '✨ Amazing! You\'re doing great. Keep up the good vibes!' },
  { moodType: 'positive', content: '🎉 Your happiness is inspiring! Share that smile with the world!' },
  { moodType: 'positive', content: '💫 You\'re radiating positivity! Keep spreading that joy!' },
  { moodType: 'positive', content: '🌈 What a wonderful mood! Remember this feeling!' },
  { moodType: 'positive', content: '⭐ You\'re on fire today! Keep that momentum going!' },
  { moodType: 'positive', content: '🎊 Celebrate this moment! You deserve all the happiness!' },
  
  // Neutral messages
  { moodType: 'neutral', content: '🌿 Balance is beautiful. Take time to appreciate the calm.' },
  { moodType: 'neutral', content: '☁️ Steady and stable. You\'re doing just fine.' },
  { moodType: 'neutral', content: '🍃 Sometimes neutral is exactly what we need. Be present.' },
  { moodType: 'neutral', content: '🌊 Riding the waves of life with grace. Keep going.' },
  { moodType: 'neutral', content: '🕊️ Peace in the ordinary. You\'re exactly where you need to be.' },
  { moodType: 'neutral', content: '🧘 Finding balance is a strength. Embrace the stillness.' },
  { moodType: 'neutral', content: '🌾 Steady progress is still progress. You\'re doing well.' },
  
  // Negative messages
  { moodType: 'negative', content: '💪 Tough times don\'t last, but tough people do. You\'ve got this!' },
  { moodType: 'negative', content: '🌱 Every storm runs out of rain. Better days are coming.' },
  { moodType: 'negative', content: '🤗 It\'s okay to not be okay. Be gentle with yourself today.' },
  { moodType: 'negative', content: '🌅 This feeling is temporary. You\'re stronger than you know.' },
  { moodType: 'negative', content: '💙 Take a deep breath. You\'re doing better than you think.' },
  { moodType: 'negative', content: '🌟 Even the darkest night will end and the sun will rise.' },
  { moodType: 'negative', content: '🫂 You\'re not alone. Reach out if you need support.' },
  { moodType: 'negative', content: '🌻 This too shall pass. Hold on, brighter days are ahead.' },
  { moodType: 'negative', content: '💝 Be kind to yourself. You\'re doing the best you can.' },
  { moodType: 'negative', content: '🌈 After every storm comes a rainbow. Keep hope alive.' },
];

async function main() {
  console.log('Starting to seed motivational messages...');

  const existingCount = await prisma.motivationalMessage.count();
  
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} motivational messages.`);
    console.log('Skipping seed to avoid duplicates.');
    return;
  }

  const result = await prisma.motivationalMessage.createMany({
    data: motivationalMessages,
  });

  console.log(`✅ Successfully seeded ${result.count} motivational messages!`);
  
  // Show count by mood type
  const positive = await prisma.motivationalMessage.count({ where: { moodType: 'positive' } });
  const neutral = await prisma.motivationalMessage.count({ where: { moodType: 'neutral' } });
  const negative = await prisma.motivationalMessage.count({ where: { moodType: 'negative' } });
  
  console.log(`\nBreakdown:`);
  console.log(`  Positive: ${positive} messages`);
  console.log(`  Neutral: ${neutral} messages`);
  console.log(`  Negative: ${negative} messages`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
