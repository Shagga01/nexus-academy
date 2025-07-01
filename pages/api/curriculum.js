import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const baseDir = path.join(process.cwd(), 'curriculum', 'plans');
  let result = [];

  const classLevels = fs.readdirSync(baseDir);
  classLevels.forEach(level => {
    const termFiles = fs.readdirSync(path.join(baseDir, level));
    termFiles.forEach(file => {
      const filePath = path.join(baseDir, level, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      result.push({
        classLevel: level,
        term: file.replace('.json', ''),
        curriculum: content
      });
    });
  });

  res.status(200).json(result);
}