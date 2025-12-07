import prisma from '../prisma/client.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import fs from 'fs/promises';

/**
 * Create journal entry
 */
export const createJournalEntry = async (userId, title, content, moodEntryId, imageFile) => {
  let imageUrl = null;
  let publicId = null;

  // Upload image if provided
  if (imageFile) {
    const result = await uploadToCloudinary(imageFile.path, 'moodmate/journals');
    imageUrl = result.url;
    publicId = result.publicId;
    
    // Delete local file
    await fs.unlink(imageFile.path);
  }

  const journalEntry = await prisma.journalEntry.create({
    data: {
      userId,
      title,
      content,
      moodEntryId,
      imageUrl,
    },
  });

  return journalEntry;
};

/**
 * Get user journal entries
 */
export const getUserJournalEntries = async (userId, limit = 50) => {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      MoodEntry: true,
    },
  });
  return entries;
};

/**
 * Get journal entry by ID
 */
export const getJournalEntryById = async (id, userId) => {
  const entry = await prisma.journalEntry.findFirst({
    where: { id, userId },
    include: {
      MoodEntry: true,
    },
  });
  return entry;
};

/**
 * Update journal entry
 */
export const updateJournalEntry = async (id, userId, data, imageFile) => {
  let updateData = { ...data };

  // Upload new image if provided
  if (imageFile) {
    const result = await uploadToCloudinary(imageFile.path, 'moodmate/journals');
    updateData.imageUrl = result.url;
    
    // Delete local file
    await fs.unlink(imageFile.path);
  }

  const entry = await prisma.journalEntry.updateMany({
    where: { id, userId },
    data: updateData,
  });

  return entry;
};

/**
 * Delete journal entry
 */
export const deleteJournalEntry = async (id, userId) => {
  await prisma.journalEntry.deleteMany({
    where: { id, userId },
  });
};
