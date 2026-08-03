const db = require('./database');

async function testConnection() {
  console.log('Testing connection to Supabase PostgreSQL...');
  try {
    const [rows] = await db.query('SELECT NOW() as current_time, (SELECT count(*) FROM students) as student_count');
    console.log('✅ Connection to Supabase PostgreSQL successful!');
    console.log('Database Server Time:', rows[0].current_time);
    console.log('Current Students Count:', rows[0].student_count);
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    if (err.code) console.error('Error Code:', err.code);
    process.exit(1);
  }
}

testConnection();
