const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

(async () => {
  const pool = mysql.createPool({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });
  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image_url VARCHAR(255) NOT NULL,
      span_type ENUM('normal', 'wide', 'tall', 'large') DEFAULT 'normal',
      image_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('gallery_items table ensured');
  process.exit(0);
})();
