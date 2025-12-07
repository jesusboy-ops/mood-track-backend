import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body
 * @returns {Promise<object>} Send result
 */
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Email send failed:', error);
    throw new Error(`Email send failed: ${error.message}`);
  }
};

/**
 * Send welcome email
 * @param {string} email - User email
 * @param {string} name - User name
 */
export const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to MoodMate!';
  const text = `Hello ${name},\n\nWelcome to MoodMate! We're excited to have you on board.\n\nStart tracking your moods and journaling your thoughts today.\n\nBest regards,\nThe MoodMate Team`;
  
  await sendEmail(email, subject, text);
};
