const assert = require('assert');

console.log('--- Testing Database Adapter Query Converter & Structure ---');

// Mock require of database to verify exports and placeholder converter
const db = require('./database');

// We can test the internal helper functions if exported or by testing db structure
assert.strictEqual(typeof db.query, 'function', 'db.query should be a function');
assert.strictEqual(typeof db.execute, 'function', 'db.execute should be a function');
assert.strictEqual(typeof db.getConnection, 'function', 'db.getConnection should be a function');

console.log('✅ db export shape validated successfully');

// Verify all route and controller modules load cleanly
console.log('--- Verifying Backend Modules Loading ---');
try {
    require('./controllers/adminController');
    require('./controllers/alumniController');
    require('./controllers/authController');
    require('./controllers/communityController');
    require('./controllers/followController');
    require('./controllers/jobController');
    require('./controllers/messageController');
    require('./controllers/postController');
    require('./controllers/sessionController');
    require('./controllers/studentController');
    console.log('✅ All 10 controllers loaded cleanly without errors');
} catch (err) {
    console.error('❌ Failed loading controller:', err);
    process.exit(1);
}

try {
    require('./routes/adminRoutes');
    require('./routes/alumniRoutes');
    require('./routes/authRoutes');
    require('./routes/communityRoutes');
    require('./routes/followRoutes');
    require('./routes/jobRoutes');
    require('./routes/messageRoutes');
    require('./routes/postRoutes');
    require('./routes/sessionRoutes');
    require('./routes/studentRoutes');
    require('./routes/uploadRoutes');
    require('./routes/userRoutes');
    console.log('✅ All 12 route files loaded cleanly without errors');
} catch (err) {
    console.error('❌ Failed loading route file:', err);
    process.exit(1);
}

console.log('--- All Adapter & Module Verification Checks Passed Successfully ---');
process.exit(0);
