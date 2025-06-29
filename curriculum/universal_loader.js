import fs from 'fs';
import path from 'path';
import prisma from '../db/prismaClient';

// This will be your master loader
export async function loadCurriculum({ classLevel, term }) {
  // Load static JSON files by level and term
  const basePath = path.join(process.cwd(), 'curriculum', 'plans', classLevel);
  const termFile = ${term}.json;

  let curriculum = {};
  try {
    const fileContent = fs.readFileSync(path.join(basePath, termFile), 'utf-8');
    curriculum = JSON.parse(fileContent);
  } catch (err) {
    console.error("❌ Error loading curriculum:", err);
    return {};
  }

  // Enrich with DB-stored literacy kits, VR, psychomotor modules
  const literacyKits = await prisma.literacyKit.findMany({
    where: { classLevel, term },
  });

  const events = await prisma.termEvents.findMany({
    where: { classLevel, term },
  });

  const catModules = await prisma.catModules.findMany({
    where: { classLevel },
  });

  return {
    classLevel,
    term,
    subjects: curriculum.subjects,
    literacyKits,
    events,
    catModules,
  };
}