const assert = require('assert');

// Test placeholder conversion & SQL preparation logic
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

function prepareSql(sql) {
  let transformed = convertPlaceholders(sql.trim());
  const isInsert = /^\s*INSERT\s+INTO/i.test(transformed);
  const hasReturning = /\bRETURNING\b/i.test(transformed);
  if (isInsert && !hasReturning) {
    transformed = transformed.replace(/;\s*$/, '') + ' RETURNING *';
  }
  return transformed;
}

// 1. Test basic select
const q1 = "SELECT * FROM students WHERE student_id = ? AND roll_number = ?";
assert.strictEqual(
  prepareSql(q1),
  "SELECT * FROM students WHERE student_id = $1 AND roll_number = $2"
);

// 2. Test quotes containing question mark
const q2 = "SELECT * FROM posts WHERE content = 'Is this a question?' AND poster_id = ?";
assert.strictEqual(
  prepareSql(q2),
  "SELECT * FROM posts WHERE content = 'Is this a question?' AND poster_id = $1"
);

// 3. Test insert without returning
const q3 = "INSERT INTO students (roll_number) VALUES (?)";
assert.strictEqual(
  prepareSql(q3),
  "INSERT INTO students (roll_number) VALUES ($1) RETURNING *"
);

// 4. Test insert with trailing semicolon
const q4 = "INSERT INTO students (roll_number) VALUES (?);";
assert.strictEqual(
  prepareSql(q4),
  "INSERT INTO students (roll_number) VALUES ($1) RETURNING *"
);

// 5. Test insert with on conflict
const q5 = "INSERT INTO post_likes (post_id, liker_type, liker_id) VALUES (?, ?, ?) ON CONFLICT (post_id, liker_type, liker_id) DO NOTHING";
assert.strictEqual(
  prepareSql(q5),
  "INSERT INTO post_likes (post_id, liker_type, liker_id) VALUES ($1, $2, $3) ON CONFLICT (post_id, liker_type, liker_id) DO NOTHING RETURNING *"
);

console.log('✅ All SQL preparation & placeholder translation unit tests passed!');
