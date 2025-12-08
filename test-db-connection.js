import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  console.log('📊 DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('🔗 Host:', process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'Not found');
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test successful:', result);
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('📋 Available tables:', tables.length);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'P1001') {
      console.error('🔧 Suggestion: Check if Supabase database is running and accessible');
      console.error('🔧 Verify: Host, port, username, and password are correct');
      console.error('🔧 Network: Ensure Supabase allows connections from your IP');
    }
    
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });