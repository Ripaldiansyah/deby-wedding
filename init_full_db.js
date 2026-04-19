const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config({ path: '.env' });

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  });

  try {
    // Create DB if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.query(`USE \`${process.env.DB_NAME}\`;`);

    // Read database.sql
    let sql = fs.readFileSync('database.sql', 'utf8');
    
    // Fix 'reception' to 'resepsi' to match recent code changes
    sql = sql.replace(/ENUM\('akad', 'reception'\)/g, "ENUM('akad', 'resepsi')");
    sql = sql.replace(/'reception'/g, "'resepsi'");

    // Execute full schema
    console.log('Applying database schema...');
    await connection.query(sql);

    console.log('Database initialized successfully with all tables.');
    process.exit(0);
  } catch (err) {
    console.error('Initialization error:', err);
    process.exit(1);
  }
})();
