const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config({ path: '.env' });

(async () => {
  try {
    const pool = mysql.createPool({ 
      host: process.env.DB_HOST, 
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      },
      multipleStatements: true
    });

    const sql = fs.readFileSync('database.sql', 'utf8');
    console.log('Importing database schema from database.sql...');
    await pool.query(sql);
    console.log('Database schema and seed data imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error importing database:', error);
    process.exit(1);
  }
})();
