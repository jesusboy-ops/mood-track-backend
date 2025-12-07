import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';
import { generateToken } from '../middlewares/auth.js';
import { verifyGoogleToken } from '../config/auth.js';
import { sendWelcomeEmail } from '../config/email.js';

/**
 * Register new user
 */
export const registerUser = async (name, email, password) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate token
  const token = generateToken(user);

  // Create session
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: {
      userId: user.id,
      jwtToken: token,
      expiresAt,
    },
  });

  // Send welcome email
  try {
    await sendWelcomeEmail(email, name);
  } catch (error) {
    // Don't fail registration if email fails
    console.error('Failed to send welcome email:', error);
  }

  return { user, token };
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateToken(user);

  // Create session
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: {
      userId: user.id,
      jwtToken: token,
      expiresAt,
    },
  });

  return { user, token };
};

/**
 * Google OAuth login
 */
export const googleLogin = async (googleToken) => {
  // Verify Google token
  const googleUser = await verifyGoogleToken(googleToken);

  // Find or create user
  let user = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        avatar: googleUser.avatar,
      },
    });

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  } else if (!user.googleId) {
    // Link Google account to existing user
    user = await prisma.user.update({
      where: { id: user.id },
      data: { googleId: googleUser.googleId },
    });
  }

  // Generate token
  const token = generateToken(user);

  // Create session
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: {
      userId: user.id,
      jwtToken: token,
      expiresAt,
    },
  });

  return { user, token };
};

/**
 * Logout user
 */
export const logoutUser = async (token) => {
  await prisma.session.delete({
    where: { jwtToken: token },
  });
};
