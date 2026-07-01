const fs = require('fs');
const path = require('path');
const pool = require('./database');

async function initDb() {
  try {
    const schemaPath = path.join(__dirname, 'dbschema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.log('No dbschema.sql found. Skipping auto-init.');
      return;
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    const queries = schema
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    // Check if the first table exists (e.g. students) to avoid running this on every startup unnecessarily
    const [rows] = await pool.query("SHOW TABLES LIKE 'students'");
    if (rows.length > 0) {
      console.log('Database already initialized. Skipping dbschema.sql.');
      return;
    }

    console.log(`Executing dbschema.sql (${queries.length} queries)...`);
    for (const query of queries) {
      try {
        await pool.query(query);
      } catch (err) {
        console.error('Error executing query:', query);
        console.error(err);
      }
    }
    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

module.exports = initDb;
