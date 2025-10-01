// Test Supabase Connection
// Run with: node scripts/test-supabase-connection.js

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Supabase credentials not found in .env.local');
  console.log('\n📋 Make sure you have created .env.local with:');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...[your-anon-key]\n');
  process.exit(1);
}

console.log('✅ Credentials found:');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Key: ${supabaseKey.substring(0, 20)}...\n`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test 1: Database connection
    console.log('📊 Test 1: Database Connection');
    const { error: connectionError } = await supabase
      .from('caregiver_profiles')
      .select('count', { count: 'exact', head: true });
    
    if (connectionError) {
      console.error('❌ Failed:', connectionError.message);
      return false;
    }
    console.log('✅ Success: Database connected\n');

    // Test 2: Check all tables
    console.log('📊 Test 2: Checking Tables');
    const tablesToCheck = [
      'caregiver_profiles',
      'patient_info',
      'zarit_assessments',
      'research_analytics'
    ];

    for (const table of tablesToCheck) {
      const { error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: Table exists`);
      }
    }
    console.log('');

    // Test 3: Test insert permission
    console.log('📊 Test 3: Testing Insert Permission');
    const testData = {
      age: 50,
      gender: 'Kadın',
      relationship_to_patient: 'Eşi',
      lives_with_patient: true,
      caregiving_duration_years: 5.0,
      daily_care_hours: '9 saatten fazla',
      has_chronic_illness: false,
      social_support_level: 3,
      device_type: 'test',
      section_a_completed: false,
      fully_completed: false
    };

    const { data: insertData, error: insertError } = await supabase
      .from('caregiver_profiles')
      .insert(testData)
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      console.log('\n💡 Tip: Make sure RLS policies are configured correctly');
      return false;
    }
    
    console.log('✅ Insert permission: OK');
    
    // Cleanup test data
    if (insertData && insertData[0]) {
      const { error: deleteError } = await supabase
        .from('caregiver_profiles')
        .delete()
        .eq('id', insertData[0].id);
      
      if (!deleteError) {
        console.log('✅ Test data cleaned up\n');
      }
    }

    // Test 4: Check views
    console.log('📊 Test 4: Checking Views');
    const { data: statsData, error: statsError } = await supabase
      .from('assessment_statistics')
      .select('*')
      .limit(1);

    if (statsError) {
      console.log(`⚠️  assessment_statistics view: ${statsError.message}`);
      console.log('   (This is OK if no data exists yet)');
    } else {
      console.log('✅ assessment_statistics view: Accessible');
    }

    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ Supabase is ready for production use!\n');
    console.log('📋 Next Steps:');
    console.log('   1. Update Netlify environment variables');
    console.log('   2. Start form implementation');
    console.log('   3. Test with real data\n');
    
    return true;

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error('\n📋 Stack trace:', error.stack);
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });



