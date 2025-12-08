import { supabase, testSupabaseConnection } from './src/config/supabase.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testSupabaseSetup() {
  console.log('🔍 Testing Supabase setup...');
  console.log('📊 SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
  console.log('🔑 SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);
  
  try {
    // Test connection
    const connected = await testSupabaseConnection();
    
    if (connected) {
      console.log('✅ Supabase connection successful!');
      
      // Test a simple operation
      console.log('🔍 Testing user table access...');
      const { data, error, count } = await supabase
        .from('User')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('❌ Table access failed:', error.message);
        return false;
      }
      
      console.log(`✅ User table accessible, ${count} records found`);
      return true;
      
    } else {
      console.error('❌ Supabase connection failed');
      return false;
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error.message);
    return false;
  }
}

testSupabaseSetup()
  .then((success) => {
    console.log(success ? '🎉 Supabase setup complete!' : '💥 Supabase setup failed!');
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('💥 Test failed:', error);
    process.exit(1);
  });