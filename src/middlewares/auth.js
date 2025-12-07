import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import logger from '../utils/logger.js';

/**
 * Authenticate JWT token
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if session exists
    const session = await prisma.session.findUnique({
      where: { jwtToken: token },
      include: { User: true },
    });

    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    // Check if session expired
    if (new Date() > session.expiresAt) {
      await prisma.session.delete({ where: { id: session.id } });
      return res.status(401).json({ error: 'Session expired' });
    }

    // Attach user to request
    req.user = session.User;
    req.token = token;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

/**
 * Generate JWT token
 * @param {object} user - User object
 * @returns {string} JWT token
 */
export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};
