require('dotenv').config();
const mysql = require('mysql2');

const poolConfig = process.env.MYSQL_URL 
  ? { uri: process.env.MYSQL_URL } 
  : {
      host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
      user: process.env.MYSQL_USER || process.env.DB_USER || 'root',
      password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || 'localhost@123',
      database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'almamatters',
      port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
      waitForConnections: true,
      connectionLimit: 10,
    };

const pool = mysql.createPool(poolConfig);

// Test the connection
pool.getConnection((err, conn) => {
  if (err) {
    console.error('MySQL pool connection failed:', err.message);
  } else {
    console.log('MySQL Pool Connected');
    conn.release();
  }
});

// Export the promise pool
module.exports = pool.promise();