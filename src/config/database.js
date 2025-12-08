import prisma from '../prisma/client.js';
import logger from '../utils/logger.js';

/**
 * Test database connection with retry logic
 */
export const connectDatabase = async () => {
  const maxRetries = 5;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`🔄 Database connection attempt ${retries + 1}/${maxRetries}`);
      
      // Test connection
      await prisma.$connect();
      
      // Test a simple query to ensure it's really working
      await prisma.$queryRaw`SELECT 1`;
      
      logger.info('✅ Database connected successfully');
      console.log('✅ Database connection verified with query test');
      return;
      
    } catch (error) {
      retries++;
      console.error(`❌ Database connection attempt ${retries} failed:`, error.message);
      
      if (retries >= maxRetries) {
        logger.error('Database connection failed after all retries:', error);
        console.error('🔧 Troubleshooting suggestions:');
        console.error('  1. Check if DATABASE_URL is correct');
        console.error('  2. Verify Supabase database is running');
        console.error('  3. Check network connectivity');
        console.error('  4. Ensure SSL mode is properly configured');
        process.exit(1);
      }
      
      // Wait before retry (exponential backoff)
      const waitTime = Math.pow(2, retries) * 1000;
      console.log(`⏳ Waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
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
