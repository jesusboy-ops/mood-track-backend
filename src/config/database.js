import prisma from '../prisma/client.js';
import { testSupabaseConnection } from './supabase.js';
import logger from '../utils/logger.js';

/**
 * Test database connection with Supabase fallback
 */
export const connectDatabase = async () => {
  console.log('🔄 Testing database connections...');
  
  // Try Prisma first (for local development)
  try {
    console.log('📡 Attempting Prisma connection...');
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    
    logger.info('✅ Prisma database connected successfully');
    console.log('✅ Using Prisma for database operations');
    return 'prisma';
    
  } catch (prismaError) {
    console.log('❌ Prisma connection failed:', prismaError.message);
    console.log('🔄 Trying Supabase client...');
    
    // Try Supabase client (for Render deployment)
    try {
      const supabaseConnected = await testSupabaseConnection();
      
      if (supabaseConnected) {
        logger.info('✅ Supabase client connected successfully');
        console.log('✅ Using Supabase client for database operations');
        return 'supabase';
      } else {
        throw new Error('Supabase connection test failed');
      }
      
    } catch (supabaseError) {
      console.error('❌ Both Prisma and Supabase connections failed');
      console.error('Prisma error:', prismaError.message);
      console.error('Supabase error:', supabaseError.message);
      
      logger.error('Database connection failed completely');
      process.exit(1);
    }
  }
};

/**
 * Disconnect database
 */
export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected');
  } catch (error) {
    logger.error('Error disconnecting database:', error);
  }
};
