import fs from 'fs';
import path from 'path';

const classes = ['Primary1','Primary2','Primary3','Primary4','Primary5','Primary6',
                'Secondary1','Secondary2','Secondary3','Secondary4','Secondary5','Secondary6'];

const subjects = [
  { name: "Mathematics", topics: ["Addition", "Subtraction", "Fractions", "Decimals"] },
  { name: "English", topics: ["Reading", "Comprehension", "Creative writing", "Grammar"] },
  { name: "Science", topics: ["Living things", "Energy", "Experiments"] },
  { name: "Integrated Science", topics: ["Earth science", "Practical labs"] },
  { name: "Agricultural Science", topics: ["Soil", "Plants", "Farm records"] },
  { name: "Economics", topics: ["Needs & Wants", "Simple budgeting"] },
  { name: "Cultural Studies", topics: ["Festivals", "World civilizations"] },
  { name: "ICT", topics: ["Typing", "Scratch basics"] },
  { name: "Art & Music", topics: ["Drawing", "Song interpretation"] },
  { name: "Physical Education", topics: ["Team sports", "Fitness"] },
  { name: "Practical Vocational", topics: ["Technical drawing", "Crafts"] },
  { name: "CAT Verbal", topics: ["Classification", "Analogy"] },
  { name: "CAT Quantitative", topics: ["Number Series", "Number Analogy"] },
  { name: "CAT Non-Verbal", topics: ["Figure Matrix", "Figure Classification"] },
  { name: "CAT Spatial", topics: ["Figure Analysis", "Recognition"] }
];

for (const classLevel of classes) {
  for (let term = 1; term <= 3; term++) {
    const data = {
      subjects: subjects.map(s => ({
        name: s.name,
        topics: s.topics.slice(0, Math.ceil(Math.random() * s.topics.length))
      }))
    };

    const dir = path.join('curriculum', 'plans', classLevel);
    fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `term${term}.json`), JSON.stringify(data, null, 2));
    console.log(`✅ Created ${classLevel}/term${term}.json`);
  }
}