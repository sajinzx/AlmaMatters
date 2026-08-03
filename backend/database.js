require('dotenv').config();
const { Pool } = require('pg');

// Helper to determine whether SSL is needed
const isRemoteHost = (host) => {
  if (!host) return false;
  return host !== 'localhost' && host !== '127.0.0.1';
};

let poolConfig = {};

const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || process.env.POSTGRES_URL;

if (connectionString) {
  poolConfig = {
    connectionString,
    ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
} else {
  const host = process.env.DB_HOST || process.env.PGHOST || 'localhost';
  const needSsl = process.env.DB_SSL === 'true' || isRemoteHost(host);
  
  poolConfig = {
    host,
    user: process.env.DB_USER || process.env.PGUSER || 'postgres',
    password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'postgres',
    database: process.env.DB_NAME || process.env.PGDATABASE || 'almamatters',
    port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
    ssl: needSsl ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
}

const pool = new Pool(poolConfig);

// Test pool connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('PostgreSQL pool connection failed:', err.message);
  } else {
    console.log('PostgreSQL Pool Connected Successfully');
    release();
  }
});

/**
 * Transforms MySQL-style queries with '?' placeholders into PostgreSQL-style '$1, $2, ...'
 * Ignores '?' inside quoted strings (single or double quotes).
 */
function convertPlaceholders(sql) {
  let paramIndex = 1;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let result = '';

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const prevChar = i > 0 ? sql[i - 1] : null;

    if (char === "'" && prevChar !== '\\') {
      inSingleQuote = !inSingleQuote;
      result += char;
    } else if (char === '"' && prevChar !== '\\') {
      inDoubleQuote = !inDoubleQuote;
      result += char;
    } else if (char === '?' && !inSingleQuote && !inDoubleQuote) {
      result += `$${paramIndex++}`;
    } else {
      result += char;
    }
  }

  return result;
}

/**
 * Normalizes SQL query for PostgreSQL execution:
 * - Appends RETURNING * for INSERT queries if not already present
 * - Replaces MySQL-specific functions if encountered
 */
function prepareSql(sql) {
  let transformed = convertPlaceholders(sql.trim());

  // If query is an INSERT and doesn't already have RETURNING, append RETURNING *
  const isInsert = /^\s*INSERT\s+INTO/i.test(transformed);
  const hasReturning = /\bRETURNING\b/i.test(transformed);
  if (isInsert && !hasReturning) {
    // Remove trailing semicolon if present, append RETURNING *
    transformed = transformed.replace(/;\s*$/, '') + ' RETURNING *';
  }

  return transformed;
}

/**
 * Formats pg query result to be compatible with mysql2 promise API:
 * returns [rows, fields]
 * where rows also contains insertId, affectedRows, rowCount for DML operations.
 */
function formatResult(pgResult) {
  const rows = pgResult.rows || [];
  
  // Extract primary key or id if returned from INSERT
  let insertId = null;
  if (rows.length > 0) {
    const firstRow = rows[0];
    insertId = firstRow.student_id ||
               firstRow.alumni_id ||
               firstRow.admin_id ||
               firstRow.post_id ||
               firstRow.like_id ||
               firstRow.comment_id ||
               firstRow.share_id ||
               firstRow.job_id ||
               firstRow.application_id ||
               firstRow.session_id ||
               firstRow.notification_id ||
               firstRow.conversation_id ||
               firstRow.message_id ||
               firstRow.community_id ||
               firstRow.membership_id ||
               firstRow.id ||
               (typeof firstRow[Object.keys(firstRow)[0]] === 'number' ? firstRow[Object.keys(firstRow)[0]] : null);
  }

  const resultObj = {
    insertId: insertId ? Number(insertId) : 0,
    affectedRows: pgResult.rowCount || 0,
    rowCount: pgResult.rowCount || 0,
    rows: rows,
  };

  // For SELECT queries, return rows array decorated with DML props
  // For INSERT/UPDATE/DELETE queries, assigning resultObj properties onto rows array allows:
  // const [result] = await db.query() -> result.insertId, result.affectedRows
  // const [rows] = await db.query() -> rows.length, rows.map()
  // const [[row]] = await db.query() -> row.column
  Object.assign(rows, resultObj);

  return [rows, pgResult.fields];
}

// Wrapper for pool execution
const db = {
  pool,
  
  async query(sql, params = []) {
    const preparedSql = prepareSql(sql);
    const pgResult = await pool.query(preparedSql, params);
    return formatResult(pgResult);
  },

  async execute(sql, params = []) {
    return this.query(sql, params);
  },

  async getConnection() {
    const client = await pool.connect();
    return {
      client,
      async query(sql, params = []) {
        const preparedSql = prepareSql(sql);
        const pgResult = await client.query(preparedSql, params);
        return formatResult(pgResult);
      },
      async execute(sql, params = []) {
        return this.query(sql, params);
      },
      async beginTransaction() {
        await client.query('BEGIN');
      },
      async commit() {
        await client.query('COMMIT');
      },
      async rollback() {
        await client.query('ROLLBACK');
      },
      release() {
        client.release();
      }
    };
  }
};

module.exports = db;